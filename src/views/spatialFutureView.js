import { drawQhawaxMap, zoomByCompany } from '../lib/mapAssets.js';
import {goToPositionsMaintain, goToForecasting, goToSpatialHistorical} from '../lib/directioning.js';
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
import { requestAllQhawaxByCompany} from '../requests/get.js';
import { sourceSocket } from '../index.js';
import { createMarkers} from '../lib/mapUtils.js';

var positionlat_list = [-12.045286,-12.050278, -12.041025, -12.044226, -12.0466667, -12.0450749, -12.047538,-12.054722,-12.044236,-12.051526,-12.042525,-12.046736,-12.045394,-12.057582];
var positionlon_list = [-77.030902,-77.026111, -77.043454, -77.050832, -77.080277778, -77.0278449, -77.035366,-77.029722,-77.012467,-77.077941,-77.033486,-77.047594,-77.036852,-77.071778];

const arrayStatic = [
{"has_qhawax": [false,false,true,false],"hour_position": [0,0,0,0],"id": [937,1441,433,1945],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [100.0,2.0,1.0,3.0]},
{"has_qhawax": [false,false,false,true],"hour_position": [1,1,1,1],"id": [1442,1946,938,434],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [1.0,79.0,23.0,133.0]},
{"has_qhawax": [false,false,false,true],"hour_position": [2,2,2,2],"id": [1947,1443,939,435],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [89.0,1.0,1.0,10.0]},
{"has_qhawax": [false,true,false,false],"hour_position": [3,3,3,3],"id": [1948,436,1444, 940],"lat":[-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [10.0,25.0,60.0,49.0]},
{"has_qhawax": [false,true,false,false],"hour_position": [4,4,4,4],"id": [1445,437,941,1949],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [50.0,20.0,150.0,356.0]},
{"has_qhawax": [false,true,false,false],"hour_position": [5,5,5,5],"id": [1445,437,941,1949],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [100.0,2.0,455.0,20.0]},
{"has_qhawax": [false,true,false,false],"hour_position": [6,6,6,6],"id": [1445,437,941,1949],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [6.0,100.0,3.0,455.0]}]

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

const viewSpatialRealTime = () => {
	const mapElem = document.createElement('div');
	const menuNavBar = document.querySelector('header');
	
	menuNavBar.innerHTML = navbar(dropdownLegend);

	const menulist = document.querySelector('#menu-list-bar');
	const menuNavMobile= document.querySelector('#mobile-nav');
	
	menulist.innerHTML = positionsMaintain + forecasting + spatialHistorical;
	menuNavMobile.innerHTML = spinMob+positionsMaintainMobile +forecastingMobile +spatialHistoricalMobile;
	mapElem.innerHTML = viewSearchingPanelFuture;
	//chooseSpinnerMenu(company);

	const pointsBtn = document.querySelector('#positions-menu');
	const pointsMobBtn = document.querySelector('#positions-menu-mobile');

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

	pointsBtn.addEventListener('click',()=> goToPositionsMaintain());
	pointsMobBtn.addEventListener('click',()=> goToPositionsMaintain());

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

	return mapElem;

};

export { viewSpatialRealTime };