import { addZero} from '../lib/mapAssets.js';
const options = {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
};
import { reorderDate} from './time.js'

const index=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dic']


const json2csv = (jsonData, jsonFields,selectedParameters) => {
	let csvStr = jsonFields.join(',') + '\n';

	for (let i = 0; i < jsonData.length; i++) {
	const newFormat = new Date(jsonData[i].timestamp_zone)
		const year = String(newFormat).slice(11,24);
		const month = String(addZero(index.findIndex(m => m === String(newFormat).slice(4,7))+1));
		const day = String(newFormat).slice(8,10);
		jsonData[i].timestamp_zone = day+'/'+month+'/'+year;
		const dateCompare = year.slice(0,4)+'-'+month+'-'+day;

		if (selectedParameters.company===4 && selectedParameters.id==='8' && Date.parse('2020-08-24')<=Date.parse(dateCompare)) {	
			jsonData[i].NO2_ug_m3= '-';
			} 
		if (selectedParameters.company===3 && selectedParameters.id==='10' && Date.parse('2020-01-01')<=Date.parse(dateCompare)) {	
			jsonData[i].O3_ug_m3= '-';
			} 
		if (selectedParameters.company===3 && selectedParameters.id==='13' && Date.parse('2020-09-04')<=Date.parse(dateCompare)) {	
			jsonData[i].UV= '-';
			} 
		if (selectedParameters.company===3 && selectedParameters.id==='18' && Date.parse('2020-09-15')<=Date.parse(dateCompare)) {	
			jsonData[i].O3_ug_m3= '-';
			}

		csvStr +=
			Object.getOwnPropertyNames(jsonData[i])
				.map(e => jsonData[i][e])
				.join(',') + '\n';
	}
	return csvStr;
};



const download = (content, fileName, mimeType) => {
	const a = document.createElement('a');
	mimeType = mimeType || 'application/octet-stream';

	if (navigator.msSaveBlob) {
		// IE10
		navigator.msSaveBlob(
			new Blob([content], {
				type: mimeType,
			}),
			fileName
		);
	} else if (URL && 'download' in a) {
		//html5 A[download]
		a.href = URL.createObjectURL(
			new Blob([content], {
				type: mimeType,
			})
		);
		a.setAttribute('download', fileName);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	} else {
		location.href =
			'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
	}
};

export { json2csv, download };
