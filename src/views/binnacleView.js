
import {navbarAdmin } from '../lib/navBarAdmin.js';
import { binnacle } from '../lib/HtmlComponents.js';
import { requestAllQhawaxByCompany, requestBinnacle} from '../requests/get.js';
import { options} from '../lib/displayAssets.js';
let array_qhawax = [];
const requestSelectQhawax = async (element, company) => {
    const qhawax_list = await requestAllQhawaxByCompany(company);
    const addOptions = element.querySelector('#qhawax_id');
    qhawax_list.forEach(qhawax => {
      const option = document.createElement('option');
      option.setAttribute('value', qhawax.qhawax_id);
      option.innerText =	qhawax.name + ': ' + qhawax.comercial_name;
      array_qhawax.push(qhawax);
      addOptions.appendChild(option);
    });
  };
const tileCard = (info) => 
    `
    <div class="timeline-event">
      <div class="card timeline-content">
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">${info.description}<i class="material-icons right">more_vert</i></span>
          <p>${info.observation_type} <a>${new Date(Date.parse(info.timestamp_zone)).toLocaleDateString('es-ES', options)}</a></p>
        </div>
        <div class="card-reveal">
        <p>Autor: ${info.person_in_charge===null?'Interno':info.person_in_charge}</p>
        <p>${info.start_date_zone===null?'Fecha de inicio: '+info.start_date_zone:''}</p>
        <p>${info.end_date_zone===null?'Fecha de fin: '+info.end_date_zone:''}</p>
          <span class="card-title grey-text text-darken-4">Solución:<i class="material-icons right">close</i></span>
          <p>${info.solution===null?'No se registra':info.solution}</p>
        </div>
      </div>
      <div class="timeline-badge ${info.observation_type==='Interna'?'yellow':info.observation_type==='Externa'?'red':'green'} white-text"><i class="material-icons">adjust</i></div>
    `;

const requestRecord = async (ID, container) => {
    const qhawax_record = await requestBinnacle(ID);
    const orderedBinnacle =qhawax_record.sort((a, b) =>{
      return a.timestamp_zone - b.timestamp_zone;
    });
    orderedBinnacle.reverse().forEach(q => {      
        container.innerHTML += tileCard(q);
    });
    
}

const viewBinnacle = (company) => {
    const binnacleElem = document.createElement('div');

    navbarAdmin(binnacleElem, binnacle, company);
    requestSelectQhawax(binnacleElem,company);
    const container = binnacleElem.querySelector('#binnacle');
    
    binnacleElem.querySelector('#qhawax_id').addEventListener('change',e=>{
        e.preventDefault();
        container.innerHTML = '';
        requestRecord(e.target.value,container)
    })
    return binnacleElem;
};  

export {viewBinnacle};
