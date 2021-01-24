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
import { requestAllQhawaxByCompany,getSpatialMeasurement} from '../requests/get.js';
import { sourceSocket } from '../index.js';

let selectedParameters = {};
let progress_form = "";
let array_length = 0;
let percentage = 0;
let counter = 0;
let increment = 0;
var rectangle;
var rectangle_list = [];

const progress_bar =p=> `
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

function selectColor(value){
	if(value>=0 & value<=250){
		return '#66b768'
	}else if(value>250 & value<=450){
		return '#fffe9c'
	}else if(value>450 & value<=650){
		return '#d68242'
	}else if(value>650 & value<=1000){
		return '#f41a29'
	}
	return '#3d3939'
}

function iterateByGrid(positions_length,arrayExample,map,indice,pollutant_unit){
	// Remove Previous Rectangle
    for(let ind=0; ind < rectangle_list.length; ind++) {
	    if(rectangle_list[ind]){
	      rectangle_list[ind].setMap(null);
	    }
	 }
	var unit = 'ppb_value';
	if(pollutant_unit=='ugm3'){
		unit= 'ug_m3_value';
	}
	for(let ind=0; ind < positions_length; ind++) {
        let coordinates = {'lat': arrayExample[indice]['lat'][ind], 'lon': arrayExample[indice]['lon'][ind]};
      	var bounds = lookforBounds(arrayExample[indice]['lat'][ind],arrayExample[indice]['lon'][ind]);
      	var color_generated = selectColor(arrayExample[indice][unit][ind]);
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

function iterateByTime(counter,arrayExample,increment, percentage,map,array_length,progress_form,pollutant_unit){
	setTimeout(function() {   //  call a 3s setTimeout when the loop is called
		percentage = increment + percentage;
		if (counter+1 == array_length) {
	    	percentage = 100;
	    }
    	let positions_length = arrayExample[counter]['has_qhawax'].length;
	    iterateByGrid(positions_length,arrayExample,map,counter,pollutant_unit);
	    progress_form.innerHTML=progress_bar(percentage);
	    counter++;                    //  increment the counter
	    if (counter< array_length) {  //  if the counter < 10, call the loop function
	    	iterateByTime(counter,arrayExample,increment, percentage,map,array_length,progress_form,pollutant_unit)
	    }
	    if(percentage == 100){
	    	M.toast({
		   		html: `Se mostraron todas las horas de dicho contaminante`,
		    	displayLength: 3000,
			});
			setTimeout(()=>window.location.reload(), 5000);
	    }    
	}, 3000);
	
}

const startHistorical = async (mapElem,selectedParameters,map,pollutant_unit) => {
	const json_array = await getSpatialMeasurement(selectedParameters);
	progress_form = mapElem.querySelector('#form_progress_spatial');
	array_length = json_array.length;
	percentage = 0;
	counter = 0;
	increment = Math.round(100/parseFloat(array_length));
	iterateByTime(counter,json_array,increment, percentage,map,array_length,progress_form,pollutant_unit);
};

const pauseHistorical = async () => { //falta detenerlo
	console.log('Entre a pausar');
	clearTimeout(iterateByTime);
	console.log("luego de pausar");
};

const restartHistorical = async (map) => { //falta restaurarlo
	console.log('Entre a reiniciar');
	//iterateByTime(counter,arrayExample,increment,percentage,map,array_length,progress_form)
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

	const map = new google.maps.Map(mapElem.querySelector('#map'), {
		center: {lat: -12.097926,lng: -77.050437}, 
		zoom: 12,
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
			console.log(selectedParameters.hours)
		})
		
	})

	playBtn.addEventListener('click',(e)=>{
       
        e.preventDefault();
        console.log(selectedParameters);
        startHistorical(mapElem,selectedParameters,map,selectedParameters.unit);
    });

    pauseBtn.addEventListener('click',(e)=>{
       
        e.preventDefault();
        console.log(selectedParameters);
        pauseHistorical();
    });

    restartBtn.addEventListener('click',(e)=>{
       
        e.preventDefault();
        console.log(selectedParameters);
        restartHistorical(map);
    });

	return mapElem;

};

export { viewSpatialHistorical };