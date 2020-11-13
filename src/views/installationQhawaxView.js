import {navbarAdmin } from '../lib/navBarAdmin.js';
import { qhawaxInstall} from '../lib/HtmlComponents.js';    
import { requestQhawaxByMode, requestAllCompanys} from '../requests/get.js'; 
import { requestInstallQhawax}    from '../requests/post.js';
import { toAddOptions} from '../lib/displayAssets.js';

const data = {
    lat: Number,
    lon: Number,
    instalation_date: new Date(Date.now()+(5*60*60*1000)).toString().slice(0,24),
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
    is_public: '',
    person_in_charge: sessionStorage.getItem('username'),
    last_registration_time_zone:new Date(Date.now()-30*60000+(5*60*60*1000)).toString().slice(0,24)
};

const selectedOptionId = [
    'qhawax_id',
    'district',
    'company_id',
    'eca_noise_id',
    'connection_type',
    'season',
    'is_public'
];

const inputValuesId = [
    'lat',
    'lon',
    'link_report',
    'observations',
    'comercial_name',
    'address',
    'measuring_height'
];



let all_companys ={};

const request = async (element) => {
    const qhawax_list = await requestQhawaxByMode('Stand By');
    const company_list = await requestAllCompanys();
    all_companys=company_list;
    toAddOptions(element, 'qhawax_id', qhawax_list);
    toAddOptions(element, 'company_id', company_list);
};

const getSelectedValues = (element) => {
    selectedOptionId.forEach(id =>{
        element.querySelector(`#${id}`).addEventListener('change', e => {
            e.preventDefault();
            data[id] = element.querySelector(`#${id}`).value; 
        }); 
    });
    inputValuesId.forEach(id=>{
        element.querySelector(`#${id}`).addEventListener('input', e => {
            e.preventDefault();
            data[id] = element.querySelector(`#${id}`).value; 
        }); 
    });
    return data;
};

const verifyFields =(element)=>{
   const qhawax = element.querySelector('#qhawax_id').value;
   const company = element.querySelector('#company_id').value;
   const zone = element.querySelector('#eca_noise_id').value;
   const season = element.querySelector('#season').value;
   const ispublic = element.querySelector('#is_public').value;
   const conection = element.querySelector('#connection_type').value;
   const lat = element.querySelector('#lat').value;
   const lon = element.querySelector('#lon').value;
   const comercialName = element.querySelector('#comercial_name').value;

   if (qhawax!='' && company!=''&& zone!=''&& season!=''&& ispublic!=''&& conection!=''&&lat!=''&&lon!=''&&comercialName!=''){
        return true;
   }else{
    M.toast({
        html: `
        
        <ul >
        <p> Los siguientes campos son requeridos:</p> 
        <li >Qhawax</li>
        <li >Compañía</li>
        <li >Estación</li>
        <li >Público</li>
        <li >Conexión</li>
        <li >Latitud</li>
        <li >Longitud</li>
        <li >Nombre Comercial</li>
        <li >Zona</li>
        <p> Por favor verifique y vuelva a intentarlo</p>
      </ul>
       
        `,
        displayLength: 5000,
    });
       return false;
   }
    

};

const viewQhawaxInstallation = (company) => {
    const qhawaxInstallElem = document.createElement('div');
    navbarAdmin(qhawaxInstallElem, qhawaxInstall, company);
    request(qhawaxInstallElem);
    getSelectedValues(qhawaxInstallElem);
    const submitBtn = qhawaxInstallElem.querySelector('#submit-btn-install');
    const saveBtn = qhawaxInstallElem.querySelector('.btn-save');

    let dataTags = [];
    submitBtn.addEventListener('click', e=>{
        e.preventDefault();
        data.instalation_date = new Date(Date.now()+(5*60*60*1000)).toString().slice(0,24);
        dataTags= [].concat(data);
        dataTags.lat = 'Latitud:';
        dataTags.lon = 'Longitud:';
        dataTags.instalation_date = 'Fecha de instalación:';
        dataTags.link_report = 'Documento referencial:';
        dataTags.observations = 'Observaciones:';
        dataTags.qhawax_id = 'ID del qHAWAX:';
        dataTags.district = 'Distrito:';
        dataTags.comercial_name = 'Nombre Comercial:';
        dataTags.address = 'Dirección:';
        dataTags.company_id = 'Compañía:';
        dataTags.eca_noise_id = 'Zona de Ruido:';
        dataTags.connection_type = 'Tipo de conexión:';
        dataTags.index_type = 'Indice:';
        dataTags.measuring_height = 'Altura de instalación:';
        dataTags.season = 'Estación:';
        dataTags.is_public = 'Público:';
        dataTags.person_in_charge = 'Responsable';
        Object.entries(data).forEach(i =>{
  
            
            if (i[0]==='eca_noise_id') {
               switch (i[1]) {   
                   case '1': i[1]='Zona de Protección Especial';break;
                   case '2': i[1]='Zona Residencial';break;
                   case '3': i[1]='Zona Comercial';break;
                   case '4': i[1]='Zona Industrial';break;
                   default: break;
               }
            }
 
           const item = document.getElementsByName(`${i[0]}`).item(0);
           
           item.innerText = dataTags[i[0]] + ' \u00A0 \u00A0 \u00A0 \u00A0 \u00A0';

           if (i[0]==='company_id') {
               all_companys.forEach(c=>{
                   if (c.id.toString() === i[1]) {
                       i[1]=c.name;
                       
                   }
               })
        
               
           } 
            
           (item && typeof i[1]!== 'function' &&i[1]!=='' )?(item.innerText += i[1])&&(item.style.color = 'black'):(item.style.color = 'red');        
        
            })

    });

    saveBtn.addEventListener('click', e=>{
        e.preventDefault();
        Object.entries(data).forEach(i =>{

        if (i[0]==='eca_noise_id') {
            switch (i[1]) {   
                case 'Zona de Protección Especial': i[1]='1';break;
                case 'Zona Residencial': i[1]='2';break;
                case 'Zona Comercial': i[1]='3';break;
                case 'Zona Industrial': i[1]='4';break;
                default: break;
            }
         }

         if (i[0]==='company_id') {
            all_companys.forEach(c=>{
                if (c.name.toString() === i[1]) {
                    i[1]=c.id;
                    
                }
            })
        }
        });
        verifyFields(qhawaxInstallElem)?requestInstallQhawax(data) :console.log('falta información');
      
    });
    
    
    return qhawaxInstallElem;
};

export {viewQhawaxInstallation};