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

const requestQhawaxByMode = async (mode) => {
    const response = await fetch(`${sourceAPI}get_qhawaxs_by_mode/?mode=${mode}`);
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

const requestAllModulesAvailable = async () =>{
    const response = await fetch(`https://qairamapnapi.qairadrones.com/api/AllQhawaxByCompany/?company_array=21,22,23,24,25,26,27,28,&number_companies=8`);
    return await response.json();
}

const requestLastQhawax = async () => {
    const response = await fetch(`${sourceAPI}get_last_qhawax`);
    return await response.json();
};

const requestUsers = async () =>{
    const response = await fetch(`${sourceAPI}getUserCompany/`)
    return await response.json();
};

const requestStatus = async (ID) =>{
    const response = await fetch(`${sourceAPI}qhawax_status/?name=${ID}`);
    return await response.text()
};

const requestFirmwareVersions = async (type)=>{
    const response = await fetch(`${sourceAPI}get_all_firmware_version/?qhawax_type=${type}`);
	return await response.json();
}

const getSpatialMeasurement = async(p) =>{
    const root = 'http://pucp-calidad-aire-api.qairadrones.com/api/'
    const url = `${root}get_historical_of_spatial/?pollutant=${p.pollutant}&last_hours=${p.hours}&pollutant_unit=ugm3`;
    const response = await fetch(url);
    return await response.json();
}

const getGrids = async() =>{
    const root = 'http://pucp-calidad-aire-api.qairadrones.com/api/'
    const url = `${root}get_all_grid/`;
    const response = await fetch(url);
    return await response.json();
}

export { requestAllQhawaxByCompany,
    requestQhawaxByMode,
    requestInstallationRecord,
    requestAllQhawax,
    requestLastQhawax,
    requestAllQhawaxByCompanyPrivate,
    requestUsers,
    requestStatus,
    requestFirmwareVersions,
    getSpatialMeasurement,
    requestAllModulesAvailable,
    getGrids
}