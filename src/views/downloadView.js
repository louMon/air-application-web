import {
	openModalDateAlert,
	openModalEmptyAlert
} from '../lib/pickerErrors.js';
import { json2csv, download } from '../lib/fromJsonToCsv.js';
import { navbarAdmin} from '../lib/navBarAdmin.js';
import { NavBarClientLog } from '../lib/navBarClientLog.js';
import { viewDownload} from '../lib/HtmlComponents.js';
import { requestAllQhawaxByCompanyPrivate, downloadData, requestInstallationDate} from '../requests/get.js';
import { optionsDatePicker,optionsTimePicker} from '../lib/mapAssets.js';
import { reorderDate, withLocalTime} from '../lib/time.js'


const csvFields = [
	'CO (ug/m3)',
	'H2S (ug/m3)',
	'NO2 (ug/m3)',
	'O3 (ug/m3)',
	'PM10 (ug/m3)',
	'PM2.5 (ug/m3)',
	'SO2 (ug/m3)',
	'Ruido (dB)',
	'UV',
	'Humedad (%)',
	'Latitud',
	'Longitud',
	'Presion (hPa)',
	'Temperatura (C)',
	'Fecha',
];

const waitingLoader = `
<div class="progress">
      <div class="indeterminate"></div>
  </div>
`;
let array_qhawax = [];
let selectedParameters = {};



const requestQhawaxs = async (element, company) => {
	const qhawax_list = await requestAllQhawaxByCompanyPrivate(company);
	const addOptions = element.querySelector('#selectQhawax');
	qhawax_list.forEach(qhawax => {
		const option = document.createElement('option');
		option.setAttribute('value', qhawax.qhawax_id);
		option.innerText =	qhawax.name + ': ' + qhawax.comercial_name;
		array_qhawax.push(qhawax);
		addOptions.appendChild(option);
	});
};
const requestDownload = async (selectedParameters,init,end) => {
	let filename = '';
	const json = await downloadData(selectedParameters,init,end)
	array_qhawax.forEach(qhawax => {
		filename +=	Number(selectedParameters.id) === Number(qhawax.qhawax_id)
				? `${qhawax.name}` +
				  '-' +
				  `${qhawax.comercial_name}`
				: '';
			});
	
	const csvContent = json!=='Valid Measurements not found'?json2csv(json, csvFields,selectedParameters):'';
	csvContent!=='' ? download(csvContent,`${filename}.csv`,'text/csv;encoding:utf-8'):M.Toast.dismissAll()||M.toast({ html: 'No hay data válida para el periodo.',
	displayLength: 3000, });
	setTimeout(()=>window.location.reload(), 2000)
};


const installationDateReq = async (selection, element)=>{
	const installationDate = await requestInstallationDate(selection[0].value)
	
			selectedParameters.id = selection[0].value;
			optionsDatePicker.minDate = new Date(installationDate);
			optionsDatePicker.maxDate = new Date(Date.now());
			optionsDatePicker.onClose = () => {
				selectedParameters.initDate = datePicker[0].value;
				selectedParameters.endDate = datePicker[1].value;
			};
			optionsTimePicker.onCloseEnd = () => {
				selectedParameters.initHour = timePicker[0].value;
				selectedParameters.endHour = timePicker[1].value;
			};

			const datePicker = element.querySelectorAll('.datepicker');
			M.Datepicker.init(datePicker, optionsDatePicker);

			const timePicker = element.querySelectorAll('.timepicker');
			M.Timepicker.init(timePicker, optionsTimePicker);
};

const initialToast = ()=>{
	M.toast({ html: '¡Primero seleccione un módulo!' });
	M.toast({ html: 'Por favor complete todos los campos.' });
}

const finalToast=()=>{
	M.toast({
		html: 'La descarga puede tomar unos 5 minutos...',
		displayLength: 10000,
	});
	M.toast({
		html: '¡Estamos preparando la data!',
		displayLength: 6000,
	});
}

const downloadView = company => {
	initialToast()

	const downloadElem = document.createElement('div');
	if (company===1) {
		navbarAdmin(downloadElem, viewDownload, company);
	} else {
		NavBarClientLog(downloadElem, viewDownload, company);
	};

	requestQhawaxs(downloadElem, company);

	const selection = downloadElem.querySelectorAll('select');
	M.FormSelect.init(selection);
	
	selectedParameters.company = company;
	selectedParameters.url = 'hourly-average';
	
	const selection2 = downloadElem.querySelectorAll('input[name=group1]');

	
	selection[0].onchange = () => {
		installationDateReq(selection, downloadElem)
	};
	selection2.forEach(radio =>{
		radio.addEventListener('click',()=>{
			selectedParameters.url=radio.id;
		})
		
	})

	const downloadBtn = downloadElem.querySelector('#submit-btn');
	downloadBtn.addEventListener('click', (e) => {	
		e.preventDefault();
		
		const initial_timestamp = withLocalTime(selectedParameters.initDate+' '+selectedParameters.initHour+':00');
		const final_timestamp = withLocalTime(selectedParameters.endDate+' '+selectedParameters.endHour+':00');
		const initial_value = initial_timestamp.slice(3,6)+
		initial_timestamp.slice(0,2)+initial_timestamp.slice(5,19)
		const final_value=final_timestamp.slice(3,6)+
		final_timestamp.slice(0,2)+final_timestamp.slice(5,19)

		if (Object.values(selectedParameters).includes("")||Object.values(selectedParameters).length<7) {
			openModalEmptyAlert();
		} else {
			if (Date.parse(initial_value) >= Date.parse(final_value)) {
				openModalDateAlert();
			} else {
				
					
				requestDownload(selectedParameters,initial_timestamp,final_timestamp)			 	
				finalToast();
				const pannel = document.querySelector('.card-pannel');
				pannel.innerHTML = waitingLoader;
			}
		}
		
	});

	return downloadElem;
};

export { downloadView };
