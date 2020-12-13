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
import { requestAllQhawaxByCompany} from '../requests/get.js';
import { sourceSocket } from '../index.js';

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
		center: {lat: -12.1453674,lng: -77.0240709},
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	});

	return mapElem;

};

export { viewSpatialHistorical };