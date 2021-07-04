import { drawQhawaxMap, zoomByCompany } from '../lib/mapAssets.js';
import {goToPositionsMaintain, goToForecasting} from '../lib/directioning.js';
import {navbar,
positionsMaintain,
dropdownLegend,
positionsMaintainMobile,
chooseSpinnerMenu,
spinMob,
styledNavBar,
forecasting,
forecastingMobile
} from '../lib/navMenus.js';
import { viewSearchingPanelHistorical} from '../lib/HtmlComponents.js'
import { getLastRunnintTimestamp_ByPredictionModel,getTotalSpatialMeasurement,
		getMaxAndMinMeasurement, getFondecytQhawax} from '../requests/get.js';
import { sourceSocket } from '../index.js';
import { createMarkers,selectColor,perc2color} from '../lib/mapUtils.js';

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
let json_min_max;
let monitoringStations;

const getStringBaseOnHour = function(counter){
	if(counter == 23){
		return 'Última hora' 
	}
	if(counter == 24){
		return 'Siguiente hora' 
	}
	if(counter > 24){
		return 'Siguientes ' + (counter - 24 +1) +' horas'
	}

	return 'Últimas '+ (24 - counter) +' horas'
}

const progress_bar =(p,running_timestamp,counter)=> `
<div class="container" style="margin-bottom:1em; border-radius:5px; position:relative;">
  <div style="height:20px;">
        <div class="determinate" id="spatial_progress_bar" style="height:40px; width:100% ">${running_timestamp}</div>
  </div>
  <div class="progress" style="height:10px;">
        <div class="determinate" id="spatial_progress_bar" style="height:20px; width: ${p}% "></div>
  </div>
  <div style="height:10px;">
        <div class="determinate" id="spatial_progress_bar" style="height:20px; width:100% ">${getStringBaseOnHour(counter)}</div>
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

function iterateByGrid(positions_length,arrayExample,map,indice,pollutant,max,min,mapColor){
	// Remove Previous Rectangle
	var color_generated = '#'
    for(let ind=0; ind < rectangle_list.length; ind++) {
	    if(rectangle_list[ind]){
	      rectangle_list[ind].setMap(null);
	    }
	 }
	var unit= 'ug_m3_value';
	for(let ind=0; ind < positions_length; ind++) {
        let coordinates = {'lat': arrayExample[indice]['lat'][ind], 'lon': arrayExample[indice]['lon'][ind]};
      	var bounds = lookforBounds(arrayExample[indice]['lat'][ind],arrayExample[indice]['lon'][ind]);
      	if(mapColor == "inca"){
      		color_generated = selectColor(arrayExample[indice][unit][ind],pollutant);
      	}else{
      		color_generated = perc2color(max,min,arrayExample[indice][unit][ind]);
      	}
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

function iterateByTime(counter,arrayExample,increment, percentage,map,array_length,progress_form,running_timestamp,pollutant,max,min,mapColor,velocity){
	myVarSetTimeOut = setTimeout(function() {   //  call a 1s setTimeout when the loop is called
						percentage = increment + percentage;
						if (counter+1 == array_length) {
					    	percentage = 100;
					    }
				    	let positions_length = arrayExample[counter]['lat'].length;
					    iterateByGrid(positions_length,arrayExample,map,counter,pollutant,max,min,mapColor);
					    progress_form.innerHTML=progress_bar(percentage,running_timestamp,counter);
					    counter++;                    //  increment the counter
					    running_timestamp = addMinutes(running_timestamp, 60)
					    if (counter< array_length) {  //  if the counter < 10, call the loop function
					    	iterateByTime(counter,arrayExample,increment, percentage,map,array_length,progress_form,running_timestamp,pollutant,max,min,mapColor,velocity)
					    }
					    if(percentage == 100){
					    	M.toast({
						   		html: `Se mostraron todas las horas de dicho contaminante`,
						    	displayLength: 3000,
							});
					    }    
					}, parseInt(velocity));
}

const startHistoricalByPollutant = async (mapElem,selectedParameters,map) => {
	var pollutant = selectedParameters.pollutant
	var mapColor = selectedParameters.mapColor
	var velocity = selectedParameters.velocity
	json_min_max = await getMaxAndMinMeasurement(selectedParameters);
	var max = json_min_max.max
	var min = json_min_max.min
	running_timestamp = await getLastRunnintTimestamp_ByPredictionModel('Historical_Spatial');
	running_timestamp = new Date(running_timestamp);
	running_timestamp = substractMinutes(running_timestamp, (24-1)*60 + 5*60) // las horas que ha seleccionado el usuario y las 5 horas de UTC
	json_array = await getTotalSpatialMeasurement(selectedParameters);
	progress_form = mapElem.querySelector('#form_progress_spatial');
	array_length = json_array.length;
	percentage = 0;
	counter = 0;
	increment = Math.round(100/parseFloat(array_length));
	iterateByTime(counter,json_array,increment, percentage,map,array_length,progress_form,running_timestamp,pollutant,max,min,mapColor,velocity);
};

const pauseHistorical = async () => { //falta detenerlo
	clearTimeout(myVarSetTimeOut);
};

const setMarkers = async (map) => {
	monitoringStations = await getFondecytQhawax();
	createMarkers(map, monitoringStations)
};

const viewSpatialHistorical = () => {
	const mapElem = document.createElement('div');
	const menuNavBar = document.querySelector('header');
	
	menuNavBar.innerHTML = navbar(dropdownLegend);
	
	const menulist = document.querySelector('#menu-list-bar');
	const menuNavMobile= document.querySelector('#mobile-nav');
	
	menulist.innerHTML = positionsMaintain + forecasting ;
	menuNavMobile.innerHTML = spinMob+positionsMaintainMobile +forecastingMobile ;
	mapElem.innerHTML = viewSearchingPanelHistorical;

	const pointsBtn = document.querySelector('#positions-menu');
	const pointsMobBtn = document.querySelector('#positions-menu-mobile');

	const forecastingBtn = document.querySelector('#forecasting-menu');
	const forecastingMobBtn = document.querySelector('#forecasting-menu-mobile');

	pointsBtn.addEventListener('click',()=> goToPositionsMaintain());
	pointsMobBtn.addEventListener('click',()=> goToPositionsMaintain());

	forecastingBtn.addEventListener('click',()=> goToForecasting());
	forecastingMobBtn.addEventListener('click',()=> goToForecasting());

	map = new google.maps.Map(mapElem.querySelector('#map'), {
		center: new google.maps.LatLng(-12.042783, -77.075555),
		zoom: 13,
		mapTypeId: "satellite"
	});

	setMarkers(map)
	
	const playBtn =mapElem.querySelector('#play');
	const pauseBtn =mapElem.querySelector('#pause');

	selectedParameters.pollutant = 'PM25';
	selectedParameters.mapColor = 'heatmap';
	selectedParameters.velocity = '2000';

	const pollutantSelection= mapElem.querySelector('#selectPollutant');
	const mapColorSelection= mapElem.querySelector('#selectMapColor');
	const velocitySelection= mapElem.querySelector('#selectVelocity');
	  
	pollutantSelection.addEventListener('change',e=>{
		selectedParameters.pollutant=e.target.value;
	})

	mapColorSelection.addEventListener('change',e=>{
		selectedParameters.mapColor=e.target.value;
	})

	velocitySelection.addEventListener('change',e=>{
		selectedParameters.velocity=e.target.value;
	})

	playBtn.addEventListener('click',(e)=>{
        playBtn.disabled = true;
        pauseBtn.disabled = false;
        startHistoricalByPollutant(mapElem,selectedParameters,map);
    });

    pauseBtn.addEventListener('click',(e)=>{
    	playBtn.disabled = false;
    	pauseBtn.disabled = true;
        pauseHistorical();
    });

	return mapElem;

};

export { viewSpatialHistorical };