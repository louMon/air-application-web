import { drawQhawaxMap, zoomByCompany } from '../lib/mapAssets.js';
import {goToPositionsMaintain, goToForecasting, goToSpatialRealTime} from '../lib/directioning.js';
import {navbar,
positionsMaintain,
dropdownLegend,
positionsMaintainMobile,
chooseSpinnerMenu,
spinMob,
styledNavBar,
forecasting,
forecastingMobile,
spatialRealTime,
spatialRealTimeMobile
} from '../lib/navMenus.js';
import { viewSearchingPanelHistorical} from '../lib/HtmlComponents.js'
import { requestAllQhawaxByCompany,getSpatialMeasurement,getLastRunnintTimestamp_ByPredictionModel} from '../requests/get.js';
import { sourceSocket } from '../index.js';

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
//let progress_form = "";
//let array_length = 0;
//let percentage = 0;
//let counter = 0;
//let increment = 0;
//var rectangle;
var rectangle_list = [];
//var myVarSetTimeOut;
//let json_array = [];
//var map;

const progress_bar =(p,running_timestamp)=> `
<div class="row">
	<p><center>${running_timestamp}</center></p>
</div>
<div class="container" style="margin-bottom:1em; border-radius:7px; position:relative;">
  <div class="progress" style="height:40px;">
        <div class="determinate" id="spatial_progress_bar" style="height:40px; width: ${p}% ">${p}%</div>
  </div>
</div>
`
const arrayStatic = [
{"has_qhawax": [false,false,true,false],"hour_position": [0,0,0,0],"id": [937,1441,433,1945],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [100.0,2.0,1.0,3.0]},
{"has_qhawax": [false,false,false,true],"hour_position": [1,1,1,1],"id": [1442,1946,938,434],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [1.0,79.0,23.0,133.0]},
{"has_qhawax": [false,false,false,true],"hour_position": [2,2,2,2],"id": [1947,1443,939,435],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [89.0,1.0,1.0,10.0]},
{"has_qhawax": [false,true,false,false],"hour_position": [3,3,3,3],"id": [1948,436,1444, 940],"lat":[-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [10.0,25.0,60.0,49.0]},
{"has_qhawax": [false,true,false,false],"hour_position": [4,4,4,4],"id": [1445,437,941,1949],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [50.0,20.0,150.0,356.0]},
{"has_qhawax": [false,true,false,false],"hour_position": [5,5,5,5],"id": [1445,437,941,1949],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [100.0,2.0,455.0,20.0]},
{"has_qhawax": [false,true,false,false],"hour_position": [6,6,6,6],"id": [1445,437,941,1949],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [6.0,100.0,3.0,455.0]}]

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

	if(polutant=='O3'){
		if(value>=0 & value<=60){
			return '#57cc59'
		}else if(value>60 & value<=120){
			return '#edeb74'
		}else if(value>120 & value<=210){
			return '#d8251c'
		}else if(value>210){
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

	if(polutant=='H2S'){
		if(value>=0 & value<=75){
			return '#57cc59'
		}else if(value>75 & value<=150){
			return '#edeb74'
		}else if(value>150 & value<=1500){
			return '#d8251c'
		}else if(value>1500){
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

	if(polutant=='SO2'){
		if(value>=0 & value<=10){
			return '#57cc59'
		}else if(value>10 & value<=20){
			return '#edeb74'
		}else if(value>20 & value<=500){
			return '#d8251c'
		}else if(value>500){
			return '#9b0f0f'
		}
	}

	if(polutant=='PM10'){
		if(value>=0 & value<=75){
			return '#57cc59'
		}else if(value>75 & value<=150){
			return '#edeb74'
		}else if(value>150 & value<=250){
			return '#d8251c'
		}else if(value>250){
			return '#9b0f0f'
		}
	}

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
				    	let positions_length = arrayExample[counter]['has_qhawax'].length;
					    iterateByGrid(positions_length,arrayExample,map,counter,pollutant);
					    progress_form.innerHTML=progress_bar(percentage,running_timestamp);
					    counter++;                    //  increment the counter
					    running_timestamp = addMinutes(running_timestamp, 60)
					    console.log(running_timestamp)
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

const startHistorical = async (mapElem,selectedParameters,map,pollutant) => {
	running_timestamp = await getLastRunnintTimestamp_ByPredictionModel('Spatial'); //1 means Spatial Prediction
	running_timestamp = new Date(running_timestamp);
	running_timestamp = substractMinutes(running_timestamp, selectedParameters.hours*60 + 5*60) // las horas que ha seleccionado el usuario y las 5 horas de UTC
	json_array = await getSpatialMeasurement(selectedParameters);
	progress_form = mapElem.querySelector('#form_progress_spatial');
	array_length = json_array.length;
	percentage = 0;
	counter = 0;
	increment = Math.round(100/parseFloat(array_length));
	iterateByTime(counter,json_array,increment, percentage,map,array_length,progress_form,running_timestamp,pollutant);
};

const pauseHistorical = async () => { //falta detenerlo
	clearTimeout(myVarSetTimeOut);
};

const restartHistorical = async (pollutant) => { //falta restaurarlo
	iterateByTime(counter,json_array,increment, percentage,map,array_length,progress_form, running_timestamp,pollutant)
};

const viewSpatialHistorical = () => {
	const mapElem = document.createElement('div');
	const menuNavBar = document.querySelector('header');
	
	menuNavBar.innerHTML = navbar(dropdownLegend);
	
	const menulist = document.querySelector('#menu-list-bar');
	const menuNavMobile= document.querySelector('#mobile-nav');
	
	menulist.innerHTML = positionsMaintain + forecasting + spatialRealTime ;
	menuNavMobile.innerHTML = spinMob+positionsMaintainMobile +forecastingMobile +spatialRealTimeMobile;
	mapElem.innerHTML = viewSearchingPanelHistorical;
	//chooseSpinnerMenu(company);

	const pointsBtn = document.querySelector('#positions-menu');
	const pointsMobBtn = document.querySelector('#positions-menu-mobile');

	const forecastingBtn = document.querySelector('#forecasting-menu');
	const forecastingMobBtn = document.querySelector('#forecasting-menu-mobile');

	const spatialRealTimeBtn = document.querySelector('#spatial-real-time-menu');
	const spatialRealTimeMobBtn = document.querySelector('#spatial-real-time-menu-mobile');

	pointsBtn.addEventListener('click',()=> goToPositionsMaintain());
	pointsMobBtn.addEventListener('click',()=> goToPositionsMaintain());

	forecastingBtn.addEventListener('click',()=> goToForecasting());
	forecastingMobBtn.addEventListener('click',()=> goToForecasting());

	spatialRealTimeBtn.addEventListener('click',()=> goToSpatialRealTime());
	spatialRealTimeMobBtn.addEventListener('click',()=> goToSpatialRealTime());

	map = new google.maps.Map(mapElem.querySelector('#map'), {
		center: {lat: -12.038338,lng: -77.044061}, 
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	});

	const playBtn =mapElem.querySelector('#play');
	const pauseBtn =mapElem.querySelector('#pause');
	const restartBtn =mapElem.querySelector('#restart');

	const selectionPollutant = mapElem.querySelectorAll('input[name=pollutant]');
	const selectionHours = mapElem.querySelectorAll('input[name=hours]');

	selectedParameters.pollutant = 'NO2';
	selectedParameters.hours = '24';

	selectionPollutant.forEach(radio =>{
		radio.addEventListener('click',()=>{
			selectedParameters.pollutant=radio.id;
		})
		
	})

	selectionHours.forEach(radio =>{
		radio.addEventListener('click',()=>{
			selectedParameters.hours=radio.id;
			console.log(selectedParameters.hours)
		})
		
	})

	playBtn.addEventListener('click',(e)=>{
        console.log(selectedParameters);
        playBtn.disabled = true
        startHistorical(mapElem,selectedParameters,map,selectedParameters.pollutant);
    });

    pauseBtn.addEventListener('click',(e)=>{
        pauseHistorical();
    });

    restartBtn.addEventListener('click',(e)=>{
        restartHistorical(selectedParameters.pollutant);
    });

	return mapElem;

};

export { viewSpatialHistorical };