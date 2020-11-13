import {navbar, 
    dropdownConfig,
    config,
    logout,
    logoutMob,
    download,
    downloadMob,
    returnArrow,
    configMobile,
    returnArrowMob,
    modalChangePass,
    changePassEvent,
    legend,
    legendMobile,
    dropdownLegend
    } from '../lib/navMenus.js';

import { goInitLog,
    goToLogout,
    goToDownload
    } from '../lib/directioning.js';

const NavBarClientLog = (element, display, company) =>{
    const menuNavBar = document.querySelector('header');
    menuNavBar.innerHTML = navbar(dropdownConfig.concat(dropdownLegend));
    
    const menulist = document.querySelector('#menu-list-bar');
	const menuleft = document.querySelector('#menu-left-bar');
    const menuNavMobile= document.querySelector('#mobile-nav');

    menulist.innerHTML = legend + download + config +logout;
	menuleft.innerHTML = returnArrow;
	menuNavMobile.innerHTML = returnArrowMob + legendMobile + configMobile +downloadMob+logoutMob;

	element.innerHTML = display + modalChangePass;
	
	const dropMenu = document.querySelectorAll('.dropdown-trigger');
	M.Dropdown.init(dropMenu,{coverTrigger:false});
	
	const mobileMenu = document.getElementById('mobile-nav');
    M.Sidenav.init(mobileMenu);
   
	const modal = document.querySelectorAll('.modal');
	M.Modal.init(modal);
    const modal1 = element.querySelectorAll('.modal');
	M.Modal.init(modal1);
    
    document.querySelector('#logout-menu').addEventListener('click', () =>goToLogout(company));
    document.querySelector('#logout-menu-mobile').addEventListener('click', () =>goToLogout(company));
    document.querySelector('#return-menu').addEventListener('click', () => goInitLog(company));
    document.querySelector('#return-menu-mobile').addEventListener('click', () =>goInitLog(company));
    document.querySelector('#download-menu').addEventListener('click', () => goToDownload(company));
    document.querySelector('#download-mob-menu').addEventListener('click', () => goToDownload(company));

	element.querySelector('#submit-btn-change').addEventListener('click',e => changePassEvent(e, element))

};

export {NavBarClientLog};