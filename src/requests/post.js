import {sourceAPI} from '../index.js';
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

const saveOffsets = (offsetsValues, offsetsContrValues, offsetsNcValues,offsetsNcValuesPM) => {
    const requests = [
        {url:`${sourceAPI}save_offsets/`, data:offsetsValues},
        {url:`${sourceAPI}save_controlled_offsets/`, data: offsetsContrValues},
		{url:`${sourceAPI}save_non_controlled_offsets/`, data: offsetsNcValues},
		{url:`${sourceAPI}save_opc_variables/`, data: offsetsNcValuesPM}
    ]
		requests.forEach(r=>{
            fetch(r.url, {
                method: 'POST',
                body: JSON.stringify(r.data),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(res => res.text())
                .then(res => console.log(res));
    
        })
};

const requestEndCalibration = (data) =>{
const url = `${sourceAPI}end_calibration/`;
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

const endOfFieldWork = (data) =>{
	const url = `${sourceAPI}saveEndWorkField/`;
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
			console.log(res)
			M.toast({
				html: `${data.person_in_charge}: El qHAWAX ${data.qhawax_id} ha terminado su trabajo en campo`,
				displayLength: 3000,
			});
			setTimeout(()=>window.location.reload(), 3000)
		})
}

const editInstallation = (data) =>{
	const url = `${sourceAPI}updateQhawaxInstallation/`;
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
			console.log(res)
			M.toast({
				html: `La instalación del qHAWAX ${data.comercial_name} ha sido actualizada`,
				displayLength: 3000,
			});
			setTimeout(()=>window.location.reload(), 3000)
		})

};

const binnacleObservation = (data) =>{
	const url = `${sourceAPI}record_observation_binnacle/`;
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
			console.log(res)
			M.toast({
				html: `La observación ha sido registrada`,
				displayLength: 3000,
			});
			setTimeout(()=>window.location.reload(), 3000)
		})
};
const binnacleArea = (data) =>{
	const url = `${sourceAPI}saveCleaningAreaDate/`;
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
			console.log(res)
			M.toast({
				html: `La limpieza de área ha sido registrada`,
				displayLength: 3000,
			});
			setTimeout(()=>window.location.reload(), 3000)
		})
};
const binnacleEquipment = (data) =>{
	const url = `${sourceAPI}saveCleaningEquipmentDate/`;
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
			console.log(res)
			M.toast({
				html: `La limpieza de qHAWAX ha sido registrada`,
				displayLength: 3000,
			});
			setTimeout(()=>window.location.reload(), 3000)
		})
};
const binnacleMaintenance = (data) =>{
	const url = `${sourceAPI}saveMaintenanceDate/`;
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
			console.log(res)
			M.toast({
				html: `El mantenimiento de qHAWAX ha sido registrado.`,
				displayLength: 3000,
			});
			setTimeout(()=>window.location.reload(), 3000)
		})
};

 const changePassword = (email, old_pass, new_pass) => {
	const url = `${sourceAPI}changePassword/`;
    const data = {
        email: `${email}`,
        old_password: `${old_pass}`,
        new_password: `${new_pass}`,
    };
	 fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.json())
		.catch(err => {console.error(err)
			M.toast({
				html: `La contraseña no ha sido cambiada.`,
				displayLength: 3000,
			})
		})  
		.then(res =>{
			console.log(res);
			if (res.error==='Incorrect Password') {
				M.toast({
					html: `La contraseña ingresada es incorrecta.`,
					displayLength: 3000,
				});
			} else if (res.OK==='Password have been changed') {
				M.toast({
					html: `Su contraseña ha sido actualizada`,
					displayLength: 3000,
				});
			}

			
			setTimeout(()=>window.location.reload(), 3000)
		})
 };

 const createUser = (data) =>{
	 const url = `${sourceAPI}createUser/`;

	 fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.text())
		.catch(err => {	console.error(err);
			M.toast({
				html: `El usuario no ha podido ser creado, inténtelo de nuevo.`,
				displayLength: 3000,
			})
		})  
		.then(res =>{
			switch (res) {
				case 'User has been created':  {M.toast({
					html: `El usuario ${data.email} ha sido creado.`,
					displayLength: 3000,
				});}break;

				case 'Invalid Format': 
				 {M.toast({
					html: `Por favor revise los datos e inténtelo de nuevo.`,
					displayLength: 3000,
				});}break;
			}
			
			setTimeout(()=>window.location.reload(), 3000)
		})
 };

 const login = (email, password, element)=>{
	fetch(
		`${sourceAPI}login/?email=${email}&password=${password}`
	)
		.then(res => res.json())
		.then(res => {
			sessionStorage.setItem('companyID', res.company_id);
			sessionStorage.setItem('companyName', res.company_name);
			sessionStorage.setItem('user_id', res.user_id);
			sessionStorage.setItem('username', res.username);

			if (res === 'User and password not valid') {
				const card_alert = element.querySelector('.chip');
				card_alert.classList.remove('hide');
				const close_tag = element.querySelector('.close-tag');
				close_tag.addEventListener('click', () =>
					window.location.reload()
				);
			} else if (res.company_id === 1) {
				window.location.assign('..#/qairamap');
				window.location.reload();
			}

			 else {
				window.location.assign('..#/clientmap');
				window.location.reload();
			}
		});
		

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

const newFirmware = (data) =>{
	const url = `${sourceAPI}new_firmware_version/`;
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
			console.log(res)
			{M.toast({
				html: `La nueva versión ha sido creada!.`,
				displayLength: 3000,
			});}
			setTimeout(()=>window.location.reload(), 3000)
		})
};


const saveNewGrid= (lat, lon)=> {

    const data = {
		lat: lat, 
		lon: lon,
		has_qhawax: 0
	}
    const url = `http://0.0.0.0:5000/api/store_grid_to_predict/`;
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

export { 
	saveOffsets, 
	requestEndCalibration, 
	turnQhawaxOn, 
	turnQhawaxOff,
	changeModeToCalibration,
	createQhawax,
	endOfFieldWork,
	editInstallation,
	binnacleObservation,
	binnacleArea,
	binnacleEquipment,
	binnacleMaintenance,
	changePassword,
	createUser,
	login,
	firmwareUpdate,
	newFirmware,
	saveNewGrid
}