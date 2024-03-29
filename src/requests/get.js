import {sourceAPI,qairamapAPI} from '../index.js';

const requestQhawaxByMode = async (mode) => {
    const response = await fetch(`${qairamapAPI}get_qhawaxs_by_mode/?mode=${mode}`);
    return await response.json();
};

const requestInstallationRecord = async (ID) => {
    const response = await fetch(`${qairamapAPI}AllQhawaxRecord/?qhawax_id=${ID}`);
    return await response.json();
};

const requestAllQhawax = async () => {
    const response = await fetch(`${qairamapAPI}get_qhawaxs/`);
    return await response.json();
};

const requestAllModulesAvailable = async () =>{
    const response = await fetch(`${qairamapAPI}AllQhawaxByCompany/?company_array=21,22,23,24,25,26,27,28,&number_companies=8`);
    return await response.json();
}

const requestStatus = async (ID) =>{
    const response = await fetch(`${qairamapAPI}qhawax_status/?name=${ID}`);
    return await response.text()
};

const getGrids = async() =>{
    const url = `${sourceAPI}get_all_grid/`;
    const response = await fetch(url);
    return await response.json();
}

const getLastRunnintTimestamp_ByPredictionModel = async(p) =>{
    const url = `${sourceAPI}get_prediction_configure_by_model_type/?model_type=${p}`;
    const response = await fetch(url);
    return await response.json();
}

const getForecastingMeasurement = async(p) =>{
    const url = `${sourceAPI}get_historical_of_temporal/?pollutant=${p.pollutant}&last_hours=6&pollutant_unit=ugm3`;
    const response = await fetch(url);
    return await response.json();
}

const getMaxAndMinMeasurement = async(p) =>{
    const url =`${sourceAPI}get_max_min_by_pollutant/?pollutant=${p.pollutant}`;
    const response = await fetch(url);
    return await response.json();
}

const getTotalSpatialMeasurement = async(p) =>{
    const url = `${sourceAPI}get_total_spatial_interpolation/?pollutant=${p.pollutant}`;
    const response = await fetch(url);
    return await response.json();
}

const get24hoursMeasurements = async(p)=>{
    const url = `${sourceAPI}get_forecasting_by_pollutant_of_one_station/?environmental_station_id=${p.station_id}&pollutant=${p.pollutant}`;
    const response = await fetch(url);
    return await response.json();
}

const getFondecytQhawax = async(p) =>{
    const url = `${sourceAPI}get_all_fondecyt_env_station`;
    const response = await fetch(url);
    return await response.json();
}

export { requestQhawaxByMode,
    requestInstallationRecord,
    requestAllQhawax,
    requestStatus,
    requestAllModulesAvailable,
    getGrids,
    getLastRunnintTimestamp_ByPredictionModel,
    getForecastingMeasurement,
    getTotalSpatialMeasurement,
    getMaxAndMinMeasurement,
    get24hoursMeasurements,
    getFondecytQhawax
}