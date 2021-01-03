import { drawQhawaxMap, zoomByCompany } from '../lib/mapAssets.js';
import {goToLogin, goToForecasting, goToSpatialRealTime, goToSpatialHistorical} from '../lib/directioning.js';
import {navbar,
login,
dropdownLegend,
loginMobile,
chooseSpinnerMenu,
spinMob,
styledNavBar,
forecasting,
forecastingMobile,
spatialRealTime,
spatialRealTimeMobile,
spatialHistorical,
spatialHistoricalMobile
} from '../lib/navMenus.js';
import { viewSearchingPanelHistorical} from '../lib/HtmlComponents.js'
import { requestAllQhawaxByCompany,getSpatialMeasurement} from '../requests/get.js';
import { sourceSocket } from '../index.js';

let selectedParameters = {};

const progress_bar =p=> `
<div class="container" style="margin-bottom:1em; border-radius:7px; position:relative;">
  <div class="progress">
        <div class="determinate" id="spatial_progress_bar" style="width: ${p}%">${p}%</div>
  </div>
</div>
`

const arrayExample = [
{"has_qhawax": [false,false,true,false],"hour_position": [0,0,0,0],"id": [937,1441,433,1945],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [1.0,2.0,1.0,3.0]},
{"has_qhawax": [false,false,false,true],"hour_position": [1,1,1,1],"id": [1442,1946,938,434],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [79.0,79.0,23.0,133.0]},
{"has_qhawax": [false,false,false,true],"hour_position": [2,2,2,2],"id": [1947,1443,939,435],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [89.0,1.0,1.0,10.0]},
{"has_qhawax": [false,true,false,false],"hour_position": [3,3,3,3],"id": [1948,436,1444, 940],"lat":[-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [10.0,25.0,1.0,49.0]},
{"has_qhawax": [false,true,false,false],"hour_position": [4,4,4,4],"id": [1445,437,941,1949],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [1.0,20.0,3.0,356.0]}]

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

function iterateByGrid(positions_length,arrayExample,map,indice){
	for(let ind=0; ind < positions_length; ind++) {
        let coordinates = {'lat': arrayExample[indice]['lat'][ind], 'lon': arrayExample[indice]['lon'][ind]};
      	var bounds = lookforBounds(arrayExample[indice]['lat'][ind],arrayExample[indice]['lon'][ind]);
      	var color_generated = arrayExample[indice]['ppb_value'][ind]>=0 & arrayExample[indice]['ppb_value'][ind]<=10 ?'#f9f254' : '#e83827';
      	var rectangle = new google.maps.Rectangle({
        strokeColor: '#000000',
        strokeOpacity: 0.0,
        strokeWeight: 2,
        fillColor: color_generated,
        fillOpacity: 0.45,
        map: map,
        bounds: bounds
      });
	}
}

function iterateByTime(arrayExample,increment, percentage,map,array_length,progress_form){
	let counter = 1;
	arrayExample.forEach( function(valor, indice, array) {
      percentage = increment + percentage;
      let positions_length = arrayExample[indice]['has_qhawax'].length;
      console.log("Entrando a un elemento del arreglo");
      setTimeout(function() {   //  call a 3s setTimeout when the loop is called
	    iterateByGrid(positions_length,arrayExample,map,indice);   //  your code here
	    progress_form.innerHTML=progress_bar(percentage);
	    counter++;                    //  increment the counter
	    if (counter > array_length) {           //  if the counter < 10, call the loop function
	      console.log("Llego a 100");             //  ..  again which will trigger another 
	    }                       //  ..  setTimeout()
	  }, 5000);

    });
}

const utilHistorical = async (mapElem,selectedParameters,map) => {
	//const json_array = await getSpatialMeasurement(selectedParameters);
	//console.log(json_array)
	const progress_form = mapElem.querySelector('#form_progress_spatial');
	const array_length = arrayExample.length;
	let percentage = 0;
	const increment = Math.round(100/array_length);
	iterateByTime(arrayExample,increment, percentage,map,array_length,progress_form)
};

const viewSpatialHistorical = () => {
	const mapElem = document.createElement('div');
	const menuNavBar = document.querySelector('header');
	
	menuNavBar.innerHTML = navbar(dropdownLegend);
	
	const menulist = document.querySelector('#menu-list-bar');
	const menuNavMobile= document.querySelector('#mobile-nav');
	
	menulist.innerHTML = login + forecasting + spatialRealTime + spatialHistorical;
	menuNavMobile.innerHTML = spinMob+loginMobile +forecastingMobile +spatialRealTimeMobile+ spatialHistoricalMobile;
	mapElem.innerHTML = viewSearchingPanelHistorical;
	//chooseSpinnerMenu(company);

	const loginBtn = document.querySelector('#login-menu');
	const loginMobBtn = document.querySelector('#login-menu-mobile');

	const forecastingBtn = document.querySelector('#forecasting-menu');
	const forecastingMobBtn = document.querySelector('#forecasting-menu-mobile');

	const spatialRealTimeBtn = document.querySelector('#spatial-real-time-menu');
	const spatialRealTimeMobBtn = document.querySelector('#spatial-real-time-menu-mobile');

	const spatialHistoricalBtn = document.querySelector('#spatial-historical-menu');
	const spatialHistoricalMobBtn = document.querySelector('#spatial-historical-menu-mobile');

	loginBtn.addEventListener('click',()=> goToLogin());
	loginMobBtn.addEventListener('click',()=> goToLogin());

	forecastingBtn.addEventListener('click',()=> goToForecasting());
	forecastingMobBtn.addEventListener('click',()=> goToForecasting());

	spatialRealTimeBtn.addEventListener('click',()=> goToSpatialRealTime());
	spatialRealTimeMobBtn.addEventListener('click',()=> goToSpatialRealTime());

	spatialHistoricalBtn.addEventListener('click',()=> goToSpatialHistorical());
	spatialHistoricalMobBtn.addEventListener('click',()=> goToSpatialHistorical());

	const map = new google.maps.Map(mapElem.querySelector('#map'), {
		center: {lat: -12.047926,lng: -77.030437}, 
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	});

	const playBtn =mapElem.querySelector('#play');
	const pauseBtn =mapElem.querySelector('#pause');
	const restartBtn =mapElem.querySelector('#restart');

	const selectionPollutant = mapElem.querySelectorAll('input[name=pollutant]');
	const selectionPollutantUnit = mapElem.querySelectorAll('input[name=unit]');
	const selectionHours = mapElem.querySelectorAll('input[name=hours]');

	selectedParameters.pollutant = 'no2-gas';
	selectedParameters.unit = 'ppb';
	selectedParameters.hours = '24h-last';

	selectionPollutant.forEach(radio =>{
		radio.addEventListener('click',()=>{
			selectedParameters.pollutant=radio.id;
		})
		
	})

	selectionPollutantUnit.forEach(radio =>{
		radio.addEventListener('click',()=>{
			selectedParameters.unit=radio.id;
		})
		
	})

	selectionHours.forEach(radio =>{
		radio.addEventListener('click',()=>{
			selectedParameters.hours=radio.id;
		})
		
	})

	playBtn.addEventListener('click',(e)=>{
       
        e.preventDefault();
        console.log(selectedParameters);
        utilHistorical(mapElem,selectedParameters,map);
    });

	return mapElem;

};

export { viewSpatialHistorical };