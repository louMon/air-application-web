import { drawQhawaxMap, zoomByCompany } from '../lib/mapAssets.js';
import {goToSpatialHistorical} from '../lib/directioning.js';
import {navbar,
positionsMaintain,
dropdownLegend,
positionsMaintainMobile,
chooseSpinnerMenu,
spinMob,
styledNavBar,
spatialHistorical,
spatialHistoricalMobile
} from '../lib/navMenus.js';
import { viewSearchingPanelForecasting} from '../lib/HtmlComponents.js'
import { getForecastingMeasurement,getLastRunnintTimestamp_ByPredictionModel,
		 get24hoursMeasurements, getFondecytQhawax} from '../requests/get.js';
import { sourceSocket } from '../index.js';
import { selectColor,perc2color,createMarkersForecasting} from '../lib/mapUtils.js';

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
let monitoringStations;

const getStringBaseOnHour = function(counter){
	if(counter == 0){
		return 'Siguiente hora' 
	}
	return 'Siguientes '+ (counter+1) +' horas'
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

function iterateByTime(counter,arrayExample,increment, percentage,map,array_length,progress_form,running_timestamp,pollutant,velocity){
	myVarSetTimeOut = setTimeout(function() {   //  call a 1s setTimeout when the loop is called
						percentage = increment + percentage;
						if (counter+1 == array_length) {
					    	percentage = 100;
					    }
				    	let positions_length = 10 // arrayExample[counter]['has_qhawax'].length;
					    iterateByGrid(positions_length,arrayExample,map,counter,pollutant);
					    progress_form.innerHTML=progress_bar(percentage,running_timestamp,counter);
					    counter++;                    //  increment the counter
					    running_timestamp = addMinutes(running_timestamp, 60)
					    if (counter< array_length) {  //  if the counter < 10, call the loop function
					    	iterateByTime(counter,arrayExample,increment, percentage,map,array_length,progress_form,running_timestamp,pollutant,velocity)
					    }
					    if(percentage == 100){
					    	M.toast({
						   		html: `Se mostraron todas las horas de dicho contaminante`,
						    	displayLength: 3000,
							});
							//setTimeout(()=>window.location.reload(), 5000);
					    }    
					}, parseInt(velocity));
}

const startForecastingSimulation = async (mapElem,selectedParameters,map) => {
	var velocity = selectedParameters.velocity
	var pollutant = selectedParameters.pollutant
	running_timestamp = await getLastRunnintTimestamp_ByPredictionModel('Forecasting'); //2 means Temporal Prediction
	running_timestamp = new Date(running_timestamp);
	running_timestamp = substractMinutes(running_timestamp, (6-1)*60) // las 5 horas de UTC +1 hora siguiente del inicio del forecasting
	json_array = await getForecastingMeasurement(selectedParameters);
	array_length = json_array.length;
	progress_form = mapElem.querySelector('#form_progress_forecasting');
	percentage = 0;
	counter = 0;
	increment = Math.round(100/parseFloat(array_length));
	iterateByTime(counter,json_array,increment, percentage,map,array_length,progress_form,running_timestamp,pollutant,velocity);
};

const pauseHistorical = async () => { //falta detenerlo
	clearTimeout(myVarSetTimeOut);
};

const restartHistorical = async (pollutant) => { //falta restaurarlo
	iterateByTime(counter,json_array,increment, percentage,map,array_length,progress_form, running_timestamp,pollutant)
};

const setMarkers = async (map,selectedParameters) => {
	monitoringStations = await getFondecytQhawax();
	createMarkersForecasting(map, monitoringStations,selectedParameters.pollutant)
};

const viewForecasting= () => {
	const mapElem = document.createElement('div');
	const menuNavBar = document.querySelector('header');
	
	menuNavBar.innerHTML = navbar(dropdownLegend);
	
	const menulist = document.querySelector('#menu-list-bar');
	const menuNavMobile= document.querySelector('#mobile-nav');
	
	menulist.innerHTML =  spatialHistorical;
	menuNavMobile.innerHTML = spinMob + spatialHistoricalMobile;
	mapElem.innerHTML = viewSearchingPanelForecasting;

	//const pointsBtn = document.querySelector('#positions-menu');
	//sconst pointsMobBtn = document.querySelector('#positions-menu-mobile');

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

	spatialHistoricalBtn.addEventListener('click',()=> goToSpatialHistorical());
	spatialHistoricalMobBtn.addEventListener('click',()=> goToSpatialHistorical());

	const map = new google.maps.Map(mapElem.querySelector('#map'), {
		center: {lat: -12.058999,lng: -77.071526}, 
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	});

	const playBtn =mapElem.querySelector('#play');
	const pauseBtn =mapElem.querySelector('#pause');

	selectedParameters.pollutant = 'PM25';
	selectedParameters.velocity = '2000';

	const pollutantSelection= mapElem.querySelector('#selectPollutant');
	const velocitySelection= mapElem.querySelector('#selectVelocity');

	setMarkers(map,selectedParameters)

	pollutantSelection.addEventListener('change',e=>{
		selectedParameters.pollutant=e.target.value;
		setMarkers(map,selectedParameters)
	})

	velocitySelection.addEventListener('change',e=>{
		selectedParameters.velocity=e.target.value;
	})

	playBtn.addEventListener('click',(e)=>{
        playBtn.disabled = true;
        pauseBtn.disabled = false;
        startForecastingSimulation(mapElem,selectedParameters,map);
    });

    pauseBtn.addEventListener('click',(e)=>{
    	playBtn.disabled = false;
    	pauseBtn.disabled = true;
        pauseHistorical();
    });

	return mapElem;

};

export { viewForecasting };