import {navbarAdmin } from '../lib/navBarAdmin.js';
import { registerBinnacle} from '../lib/HtmlComponents.js';
import { requestAllQhawaxByCompany} from '../requests/get.js';
import { binnacleObservation, binnacleArea, binnacleEquipment, binnacleMaintenance} from '../requests/post.js';
import { optionsDatePicker, optionsTimePicker} from '../lib/mapAssets.js';


let selectedParameters = {};

let data = {
    initial_timestamp: null,
    end_timestamp: null,
    qhawax_id:null,
    description:null,
    solution:null,
    person_in_charge:sessionStorage.getItem('username')
}
// let dataMaintenance ={
//     qhawax_name:null ,
//     maintenance_date:null,
//     comments:null,
//     person_in_charge:sessionStorage.getItem('username'),
//     description:null
// }

let observationType = '';

const observationPost = (type) =>{
    switch (type) {
        case "Observación": return binnacleObservation(data);
        case "Mantenimiento": return binnacleMaintenance(data);
        case "Limpieza de Área": return binnacleArea(data);
        case "Limpieza de qHAWAX": return binnacleEquipment(data);
        default:
            break;
    }
}
const requestSelectQhawax = async (element, company) => {
    const all_qhawax = await requestAllQhawaxByCompany(company);
    all_qhawax.forEach(qhawax => {
    const addOptions = element.querySelector('#qhawax_id');
      const option = document.createElement('option');
      option.setAttribute('value', qhawax.qhawax_id);
      option.innerText =	qhawax.name + ': ' + qhawax.comercial_name;
     addOptions.appendChild(option);
    });
};

const viewRegisterBinnacle = (company) => {
optionsDatePicker.format='dd-mm-yyyy';
    const regBinnacleElem = document.createElement('div');
    navbarAdmin(regBinnacleElem, registerBinnacle, company);
    requestSelectQhawax(regBinnacleElem, company);
    const form = regBinnacleElem.querySelector('#register-form');
    const datePicker = regBinnacleElem.querySelectorAll('.datepicker');
    const timePicker = regBinnacleElem.querySelectorAll('.timepicker');
    const registerBtn = regBinnacleElem.querySelector('#submit-btn');
    const description = regBinnacleElem.querySelector('#description');
    const solution = regBinnacleElem.querySelector('#solution');
    form.classList.add('hide')
    optionsDatePicker.minDate = new Date(Date.now()- 15 * 24 * 60 * 60 * 1000);
    optionsDatePicker.maxDate = new Date(Date.now());

    let initial_time = null;
    let final_time = null;

    optionsDatePicker.onClose = () => {
        selectedParameters.initDate = Date.parse(datePicker[0].M_Datepicker.date);
        selectedParameters.endDate = Date.parse(datePicker[1].M_Datepicker.date);
        if (selectedParameters.initDate&&selectedParameters.endDate&&
            selectedParameters.initHour&&selectedParameters.endHour) {
                initial_time = selectedParameters.initDate + Number(selectedParameters.initHour.split(':')[0])*60*60*1000+ Number(selectedParameters.initHour.split(':')[1])*60*1000;
                final_time = selectedParameters.endDate + Number(selectedParameters.endHour.split(':')[0])*60*60*1000+ Number(selectedParameters.endHour.split(':')[1])*60*1000;
        }
    
    };
    optionsTimePicker.onCloseEnd = () => {
        selectedParameters.initHour = timePicker[0].M_Timepicker.time;
        selectedParameters.endHour = timePicker[1].M_Timepicker.time;
        if (selectedParameters.initDate&&selectedParameters.endDate&&
            selectedParameters.initHour&&selectedParameters.endHour) {
                initial_time = selectedParameters.initDate + Number(selectedParameters.initHour.split(':')[0])*60*60*1000+ Number(selectedParameters.initHour.split(':')[1])*60*1000;
                final_time = selectedParameters.endDate + Number(selectedParameters.endHour.split(':')[0])*60*60*1000+ Number(selectedParameters.endHour.split(':')[1])*60*1000;
        }
    };

    description.addEventListener('input', e=>{
        data.description = description.value;
    })
    solution.addEventListener('input', e=>{
        data.solution = solution.value;
    })
    
    M.Datepicker.init(datePicker, optionsDatePicker);
    M.Timepicker.init(timePicker, optionsTimePicker);
    
  
    const textNeedCount = regBinnacleElem.querySelectorAll('#solution, #description');
    M.CharacterCounter.init(textNeedCount);

    
    regBinnacleElem.querySelector('#qhawax_id').addEventListener('change', e=>{
        e.preventDefault();
        observationType!==''? form.classList.remove('hide'):form.classList.add('hide');
        data.qhawax_id = e.target.value;       
    });  

    regBinnacleElem.querySelector('#register_type').addEventListener('change', e=>{
        e.preventDefault();
        data.qhawax_id!==null?form.classList.remove('hide'):form.classList.add('hide');
        observationType = e.target.value;  
        regBinnacleElem.querySelector('#binnacle_type').innerHTML=`Registro de ${e.target.value}`;    
    });  
    registerBtn.addEventListener('click', e=>{
        
        data.initial_timestamp = new Date(initial_time)
        data.end_timestamp =new Date(final_time)
        
        if (initial_time<final_time && !Object.values(data).includes(null)) {

             observationPost(observationType);
        }else if(initial_time<final_time){
            M.toast({
				html: `La fecha de inicio debe ser menor a la fecha de fin.`,
				displayLength: 3000,
			});
        }else if(Object.values(data).includes(null)){
            M.toast({
				html: `Por favor rellenar todos los campos.`,
				displayLength: 3000,
			});
        }else{
            M.toast({
				html: `Por verifica las horas.`,
				displayLength: 3000,
			});
        }
        
    });
    
    
    return regBinnacleElem;
};

export {viewRegisterBinnacle};