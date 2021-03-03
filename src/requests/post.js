import {sourceAPI,qairamapAPI} from '../index.js';
import {withLocalTime} from '../lib/time.js';
const replacer = (key, value) => {
	if (key === "lat" 
		|| key === "lon" 
		|| key=== "qhawax_id" 
		|| key==="company_id" 
		|| key==="measuring_height" 
		|| key==="eca_noise_id") {
	  return new Number(value);
	}else{
		return value;
	}
  };

const turnQhawaxOn= (ID)=> {
    
    const data = { qhawax_name: ID}
    const url = `${sourceAPI}qhawax_change_status_on/`;
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
            .then(res => res.text())
            .catch(err => console.error(err))
            .then(res => console.log(res))
};

const turnQhawaxOff= (ID) => {
	const data = { qhawax_name: ID,
		qhawax_lost_timestamp:withLocalTime(new Date(Date.now())),
		person_in_charge:sessionStorage.getItem('username'),
		description:"Se apago el qHAWAX por la web"}

    const url = `${sourceAPI}qhawax_change_status_off/`;

		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
            .then(res => res.text())
            .catch(err => console.error(err))
            .then(res => console.log(res))
               
};

const changeModeToCalibration = (qhawax_name) =>{
	const data = {qhawax_name: qhawax_name, person_in_charge: sessionStorage.getItem('username')}
	const url = `${sourceAPI}change_to_calibration/`;
	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.text())
		.catch(err => console.error(err))
		.then(res => console.log(res))
}

const createQhawax= (name, type, version)=> {

    const data = {
		qhawax_name: name, 
		qhawax_type: type, 
		person_in_charge: sessionStorage.getItem('username'), 
		description:"Se creó el qHAWAX en la web",
		firmware_version_id:version
	}
    const url = `${sourceAPI}create_qhawax/`;
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
                'Content-Type': 'application/json',
			},
		})
            .then(res => res.text())
            .catch(err => console.error(err))
            .then(res =>{
                console.log(res)
                M.toast({
                    html: `${sessionStorage.getItem('username')}: El qHAWAX ${name} de tipo ${type} y sus sensores han sido creados`,
                    displayLength: 3000,
                });
                setTimeout(()=>window.location.reload(), 3000)
            })
};

 const firmwareUpdate = (data) =>{
	const url = `${sourceAPI}new_firmware_update/`;
	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.text())
		.catch(err =>{ console.error(err)
			M.toast({
				html: `Ha ocurrido un error en el envío, intente de nuevo.`,
				displayLength: 3000,
			});
			setTimeout(()=>window.location.reload(), 2000)
		}
		
		)
		.then(res => {
			console.log(res)
			M.toast({
				html: `El arhivo ha sido enviado al qHAWAX!.`,
				displayLength: 5000,
			});
			M.toast({
				html: `Por favor espere aprox. un minuto para el inicio del proceso`,
				displayLength: 8000,
			});
		
		})
};

const saveNewGrid= (lat, lon)=> {

    const data = {
		lat: lat, 
		lon: lon,
		has_qhawax: 0
	}
    const url = `${sourceAPI}store_grid_to_predict/`;
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
                'Content-Type': 'application/json',
			},
		})
            .then(res => res.text())
			.catch(err => console.error(err))
			.then(res => {
				console.log(res);
				if (res === 'Grid recorded') {
					{M.toast({
						html: `El grid seleccionado ha sido almacenado!.`,
						displayLength: 3000,
					});}
				} else if (res === 'Grid already exists') {
					{M.toast({
						html: `El grid seleccionado ya se encuentra almacenado!.`,
						displayLength: 3000,
					});}
				}
				//setTimeout(()=>window.location.reload(), 3000)
			})
};

const deleteAllGrids= ()=> {

    const url = `${sourceAPI}delete_all_grids/`;
		fetch(url, {
			method: 'POST',
			headers: {
                'Content-Type': 'application/json',
			},
		})
            .then(res => res.text())
			.catch(err => console.error(err))
			.then(res => {
				console.log(res);
				if (res === 'Grids has been deleted') {
					{M.toast({
						html: `Todas las grillas han sido eliminadas.`,
						displayLength: 3000,
					});}
				}
				//setTimeout(()=>window.location.reload(), 3000)
			})
};

export {
	turnQhawaxOn, 
	turnQhawaxOff,
	changeModeToCalibration,
	createQhawax,
	firmwareUpdate,
	saveNewGrid,
	deleteAllGrids
}