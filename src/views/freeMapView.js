import { drawQhawaxMap, zoomByCompany } from '../lib/mapAssets.js';
import {goToLogin} from '../lib/directioning.js';
import {navbar,
legend,
login,
dropdownLegend,
legendMobile,
loginMobile,
chooseSpinnerMenu,
spinMob,
styledNavBar,
} from '../lib/navMenus.js';
import { viewMap} from '../lib/HtmlComponents.js'
import { requestAllQhawaxByCompany} from '../requests/get.js';
import { sourceSocket } from '../index.js';

const viewFreeMap = company => {
	
	const mapElem = document.createElement('div');
	const menuNavBar = document.querySelector('header');
	
	menuNavBar.innerHTML = navbar(dropdownLegend);
	

	const menulist = document.querySelector('#menu-list-bar');
	const menuNavMobile= document.querySelector('#mobile-nav');
	
	menulist.innerHTML = legend + login;
	menuNavMobile.innerHTML = spinMob+legendMobile+loginMobile;
	mapElem.innerHTML = viewMap;
	chooseSpinnerMenu(company);
	const loginBtn = document.querySelector('#login-menu');
	const loginMobBtn = document.querySelector('#login-menu-mobile');

	const mobileMenu = document.getElementById('mobile-nav');
	M.Sidenav.init(mobileMenu);
	const modals = mapElem.querySelectorAll('.modal');
	M.Modal.init(modals);
	const modals2 = document.querySelectorAll('.modal');
	M.Modal.init(modals2);
	const dropMenu = document.querySelectorAll('.dropdown-trigger');
	M.Dropdown.init(dropMenu,{coverTrigger:false});

	loginBtn.addEventListener('click',()=> goToLogin());
	loginMobBtn.addEventListener('click',()=> goToLogin());
	
	styledNavBar(company);

	const map = new google.maps.Map(mapElem.querySelector('#map'), {
		center: {lat: -12.1453674,lng: -77.0240709},
		zoom: zoomByCompany(company),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	});
	map.markers = [];
	map.latitude = [];
	map.longitude = [];
	const request = async () => {
   
		const qhawax_list = await requestAllQhawaxByCompany(company);
		qhawax_list.forEach(qhawax => {
			drawQhawaxMap(map, qhawax, company);
		});
	};

		const socket = io.connect(`${sourceSocket}`);
		socket.on('update_inca',async res => {
			const qhawax_list = await requestAllQhawaxByCompany(company);
			qhawax_list.forEach(qhawax => {
				if (qhawax.name === res.name) {
					qhawax.main_inca = res.main_inca;
	
					drawQhawaxMap(map, qhawax, company);
				}
			});
			
		});

		request();


		mapElem.querySelector('#over_map').addEventListener('mouseenter',(e)=>{
		M.Toast.dismissAll();
		M.toast({html: 'Puede hacer click en una hoja para ver la información.',
		classes: 'orange darken-1 rounded',
		displayLength: 2000})
		
	})

	return mapElem;
};

export { viewFreeMap };
