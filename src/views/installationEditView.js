import {navbarAdmin } from '../lib/navBarAdmin.js';
import { qhawaxInstallEdit, qhawaxInstallEditForm} from '../lib/HtmlComponents.js';
import { requestQhawaxByMode, requestInstallationDetail, requestAllQhawaxInField, requestAllCompanys, requestAllQhawaxByCompany} from '../requests/get.js';
import { toAddOptions} from '../lib/displayAssets.js';
import { editInstallation} from '../requests/post.js';


const data = {
    lat: Number,
    lon: Number,
    link_report: '',
    observations: '',
    qhawax_id: Number,
    district: '',
    comercial_name: '',
    address: '',
    company_id: Number,
    eca_noise_id: Number,
    connection_type: '',
    index_type: 'inca',
    measuring_height: Number,
    season: '',
    is_public: ''
};

const selectElements = [
    'district',
    'eca_noise_id',
    'connection_type',
    'season',
    'is_public',
    'lat',
    'lon',
    'link_report',
    'observations',
    'comercial_name',
    'address',
    'measuring_height'
];


const requestSelectQhawax = async (element, company) => {
    const qhawax_list = await requestQhawaxByMode('Cliente');
    const all_qhawax = await requestAllQhawaxByCompany(company);
    all_qhawax.forEach(qhawax => {
    const qHAWAX = qhawax_list.find(c=>c.id===qhawax.qhawax_id);  
    const addOptions = element.querySelector('#qhawax_id_reg');
      const option = document.createElement('option');
      option.setAttribute('value', qhawax.qhawax_id);
      option.innerText =	qhawax.name + ': ' + qhawax.comercial_name;
     qHAWAX? addOptions.appendChild(option):'';
    });
};

const displayValuesInModule = (element, company_name, qhawax_name) =>{
    data.person_in_charge = sessionStorage.getItem('username');
    const module = document.querySelector('.with-header');
    module.querySelector('#title-module').innerHTML = `Actualización del qHAWAX: </br>${qhawax_name} de ${company_name}`;
    let dataTags = [];
    dataTags= [].concat(data);
        dataTags.lat = 'Latitud:';
        dataTags.lon = 'Longitud:';
        dataTags.link_report = 'Documento referencial:';
        dataTags.observations = 'Observaciones:';
        dataTags.district = 'Distrito:';
        dataTags.comercial_name = 'Nombre Comercial:';
        dataTags.address = 'Dirección:';
        dataTags.eca_noise_id = 'Zona de Ruido:';
        dataTags.connection_type = 'Tipo de conexión:';
        dataTags.measuring_height = 'Altura de instalación:';
        dataTags.season = 'Estación:';
        dataTags.is_public = 'Público:';
    selectElements.forEach(id =>{
    const list_element = document.createElement('li');
    list_element.classList.add('collection-item');
    
        const selectedValue = element.querySelector(`#${id}`).value
            selectedValue !=''? data[id] = selectedValue: data[id]=data[id];
            module.appendChild(list_element);
            data[id]===undefined ?data[id]='':data[id]=data[id];
            list_element.innerText = dataTags[id] +'  ' +data[id];
    });
    
};


const displayValuesInForm = async (form, ID) =>{
    const qhawax_installed = await requestAllQhawaxInField();
    const qhawax_id_ref = qhawax_installed.find( q => q.qhawax_id === Number(ID)).id;
    const detail = await requestInstallationDetail(qhawax_id_ref);
    const company_list = await requestAllCompanys()
    const company_name = company_list.find(c=>c.id===detail.company_id).name;    
     form.innerHTML = qhawaxInstallEditForm(detail, company_name);
    const submitBtn = form.querySelector('#submit-btn-install');
     Object.entries(data).forEach(k => {
         data[k[0]] = detail[k[0]]
     });
     submitBtn.addEventListener('click',e=>{
        e.preventDefault();
        displayValuesInModule(form, company_name, ID)
        
     })
     
   
};

const viewQhawaxInstallationEdit = (company) => {
    const qhawaxInstallEditElem = document.createElement('div');
    navbarAdmin(qhawaxInstallEditElem, qhawaxInstallEdit, company);
    requestSelectQhawax(qhawaxInstallEditElem, company);
    
    const qhawaxSelector = qhawaxInstallEditElem.querySelector('#qhawax_id_reg');
    const detailForm = qhawaxInstallEditElem.querySelector('.edit-table-form');
    const saveBtn = qhawaxInstallEditElem.querySelector('.btn-save');

    qhawaxSelector.addEventListener('change', e=>{
        e.preventDefault();
        detailForm.innerHTML = '';
        displayValuesInForm(detailForm, e.target.value);
        
        
    })
    saveBtn.addEventListener('click', e=>{
        e.preventDefault();
        editInstallation(data);
        
    })
    return qhawaxInstallEditElem;
};

export {viewQhawaxInstallationEdit};
