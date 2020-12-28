import {sourceAPI} from '../index.js';


const requestAllQhawaxByCompany = async company => {
    let total = 1;
	if (company === 3 || company ===8) {
		company = '3,8';
		total=2;
	}
    const response = await fetch(`${sourceAPI}AllQhawaxByCompany/?company_array=${company},&number_companies=${total}`);
    return  await response.json();
}

const requestAllQhawaxByCompanyPrivate = async (company) => {
    let total = 1;
	if (company === 3 || company ===8) {
		company = '3,8';
		total=2;
	}
    const response = await fetch(`${sourceAPI}AllCustomerQhawax/?company_array=${company},&number_companies=${total}`);
    return  await response.json();
}


const requestAllQhawaxInField = async () => {
    const response = await fetch(`${sourceAPI}AllQhawaxInField/`);
    return await response.json();
};

const requestQhawaxByMode = async (mode) => {
    const response = await fetch(`${sourceAPI}get_qhawaxs_by_mode/?mode=${mode}`);
    return await response.json();
};

const requestAllCompanys = async () => {
    const response = await fetch(`${sourceAPI}get_all_company/`);
    return await response.json();
};

const requestInstallationRecord = async (ID) => {
    const response = await fetch(`${sourceAPI}AllQhawaxRecord/?qhawax_id=${ID}`);
    return await response.json();
};

const requestAllQhawax = async () => {
    const response = await fetch(`${sourceAPI}get_qhawaxs/`);
    return await response.json();
};

const requestBinnacle = async (ID) => {
    const response = await fetch(`${sourceAPI}get_all_observations_by_qhawax/?qhawax_id=${ID}`);
    return await response.json();
};

const requestLastQhawax = async () => {
    const response = await fetch(`${sourceAPI}get_last_qhawax`);
    return await response.json();
};

const requestInstallationDetail = async (ID) => {
    const response = await fetch(`${sourceAPI}QhawaxInstallationDetail/?installation_id=${ID}`);
    return await response.json();
};

const urlOffsets = (ID, table) =>{ 
    switch (table) {
    case 0: return `${sourceAPI}request_offsets/?ID=${ID}`;
    case 1: return `${sourceAPI}request_controlled_offsets/?ID=${ID}`;
    case 2: return `${sourceAPI}request_non_controlled_offsets/?ID=${ID}`;
    case 3: return `${sourceAPI}request_opc_variable/?ID=${ID}`;
    }
}
const URL = (p,init,end) =>{
    switch (p.url) {
        case 'hourly-average': return`${sourceAPI}average_valid_processed_period/?qhawax_id=${p.id}&company_id=${p.company}&initial_timestamp=${init}&final_timestamp=${end}`;
        case 'raw-data': return`${sourceAPI}valid_processed_measurements_period/?qhawax_id=${p.id}&company_id=${p.company}&initial_timestamp=${init}&final_timestamp=${end}`;
        case '5min-average': return`${sourceAPI}air_five_minutes_measurements_period/?qhawax_id=${p.id}&company_id=${p.company}&initial_timestamp=${init}&final_timestamp=${end}`;
    }
}

const getSpatialMeasurement = async(p) =>{
    const root = 'http://0.0.0.0:5000/api/'
    const url = `${root}get_historical_of_spatial/?pollutant=${p.pollutant}&last_hours=${p.hours}&pollutant_unit=${p.unit}`;
    const response = await fetch(url);
    return await response.json();
}

const downloadData = async(p,init,end) =>{
    if (p.id==='7'
        ||p.id==='6') {
        if (p.company===3) {
            p.company=8;
        }
    }   
    if (p.id==='9'
        ||p.id==='10'
        ||p.id==='11'
        ||p.id==='12'
        ||p.id==='13'
        ||p.id==='14'
        ||p.id==='15'
        ||p.id==='16'
        ||p.id==='17'
        ) {
    if (p.company===8) {
            p.company=3;
        }
    }

    const response = await fetch(URL(p,init,end));
    return await response.json();
};

const requestInstallationDate = async (ID)=>{
    const response = await fetch(`${sourceAPI}GetInstallationDate/?qhawax_id=${ID}`);
    return await response.text()
};

const requestUsers = async () =>{
    const response = await fetch(`${sourceAPI}getUserCompany/`)
    return await response.json();
};

const requestStatus = async (ID) =>{
    const response = await fetch(`${sourceAPI}qhawax_status/?name=${ID}`);
    return await response.text()
};

const requestWeeklyData = async (data)=>{
    const response = await fetch(`${sourceAPI}air_daily_measurements_period/?qhawax_id=${data.qhawax_id}&init_week=${data.init_week}&init_year=${data.init_year}&end_week=${data.end_week}&end_year=${data.end_year}`);
    return await response.json()
}
const requestGraphicsData = async (qhawax, time)=>{
    const response = await fetch(`${sourceAPI}processed_measurements/?name=${qhawax}&interval_minutes=${time}`);
	return await response.json();
}

const requestFirmwareVersions = async (type)=>{
    const response = await fetch(`${sourceAPI}get_all_firmware_version/?qhawax_type=${type}`);
	return await response.json();
}

const requestQhawaxFirmware = async (type)=>{
    const response = await fetch(`${sourceAPI}get_qhawaxs_firmware_version/`);
	return await response.json();
}

export { requestAllQhawaxByCompany,
    requestAllQhawaxInField,
    requestQhawaxByMode,
    requestAllCompanys,
    urlOffsets,
    requestInstallationRecord,
    requestAllQhawax,
    requestBinnacle,
    requestLastQhawax,
    requestInstallationDetail,
    requestAllQhawaxByCompanyPrivate,
    downloadData,
    requestInstallationDate,
    requestUsers,
    requestStatus,
    requestWeeklyData,
    requestGraphicsData,
    requestFirmwareVersions,
    requestQhawaxFirmware,
    getSpatialMeasurement
}