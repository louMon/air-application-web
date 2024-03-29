import { drawQhawaxMap, zoomByCompany } from '../lib/mapAssets.js';
import {goToForecasting, goToSpatialHistorical} from '../lib/directioning.js';
import {navbar,
positionsMaintain,
dropdownLegend,
positionsMaintainMobile,
chooseSpinnerMenu,
spinMob,
styledNavBar,
forecasting,
forecastingMobile,
spatialHistorical,
spatialHistoricalMobile
} from '../lib/navMenus.js';
import { viewMap,viewSearchingPanelFuture,landbar} from '../lib/HtmlComponents.js'
import { getLastRunnintTimestamp_ByPredictionModel} from '../requests/get.js';
import { sourceSocket } from '../index.js';
import { createMarkers, selectColor, perc2color} from '../lib/mapUtils.js';

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

//hay que volverlo dinamico con el endpoint de qaira
var positionlat_list = [-12.045286,-12.050278, -12.041025, -12.044226, -12.0466667, -12.0450749, -12.047538,-12.054722,-12.044236,-12.051526,-12.042525,-12.046736,-12.045394,-12.057582];
var positionlon_list = [-77.030902,-77.026111, -77.043454, -77.050832, -77.080277778, -77.0278449, -77.035366,-77.029722,-77.012467,-77.077941,-77.033486,-77.047594,-77.036852,-77.071778];

const getStringBaseOnHour = function(counter){
	if(counter == 0){
		return 'Siguiente hora' 
	}
	return 'Siguientes '+ (counter+1) +' horas'
}

const progress_bar =(p,running_timestamp,counter)=> `
<div class="container" style="margin-bottom:1em; border-radius:5px; position:relative;">
  <div style="height:40px;">
        <div class="determinate" id="spatial_progress_bar" style="height:40px; width:100% ">${running_timestamp}</div>
  </div>
  <div style="height:20px;">
        <div class="determinate" id="spatial_progress_bar" style="height:20px; width:100% ">${getStringBaseOnHour(counter)}</div>
  </div>
  <div class="progress" style="height:20px;">
        <div class="determinate" id="spatial_progress_bar" style="height:20px; width: ${p}% "></div>
  </div>
</div>
`

const addMinutes =  function (dt, minutos) {
    return new Date(dt.getTime() + minutos*60000);
}

const substractMinutes =  function (dt, minutos) {
    return new Date(dt.getTime() - minutos*60000);
}

function lookforBounds(lat, lon){
  var lat_prima_left=lat+0.0013395;
  var lon_prima_left=lon-0.0013555;
  var lat_prima_right=lat-0.0013395;
  var lon_prima_right=lon+0.0013555;

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
	        strokeOpacity: 0.2,
	        strokeWeight: 2,
	        fillColor: color_generated, //falta una funcion para los colores
	        fillOpacity: 0.75,
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
				    	let positions_length = arrayExample[counter]['hour_position'].length;
					    iterateByGrid(positions_length,arrayExample,map,counter,pollutant);
					    progress_form.innerHTML=progress_bar(percentage,running_timestamp,counter);
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
							//setTimeout(()=>window.location.reload(), 5000);
					    }    
					}, 2000);
}

const startHistorical = async (mapElem,selectedParameters,map,playBtn) => {
	running_timestamp = await getLastRunnintTimestamp_ByPredictionModel('Future_Spatial');
	running_timestamp = new Date(running_timestamp);
	running_timestamp = substractMinutes(running_timestamp, (6-1)*60) // las horas que ha seleccionado el usuario y las 5 horas de UTC
	//json_array = await getFutureSpatialMeasurement(selectedParameters);
	//progress_form = mapElem.querySelector('#form_progress_future_spatial');
	//array_length = json_array.length;
	//percentage = 0;
	//counter = 0;
	//increment = Math.round(100/parseFloat(array_length));
	//iterateByTime(counter,json_array,increment, percentage,map,array_length,progress_form,running_timestamp,selectedParameters.pollutant);
	//playBtn.disabled = false;
};

const pauseHistorical = async () => { //falta detenerlo
	clearTimeout(myVarSetTimeOut);
};


const viewFutureInterpolation = () => {
	const mapElem = document.createElement('div');
	const menuNavBar = document.querySelector('header');
	
	menuNavBar.innerHTML = navbar(dropdownLegend);

	const menulist = document.querySelector('#menu-list-bar');
	const menuNavMobile= document.querySelector('#mobile-nav');
	
	menulist.innerHTML = positionsMaintain + forecasting + spatialHistorical;
	menuNavMobile.innerHTML = spinMob+positionsMaintainMobile +forecastingMobile +spatialHistoricalMobile;
	mapElem.innerHTML = viewSearchingPanelFuture;
	//chooseSpinnerMenu(company);

	//const pointsBtn = document.querySelector('#positions-menu');
	//const pointsMobBtn = document.querySelector('#positions-menu-mobile');

	const forecastingBtn = document.querySelector('#forecasting-menu');
	const forecastingMobBtn = document.querySelector('#forecasting-menu-mobile');

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

	//pointsBtn.addEventListener('click',()=> goToPositionsMaintain());
	//pointsMobBtn.addEventListener('click',()=> goToPositionsMaintain());

	forecastingBtn.addEventListener('click',()=> goToForecasting());
	forecastingMobBtn.addEventListener('click',()=> goToForecasting());

	spatialHistoricalBtn.addEventListener('click',()=> goToSpatialHistorical());
	spatialHistoricalMobBtn.addEventListener('click',()=> goToSpatialHistorical());

	const map = new google.maps.Map(mapElem.querySelector('#map'), {
		center: new google.maps.LatLng(-12.060956, -77.078970),
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	});

	createMarkers(map, positionlat_list,positionlon_list)

	const playBtn =mapElem.querySelector('#play');
	const pauseBtn =mapElem.querySelector('#pause');

	const selectionPollutant = mapElem.querySelectorAll('input[name=pollutant]');
	selectedParameters.pollutant = 'NO2';

	selectionPollutant.forEach(radio =>{
		radio.addEventListener('click',()=>{
			selectedParameters.pollutant=radio.id;
		})
		
	})

	playBtn.addEventListener('click',(e)=>{
		console.log(selectedParameters,selectedParameters.pollutant)
        playBtn.disabled = true
        startHistorical(mapElem,selectedParameters,map,playBtn);
    });

    pauseBtn.addEventListener('click',(e)=>{
        pauseHistorical();
    });

	return mapElem;

};

export { viewFutureInterpolation };

