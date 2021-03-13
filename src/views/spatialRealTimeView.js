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
import { viewMap,viewSearchingPanelRealTime,landbar} from '../lib/HtmlComponents.js'
import { requestAllQhawaxByCompany} from '../requests/get.js';
import { sourceSocket } from '../index.js';

const arrayStatic = [
{"has_qhawax": [false,false,true,false],"hour_position": [0,0,0,0],"id": [937,1441,433,1945],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [100.0,2.0,1.0,3.0]},
{"has_qhawax": [false,false,false,true],"hour_position": [1,1,1,1],"id": [1442,1946,938,434],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [1.0,79.0,23.0,133.0]},
{"has_qhawax": [false,false,false,true],"hour_position": [2,2,2,2],"id": [1947,1443,939,435],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [89.0,1.0,1.0,10.0]},
{"has_qhawax": [false,true,false,false],"hour_position": [3,3,3,3],"id": [1948,436,1444, 940],"lat":[-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [10.0,25.0,60.0,49.0]},
{"has_qhawax": [false,true,false,false],"hour_position": [4,4,4,4],"id": [1445,437,941,1949],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [50.0,20.0,150.0,356.0]},
{"has_qhawax": [false,true,false,false],"hour_position": [5,5,5,5],"id": [1445,437,941,1949],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [100.0,2.0,455.0,20.0]},
{"has_qhawax": [false,true,false,false],"hour_position": [6,6,6,6],"id": [1445,437,941,1949],"lat": [-12.048839,-12.046069,-12.053161,-12.054798],"lon":[-77.024212,-77.018590,-77.017345,-77.027731],"ppb_value": [6.0,100.0,3.0,455.0]}]


const viewSpatialRealTime = () => {
	const mapElem = document.createElement('div');
	const menuNavBar = document.querySelector('header');
	
	menuNavBar.innerHTML = navbar(dropdownLegend);

	const menulist = document.querySelector('#menu-list-bar');
	const menuNavMobile= document.querySelector('#mobile-nav');
	
	menulist.innerHTML = positionsMaintain + forecasting + spatialHistorical;
	menuNavMobile.innerHTML = spinMob+positionsMaintainMobile +forecastingMobile +spatialHistoricalMobile;
	mapElem.innerHTML = viewSearchingPanelRealTime;
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
		center: {lat: -12.1453674,lng: -77.0240709},
		zoom: 10,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	});

	return mapElem;

};

export { viewSpatialRealTime };