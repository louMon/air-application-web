import {navbar, 
    dropdownConfig,
    config,
    logout,
    returnArrow,
    configMobile,
    returnArrowMob,
    changePassEvent,
    } from '../lib/navMenus.js';

import {goToLogout, goInit} from '../lib/directioning.js'

const navBarClient = (element, display, company)=>{
    const menuNavBar = document.querySelector('header');
	menuNavBar.innerHTML = navbar(dropdownConfig);

	const menulist = document.querySelector('#menu-list-bar');
	const menuleft = document.querySelector('#menu-left-bar');
	const menuNavMobile= document.querySelector('#mobile-nav');

	menulist.innerHTML = config +logout;
	menuleft.innerHTML = returnArrow;
	menuNavMobile.innerHTML = configMobile+ returnArrowMob;
	
	element.innerHTML = display;
	
	const dropMenu = document.querySelectorAll('.dropdown-trigger');
	M.Dropdown.init(dropMenu,{coverTrigger:false});

	const mobileMenu = document.getElementById('mobile-nav');
	M.Sidenav.init(mobileMenu);
	
	const modal = document.querySelectorAll('.modal');
	M.Modal.init(modal);
	const modal1 = element.querySelectorAll('.modal');
	M.Modal.init(modal1);
	
	document.querySelector('#return-menu').addEventListener('click', () => goInit(company));
	document.querySelector('#logout-menu').addEventListener('click', () =>goToLogout(company));
	document.querySelector('#return-menu-mobile').addEventListener('click', () =>goInit(company));

	element.querySelector('#submit-btn-change').addEventListener('click',e => changePassEvent(e, element))
}

export {navBarClient}