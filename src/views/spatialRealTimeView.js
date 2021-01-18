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
import { viewMap} from '../lib/HtmlComponents.js'
import { requestAllQhawaxByCompany} from '../requests/get.js';
import { sourceSocket } from '../index.js';

const viewSpatialRealTime = () => {
	const mapElem = document.createElement('div');
	const menuNavBar = document.querySelector('header');
	
	menuNavBar.innerHTML = navbar(dropdownLegend);
	
	const menulist = document.querySelector('#menu-list-bar');
	const menuNavMobile= document.querySelector('#mobile-nav');
	
	menulist.innerHTML = positionsMaintain + forecasting + spatialHistorical;
	menuNavMobile.innerHTML = spinMob+positionsMaintainMobile +forecastingMobile +spatialHistoricalMobile;
	mapElem.innerHTML = viewMap;
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