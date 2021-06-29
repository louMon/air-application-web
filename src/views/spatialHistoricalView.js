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
import { getLastRunnintTimestamp_ByPredictionModel,getTotalSpatialMeasurement,getMaxAndMinMeasurement} from '../requests/get.js';
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

var positionlat_list = [-12.045286,-12.050278, -12.041025, -12.044226, -12.0466667, -12.0450749, -12.047538,-12.054722,-12.044236,-12.051526,-12.042525,-12.046736,-12.045394,-12.057582];
var positionlon_list = [-77.030902,-77.026111, -77.043454, -77.050832, -77.080277778, -77.0278449, -77.035366,-77.029722,-77.012467,-77.077941,-77.033486,-77.047594,-77.036852,-77.071778];


const getStringBaseOnHour = function(counter){
	if(counter == 23){
		return 'Última hora' 
	}
	return 'Últimas '+ (24 - counter) +' horas'
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

function iterateByGrid(positions_length,arrayExample,map,indice,pollutant,max,min){
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
      	//var color_generated = selectColor(arrayExample[indice][unit][ind],pollutant);
      	console.log(max)
      	console.log(min)
      	console.log(arrayExample[indice][unit][ind])
      	var color_generated = perc2color(max,min,arrayExample[indice][unit][ind]);
      	console.log(color_generated)
      	rectangle = new google.maps.Rectangle({
	        strokeColor: '#000000',
	        strokeOpacity: 0.2,
	        strokeWeight: 2,
	        fillColor: color_generated, //falta una funcion para los colores
	        fillOpacity: 0.75,
	        map: map,
	        bounds: bounds
	        //animation: google.maps.Animation.DROP,
	    });
	    rectangle_list.push(rectangle);
	}
}

function iterateByTime(counter,arrayExample,increment, percentage,map,array_length,progress_form,running_timestamp,pollutant,max,min){
	myVarSetTimeOut = setTimeout(function() {   //  call a 1s setTimeout when the loop is called
						percentage = increment + percentage;
						if (counter+1 == array_length) {
					    	percentage = 100;
					    }
				    	let positions_length = arrayExample[counter]['lat'].length;
					    iterateByGrid(positions_length,arrayExample,map,counter,pollutant,max,min);
					    progress_form.innerHTML=progress_bar(percentage,running_timestamp,counter);
					    counter++;                    //  increment the counter
					    running_timestamp = addMinutes(running_timestamp, 60)
					    if (counter< array_length) {  //  if the counter < 10, call the loop function
					    	iterateByTime(counter,arrayExample,increment, percentage,map,array_length,progress_form,running_timestamp,pollutant,max,min)
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

const startHistoricalByPollutant = async (mapElem,selectedParameters,map,pollutant,playBtn) => {
	running_timestamp = await getLastRunnintTimestamp_ByPredictionModel('Historical_Spatial');
	running_timestamp = new Date(running_timestamp);
	running_timestamp = substractMinutes(running_timestamp, (selectedParameters.hours-1)*60 + 5*60) // las horas que ha seleccionado el usuario y las 5 horas de UTC
	//json_array = await getSpatialMeasurement(selectedParameters);
	json_array = await getTotalSpatialMeasurement(selectedParameters);
	progress_form = mapElem.querySelector('#form_progress_spatial');
	array_length = json_array.length;
	percentage = 0;
	counter = 0;
	increment = Math.round(100/parseFloat(array_length));
	iterateByTime(counter,json_array,increment, percentage,map,array_length,progress_form,running_timestamp,pollutant,selectedParameters.max_pollutant,selectedParameters.min_pollutant);
};

const pauseHistorical = async () => { //falta detenerlo
	clearTimeout(myVarSetTimeOut);
};

//const restartHistorical = async (pollutant) => { //falta restaurarlo
//	iterateByTime(counter,json_array,increment, percentage,map,array_length,progress_form, running_timestamp,pollutant)
//};

const getMinMax = async (selectedParameters) => await getMaxAndMinMeasurement(selectedParameters);

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
		center: new google.maps.LatLng(-12.060956, -77.078970),
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	});

	createMarkers(map, positionlat_list,positionlon_list)

	const playBtn =mapElem.querySelector('#play');
	const pauseBtn =mapElem.querySelector('#pause');
	//const restartBtn =mapElem.querySelector('#restart');
	//const pollutant = mapElem.querySelector('#selectPollutant')
	//mapColors = mapElem.querySelector('#selectMapColors')
	//velocity = mapElem.querySelector('#selectVelocity')
	//const selectionPollutant = mapElem.querySelectorAll('input[name=pollutant]');
	//const selectionHours = mapElem.querySelectorAll('input[name=hours]');

	selectedParameters.pollutant = 'PM25';
	selectedParameters.hours = '24';
	selectedParameters.mapColor = 'inca';
	selectedParameters.velocity = '1000';

	const pollutantSelection= mapElem.querySelector('#selectPollutant');
	const mapColorSelection= mapElem.querySelector('#selectMapColor');
	const velocitySelection= mapElem.querySelector('#selectVelocity');

	json_min_max = getMinMax(selectedParameters)

	json_min_max = {"max":409.344,"median":60.136,"min":20.627}
	console.log(json_min_max)
	console.log(json_min_max.max)

	selectedParameters.min_pollutant =json_min_max.min
	selectedParameters.max_pollutant =json_min_max.max

	console.log(selectedParameters)
	
	  
	pollutantSelection.addEventListener('change',e=>{
		selectedParameters.pollutant=e.target.value;
		//json_min_max = getMinMax(selectedParameters)
		console.log(selectedParameters)
	})

	mapColorSelection.addEventListener('change',e=>{
		selectedParameters.mapColor=e.target.value;
		console.log(selectedParameters)
	})

	velocitySelection.addEventListener('change',e=>{
		selectedParameters.velocity=e.target.value;
		console.log(selectedParameters)
	})

	playBtn.addEventListener('click',(e)=>{
		console.log(selectedParameters,selectedParameters.pollutant)
        playBtn.disabled = true;
        pauseBtn.disabled = false;
        startHistoricalByPollutant(mapElem,selectedParameters,map,selectedParameters.pollutant,playBtn);
        //playBtn.disabled = false;
    });

    pauseBtn.addEventListener('click',(e)=>{
    	playBtn.disabled = false;
    	pauseBtn.disabled = true;
        pauseHistorical();
    });

    //restartBtn.addEventListener('click',(e)=>{
    //    restartHistorical(selectedParameters.pollutant);
    //});

	return mapElem;

};

export { viewSpatialHistorical };