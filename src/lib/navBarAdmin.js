import {navbar, 
    dropdownConfigADM,
    config,
    logout,
    returnArrow,
    configMobile,
    returnArrowMob,
    modalChangePass,
    modalNewUser,
    changePassEvent,
    reports,
    reportsMobile,
    dropdownReports,
    monitor,
    monitorMobile,
    dropdownMonitor,
    maintenance,
    maintenanceMobile,
    dropdownMaintenance,
    configAdm,
    configAdmMob
    } from '../lib/navMenus.js';

import { goToLogout,
    goToDownload,
    goToDashboard,
    goToDwnGraph,
    goToBinnacle,
    goToGraphics,
    goInit,
    goToListQhawax,
    goToListCompany,
    goToQhawaxInstallation,
    goToQhawaxInstallationList,
    goToQhawaxInstallationEdit,
    goToRegisterBinnacle,
    goToCalibration,
    goToFirmware,
    goToConfig
} from '../lib/directioning.js';

//import { requestAllCompanys} from '../requests/get.js'; 
import { toAddOptions} from '../lib/displayAssets.js';

//const request = async (element) => {
//    const company_list = await requestAllCompanys();
//    toAddOptions(element, 'company_id_user', company_list);

//};
    
const navbarDrops = dropdownReports.concat(dropdownMonitor).concat(dropdownMaintenance);

const navbarAdmin = (element, display, company)=>{
	
	const menuNavBar = document.querySelector('header');
	menuNavBar.innerHTML = navbar(navbarDrops);

	const menulist = document.querySelector('#menu-list-bar');
	const menuleft = document.querySelector('#menu-left-bar');
	const menuNavMobile= document.querySelector('#mobile-nav');  

	
	menulist.innerHTML = maintenance + monitor + reports + configAdm +logout;
	menuleft.innerHTML = returnArrow;
	menuNavMobile.innerHTML = returnArrowMob + configAdmMob +reportsMobile + monitorMobile + maintenanceMobile;

	element.innerHTML = display;
    

	const dropMenu = document.querySelectorAll('.dropdown-trigger');
	M.Dropdown.init(dropMenu,{coverTrigger:false});
	
	const mobileMenu = document.getElementById('mobile-nav');
    M.Sidenav.init(mobileMenu);
   
	const modal = element.querySelectorAll('.modal');
    M.Modal.init(modal);
    
    const modal1 = document.querySelectorAll('.modal');
    M.Modal.init(modal1);
    
    // request(element)

	document.querySelector('#return-menu').addEventListener('click', () => goInit(company));
	document.querySelector('#logout-menu').addEventListener('click', () =>goToLogout(company));
	document.querySelector('#return-menu-mobile').addEventListener('click', () =>goInit(company));
	document.querySelector('#data-dwn').addEventListener('click', () =>goToDownload());
	document.querySelector('#graph-dwn').addEventListener('click', () =>goToDwnGraph());
	document.querySelector('#binnacle').addEventListener('click', () =>goToBinnacle());
	document.querySelector('#data-dwn-mob').addEventListener('click', () =>goToDownload());
	document.querySelector('#graph-dwn-mob').addEventListener('click', () =>goToDwnGraph());
	document.querySelector('#binnacle-mob').addEventListener('click', () =>goToBinnacle());
	document.querySelector('#dashboard').addEventListener('click', () =>goToDashboard());
	document.querySelector('#dashboard-mob').addEventListener('click', () =>goToDashboard());
	document.querySelector('#graphics').addEventListener('click', () =>goToGraphics());
    document.querySelector('#graphics-mob').addEventListener('click', () =>goToGraphics());
    document.querySelector('#qhawax-list').addEventListener('click', () =>goToListQhawax());
    document.querySelector('#qhawax-list-mob').addEventListener('click', () =>goToListQhawax());
    document.querySelector('#company-list').addEventListener('click', () =>goToListCompany());
    document.querySelector('#company-list-mob').addEventListener('click', () =>goToListCompany());

    document.querySelector('#qhawax-installed').addEventListener('click', () =>goToQhawaxInstallationList());
    document.querySelector('#qhawax-installed-mob').addEventListener('click', () =>goToQhawaxInstallationList());
    document.querySelector('#qhawax-installation').addEventListener('click', () =>goToQhawaxInstallation());
    document.querySelector('#qhawax-installation-mob').addEventListener('click', () =>goToQhawaxInstallation());
    document.querySelector('#qhawax-installation-edit').addEventListener('click', () =>goToQhawaxInstallationEdit());
    document.querySelector('#qhawax-installation-edit-mob').addEventListener('click', () =>goToQhawaxInstallationEdit());

    document.querySelector('#binnacle-reg').addEventListener('click', () =>goToRegisterBinnacle());
    document.querySelector('#binnacle-reg-mob').addEventListener('click', () =>goToRegisterBinnacle());
    document.querySelector('#calibration').addEventListener('click', () =>goToCalibration());
    document.querySelector('#calibration-mob').addEventListener('click', () =>goToCalibration());
    document.querySelector('#firmware-actual').addEventListener('click', () =>goToFirmware());
    document.querySelector('#firmware-actual-mob').addEventListener('click', () =>goToFirmware());

    document.querySelector('#config-menu-adm').addEventListener('click',()=>goToConfig());
    document.querySelector('#config-menu-adm-mobile').addEventListener('click',()=>goToConfig());

}

export {navbarAdmin}