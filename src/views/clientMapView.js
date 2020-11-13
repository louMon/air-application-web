import { drawQhawaxMap, zoomByCompany } from '../lib/mapAssets.js';
import { NavBarClientLog} from '../lib/navBarClientLog.js';
import {viewMap} from '../lib/HtmlComponents.js';
import { requestAllQhawaxByCompanyPrivate} from '../requests/get.js';
import { sourceSocket } from '../index.js';

const request = async (map, company) => {

	const qhawax_list = await requestAllQhawaxByCompanyPrivate(company);
	qhawax_list.forEach(qhawax => {
		drawQhawaxMap(map, qhawax, company);
	});
};

const viewClientMap = company =>{
    const mapElem = document.createElement('div');
	NavBarClientLog(mapElem, viewMap, company);

	const map = new google.maps.Map(mapElem.querySelector('#map'), {
		center: {lat: -12.1453674,lng: -77.0240709},
		zoom: zoomByCompany(company),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	});

	map.markers = [];
	map.latitude = [];
	map.longitude = [];

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
			
			request(map, company);
			mapElem.querySelector('#over_map').addEventListener('mouseenter',(e)=>{
				M.Toast.dismissAll();
				M.toast({html: 'Puede hacer click en una hoja para ver la información.',
				classes: 'orange darken-1 rounded',
				displayLength: 2000})
				
			})
	return mapElem;
};

export { viewClientMap}