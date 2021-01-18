import { drawQhawaxMap, zoomByCompany } from '../lib/mapAssets.js';
import {goToPositionsMaintain, goToSpatialRealTime, goToSpatialHistorical} from '../lib/directioning.js';
import {navbar,
positionsMaintain,
dropdownLegend,
positionsMaintainMobile,
chooseSpinnerMenu,
spinMob,
styledNavBar,
spatialRealTime,
spatialRealTimeMobile,
spatialHistorical,
spatialHistoricalMobile
} from '../lib/navMenus.js';
import { viewSearchingPanelForecasting} from '../lib/HtmlComponents.js'
import { requestAllQhawaxByCompany} from '../requests/get.js';
import { sourceSocket } from '../index.js';

const viewForecasting= () => {
	const mapElem = document.createElement('div');
	const menuNavBar = document.querySelector('header');
	
	menuNavBar.innerHTML = navbar(dropdownLegend);
	
	const menulist = document.querySelector('#menu-list-bar');
	const menuNavMobile= document.querySelector('#mobile-nav');
	
	menulist.innerHTML = positionsMaintain + spatialRealTime + spatialHistorical;
	menuNavMobile.innerHTML = spinMob+positionsMaintainMobile +spatialRealTimeMobile+ spatialHistoricalMobile;
	mapElem.innerHTML = viewSearchingPanelForecasting;
	//chooseSpinnerMenu(company);

	const pointsBtn = document.querySelector('#positions-menu');
	const pointsMobBtn = document.querySelector('#positions-menu-mobile');

	const spatialRealTimeBtn = document.querySelector('#spatial-real-time-menu');
	const spatialRealTimeMobBtn = document.querySelector('#spatial-real-time-menu-mobile');

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

	spatialRealTimeBtn.addEventListener('click',()=> goToSpatialRealTime());
	spatialRealTimeMobBtn.addEventListener('click',()=> goToSpatialRealTime());

	spatialHistoricalBtn.addEventListener('click',()=> goToSpatialHistorical());
	spatialHistoricalMobBtn.addEventListener('click',()=> goToSpatialHistorical());

	const map = new google.maps.Map(mapElem.querySelector('#map'), {
		center: {lat: -12.1453674,lng: -77.0240709},
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	});

	return mapElem;

};

export { viewForecasting };