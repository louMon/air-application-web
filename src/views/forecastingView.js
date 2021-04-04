import { drawQhawaxMap, zoomByCompany } from '../lib/mapAssets.js';
import {goToPositionsMaintain, goToSpatialRealTime, goToSpatialHistorical} from '../lib/directioning.js';
import {navbar,
positionsMaintain,
dropdownLegend,
positionsMaintainMobile,
chooseSpinnerMenu,
spinMob,
styledNavBar,
spatialRealTime,
spatialRealTimeMobile,
spatialHistorical,
spatialHistoricalMobile
} from '../lib/navMenus.js';
import { viewSearchingPanelForecasting} from '../lib/HtmlComponents.js'
import { getForecastingMeasurement,getLastRunnintTimestamp_ByPredictionModel} from '../requests/get.js';
import { sourceSocket } from '../index.js';
import { createMarkers} from '../lib/mapUtils.js';

let progress_form;
let array_length ;
let percentage;
let counter;
let increment;
let rectangle;
let myVarSetTimeOut;
let json_array;
let map;
let running_timestamp;
let selectedParameters = {};
var rectangle_list = [];

var positionlat_list = [-12.045286,-12.050278, -12.041025, -12.044226, -12.0466667, -12.0450749, -12.047538,-12.054722,-12.044236,-12.051526,-12.042525,-12.046736,-12.045394,-12.057582];
var positionlon_list = [-77.030902,-77.026111, -77.043454, -77.050832, -77.080277778, -77.0278449, -77.035366,-77.029722,-77.012467,-77.077941,-77.033486,-77.047594,-77.036852,-77.071778];

const progress_bar =(p,running_timestamp)=> `
<div class="row">
	<p><center>${running_timestamp}</center></p>
</div>
<div class="container" style="margin-bottom:1em; border-radius:7px; position:relative;">
  <div class="progress" style="height:40px;">
        <div class="determinate" id="forecasting_progress_bar" style="height:40px; width: ${p}% ">${p}%</div>
  </div>
</div>
`

const addMinutes =  function (dt, minutos) {
    return new Date(dt.getTime() + minutos*60000);
}

const substractMinutes =  function (dt, minutos) {
    return new Date(dt.getTime() - minutos*60000);
}

function selectColor(value,polutant){
	if(polutant=='NO2'){
		if(value>=0 & value<=100){
			return '#57cc59'
		}else if(value>100 & value<=200){
			return '#edeb74'
		}else if(value>200 & value<=300){
			return '#d8251c'
		}else if(value>300){
			return '#9b0f0f'
		}
	}

	if(polutant=='PM25'){
		if(value>=0 & value<=12.5){
			return '#57cc59'
		}else if(value>12.5 & value<=25){
			return '#edeb74'
		}else if(value>25 & value<=125){
			return '#d8251c'
		}else if(value>125){
			return '#9b0f0f'
		}
	}

	if(polutant=='CO'){
		if(value>=0 & value<=5049){
			return '#57cc59'
		}else if(value>5049 & value<=10049){
			return '#edeb74'
		}else if(value>10049 & value<=15049){
			return '#d8251c'
		}else if(value>15049){
			return '#9b0f0f'
		}
	}

}

function lookforBounds(lat, lon){
  var lat_prima_left=lat+0.0020395;
  var lon_prima_left=lon-0.0020555;
  var lat_prima_right=lat-0.0020395;
  var lon_prima_right=lon+0.0020555;

  var bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(lat_prima_left,lon_prima_left),
    new google.maps.LatLng(lat_prima_right,lon_prima_right),
  )
  return bounds;
}

function iterateByGrid(positions_length,arrayExample,map,indice,pollutant){
	// Remove Previous Rectangle
    for(let ind=0; ind < rectangle_list.length; ind++) {
	    if(rectangle_list[ind]){
	      rectangle_list[ind].setMap(null);
	    }
	 }
	var unit= 'ug_m3_value';
	for(let ind=0; ind < positions_length; ind++) {
        let coordinates = {'lat': arrayExample[indice]['lat'][ind], 'lon': arrayExample[indice]['lon'][ind]};
      	var bounds = lookforBounds(arrayExample[indice]['lat'][ind],arrayExample[indice]['lon'][ind]);
      	var color_generated = selectColor(arrayExample[indice][unit][ind],pollutant);
      	rectangle = new google.maps.Rectangle({
	        strokeColor: '#000000',
	        strokeOpacity: 0.0,
	        strokeWeight: 2,
	        fillColor: color_generated, //falta una funcion para los colores
	        fillOpacity: 0.45,
	        map: map,
	        bounds: bounds
	    });
	    rectangle_list.push(rectangle);
	}
}

function iterateByTime(counter,arrayExample,increment, percentage,map,array_length,progress_form,running_timestamp,pollutant){
	myVarSetTimeOut = setTimeout(function() {   //  call a 1s setTimeout when the loop is called
						percentage = increment + percentage;
						if (counter+1 == array_length) {
					    	percentage = 100;
					    }
				    	let positions_length = 6 // arrayExample[counter]['has_qhawax'].length;
					    iterateByGrid(positions_length,arrayExample,map,counter,pollutant);
					    progress_form.innerHTML=progress_bar(percentage,running_timestamp);
					    counter++;                    //  increment the counter
					    running_timestamp = addMinutes(running_timestamp, 60)
					    if (counter< array_length) {  //  if the counter < 10, call the loop function
					    	iterateByTime(counter,arrayExample,increment, percentage,map,array_length,progress_form,running_timestamp,pollutant)
					    }
					    if(percentage == 100){
					    	M.toast({
						   		html: `Se mostraron todas las horas de dicho contaminante`,
						    	displayLength: 3000,
							});
							setTimeout(()=>window.location.reload(), 5000);
					    }    
					}, 1000);
}

const startForecastingSimulation = async (mapElem,selectedParameters,map) => {
	running_timestamp = await getLastRunnintTimestamp_ByPredictionModel('Forecasting'); //2 means Temporal Prediction
	running_timestamp = new Date(running_timestamp);
	running_timestamp = substractMinutes(running_timestamp, 4*60) // las 5 horas de UTC +1 hora siguiente del inicio del forecasting
	json_array = await getForecastingMeasurement(selectedParameters);
	array_length = 6;//json_array.length;
	progress_form = mapElem.querySelector('#form_progress_forecasting');
	percentage = 0;
	counter = 0;
	increment = Math.round(100/parseFloat(array_length));
	iterateByTime(counter,json_array,increment, percentage,map,array_length,progress_form,running_timestamp,selectedParameters.pollutant);
};

const viewForecasting= () => {
	const mapElem = document.createElement('div');
	const menuNavBar = document.querySelector('header');
	
	menuNavBar.innerHTML = navbar(dropdownLegend);
	
	const menulist = document.querySelector('#menu-list-bar');
	const menuNavMobile= document.querySelector('#mobile-nav');
	
	menulist.innerHTML = positionsMaintain + spatialRealTime + spatialHistorical;
	menuNavMobile.innerHTML = spinMob+positionsMaintainMobile +spatialRealTimeMobile+ spatialHistoricalMobile;
	mapElem.innerHTML = viewSearchingPanelForecasting;
	//chooseSpinnerMenu(company);

	const pointsBtn = document.querySelector('#positions-menu');
	const pointsMobBtn = document.querySelector('#positions-menu-mobile');

	const spatialRealTimeBtn = document.querySelector('#spatial-real-time-menu');
	const spatialRealTimeMobBtn = document.querySelector('#spatial-real-time-menu-mobile');

	const spatialHistoricalBtn = document.querySelector('#spatial-historical-menu');
	const spatialHistoricalMobBtn = document.querySelector('#spatial-historical-menu-mobile');

	const mobileMenu = document.getElementById('mobile-nav');
	M.Sidenav.init(mobileMenu);
	const modals = mapElem.querySelectorAll('.modal');
	M.Modal.init(modals);
	const modals2 = document.querySelectorAll('.modal');
	M.Modal.init(modals2);
	const dropMenu = document.querySelectorAll('.dropdown-trigger');
	M.Dropdown.init(dropMenu,{coverTrigger:false});

	pointsBtn.addEventListener('click',()=> goToPositionsMaintain());
	pointsMobBtn.addEventListener('click',()=> goToPositionsMaintain());

	spatialRealTimeBtn.addEventListener('click',()=> goToSpatialRealTime());
	spatialRealTimeMobBtn.addEventListener('click',()=> goToSpatialRealTime());

	spatialHistoricalBtn.addEventListener('click',()=> goToSpatialHistorical());
	spatialHistoricalMobBtn.addEventListener('click',()=> goToSpatialHistorical());

	const map = new google.maps.Map(mapElem.querySelector('#map'), {
		center: {lat: -12.058999,lng: -77.071526}, 
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	});

	createMarkers(map, positionlat_list,positionlon_list)

	const playBtn =mapElem.querySelector('#play');
	const pauseBtn =mapElem.querySelector('#pause');
	const restartBtn =mapElem.querySelector('#restart');

	const selectionPollutant = mapElem.querySelectorAll('input[name=pollutant]');
	selectedParameters.pollutant = 'NO2';

	selectionPollutant.forEach(radio =>{
		radio.addEventListener('click',()=>{
			selectedParameters.pollutant=radio.id;
		})
	})

	playBtn.addEventListener('click',(e)=>{
		console.log(selectedParameters)
        playBtn.disabled = true
        startForecastingSimulation(mapElem,selectedParameters,map);
    });

    pauseBtn.addEventListener('click',(e)=>{
        pauseHistorical();
    });

    restartBtn.addEventListener('click',(e)=>{
        restartHistorical(selectedParameters.pollutant);
    });

	return mapElem;

};

export { viewForecasting };