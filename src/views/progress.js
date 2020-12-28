import {navbarAdmin } from '../lib/navBarAdmin.js';
import { firmware } from '../lib/HtmlComponents.js';
import { displayList } from '../lib/displayAssets.js';
import { requestQhawaxFirmware, requestAllQhawaxByCompany, requestFirmwareVersions, requestQhawaxByMode } from '../requests/get.js';
import { firmwareUpdate, newFirmware } from '../requests/post.js';
import {sourceSocket} from '../index.js';
const ID = 'AKIAXIHWITV57ET5GRXZ';
const SECRET = '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';
const BUCKET_NAME = 'qairamap-database-dev';
const values =[];
let page = 1;
const location= 'qhawax_firmware_list';
const dataUpgrade = [];

const progress_bar =p=> `
<div class="container" style="margin-bottom:1em;">
<div class="progress">
      <div class="determinate" id="firmware_progress_bar" style="width: ${p}%">${p}%</div>
  </div>
</div>
`
        AWS.config.region = 'us-east-1'; 
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:307e7e01-2443-44ed-bfc5-c01b96a1da49',
        });

      let s3 = new AWS.S3({
        apiVersion: "2010-12-01",
        accessKeyId: ID,      
        accessSecretKey: SECRET,  
        region: "us-east-1",
        Bucket: 'qairamap-database-dev',
      });
      const request = async (element) => {
        const qhawax_list = await requestQhawaxFirmware();
        displayList(element, qhawax_list,page,location);
        
    };
    const validate = (element,values) => {
      const create = element.querySelector('#submit-btn-create');
      values.includes('')?create.classList.add('disabled'):create.classList.remove('disabled')
    }

    const newFirmwareCreate = (element) => {
        const type = element.querySelector('#type');
        const version = element.querySelector('#v_inline');
        const description = element.querySelector('#description');

        type.addEventListener('change', e=>{
          values[0]=e.target.value;
          validate(element,values); 
        })

        version.addEventListener('input', e=> {
          values[1]=e.target.value;
          validate(element,values); 
        })

        description.addEventListener('input', e=> {
          values[2]=e.target.value;
          validate(element,values); 
        })

    };

    const createFirmware = (data)=>{
      const json = {version_name:data[1],description:data[2],qhawax_type:data[0]};
      newFirmware(json)
    }

    const nameQhawaxRequest = async(element, company)=>{
      const initName = await requestAllQhawaxByCompany(company);
      const firmware_mode = await requestQhawaxByMode('Firmware Update');
      const select = element.querySelector('#qhawax_id');
      select.innerHTML='<option value="" disabled selected>Selecciona el qHAWAX</option>';
      
      initName.forEach(q => {
        const qHAWAX = firmware_mode.find(c=>c.name===q.name);  
          const option = document.createElement('option');
          option.innerText=q.name;
          option.value=[q.name,q.qhawax_type];
        !qHAWAX?select.appendChild(option):'';
        
      });
  };

  const versionsRequest = async(element,type)=>{
    const vers = await requestFirmwareVersions(type)
    const select = element.querySelector('#version');
    select.innerHTML='<option value="" disabled selected>Selecciona la versión</option>';
    vers.forEach(q => {
      const option = document.createElement('option');
      option.innerText=q.name;
      option.value=q.id;
      select.appendChild(option)
    });
};
const urlToAPI = (info, element) => {
  const update_form = element.querySelector('#form_update_firmware');
  const progress_table = element.querySelector(`#${info[1]}`);
  
  const data = {
    url_of_bif_file: info[0], 
    qhawax_name: info[1],
    person_in_charge:sessionStorage.getItem('username'),
    firmware_version_id:info[2]
  }
      firmwareUpdate(data)
      M.toast({
        html: `El Archivo ha sido cargado.`,
        displayLength: 8000,
      });
      const socket = io.connect(`${sourceSocket}`);
      socket.on('firmware_progress', res => {
        const percentage = Math.round(res.numbering_by_frame / res.all_frames * 100);
        update_form.innerHTML=progress_bar(100-percentage);
        progress_table.innerText=`${100-percentage}%`;
        if (percentage===0) {
          M.toast({
            html: `El ciclo de actualización se completará al recibir un mail de confirmación.`,
            displayLength: 3000,
          });
          setTimeout(()=>window.location.reload(), 2000);
        }
      })
      
}

  const uploadToS3 = (uploadParams, element) => {
    const save = element.querySelector('#btn-save');
    s3.upload(uploadParams).on('httpUploadProgress', function(e) {
      const uploaded = Math.round(e.loaded / e.total * 100);
      console.log(`File uploaded: ${uploaded}%`);
      element.querySelector('#loading_file').innerHTML=`File uploaded: ${uploaded}%`;
  }).send((err, data) =>{

      if (err){
          // an error occurred, handle the error
          console.log(err, err.stack);
          return;
      } else {
        dataUpgrade[0] = data.Location;
        !data ? save.classList.add('disabled'):save.classList.remove('disabled');
        save.addEventListener('click',e =>{
          e.preventDefault()
        urlToAPI(dataUpgrade,element)   
        })
      }
  })
  };

const viewFirmware = (company) => {
    const firmwareElem = document.createElement('div');
    request(firmwareElem)
    navbarAdmin(firmwareElem, firmware, company);
    newFirmwareCreate(firmwareElem);
    nameQhawaxRequest(firmwareElem, company)

    const create = firmwareElem.querySelector('#submit-btn-create');
    create.addEventListener('click', e=>{
      createFirmware(values)
    })

    const selectQhawax = firmwareElem.querySelector('#qhawax_id');
    selectQhawax.addEventListener('change', e=>{
      e.preventDefault()
      versionsRequest(firmwareElem,String(e.target.value).split(',')[1])
      dataUpgrade[1] = String(e.target.value).split(',')[0];
    })

    const selectVer = firmwareElem.querySelector('#version');
    selectVer.addEventListener('change',e =>{
      dataUpgrade[2]= e.target.value;
    })

    const fileElem = firmwareElem.querySelector('#firmware_file');
    fileElem.addEventListener('change',e=>{
      const selectedFile = fileElem.files[0];
      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key:selectedFile.name,  
        Body:selectedFile
      }
      uploadToS3(uploadParams, firmwareElem)
    })
    return firmwareElem;
};

export {viewFirmware};