import {navbarAdmin } from '../lib/navBarAdmin.js';
import { qhawaxInstallList} from '../lib/HtmlComponents.js';
import { sortTable, displayList } from '../lib/displayAssets.js';
import { requestAllQhawaxInField } from '../requests/get.js';
import { endOfFieldWork} from '../requests/post.js';

let page = 1;
const location= 'qhawax_installation_list';

const uninstallQhawax = (element) =>{    
    const uninstallBtn = element.getElementsByClassName('uninstall-btn');
    Array.from(uninstallBtn).forEach(btn=>{
        btn.addEventListener('click',e=>{           
            const data = {end_date:new Date().toISOString(),
                qhawax_id:e.target.dataset.id,
                person_in_charge:sessionStorage.getItem('username')}        
                endOfFieldWork(data);
        })
    })
};

const module = (q) =>`
<!-- Modal Uninstall Structure -->
<div id="uninstall${q.qhawax_id}" class="modal">
  <div class="modal-content">
    <h4 class="center">DESINSTALAR</h4>
    <h5 class="center">Desea desistalar permanentemente el qHAWAX ${q.qhawax_name}?</h5>
  </div>
  <div class="modal-footer">
  <button  class="modal-close waves-effect waves-green btn-flat right btn-save uninstall-btn" data-id=${q.qhawax_id}>DESINSTALAR</button>
  <button  class="modal-close waves-effect waves-red btn-flat left btn-edit">VOLVER</button>
  </div>
</div>

`;

const request = async (element) => {
    const qhawax_list = await requestAllQhawaxInField();
    qhawax_list.forEach(q => {
        element.innerHTML += module(q);
    });
    M.Modal.init(element.querySelectorAll('.modal'));
    displayList(element, qhawax_list,page,location);
    
};

const viewQhawaxInstallationList = (company) => {
    const installElem = document.createElement('div');
    navbarAdmin(installElem, qhawaxInstallList, company);
    request(installElem, company);
    
    
    const sortInca = installElem.querySelector('#sort-inca');
    const comNameSort = installElem.querySelector('#sort-comName');  
    const companySort = installElem.querySelector('#sort-company'); 
    const comIdSort = installElem.querySelector('#sort-comId'); 
    const qhawaxIdSort = installElem.querySelector('#sort-qhawaxId'); 
    const installDateSort = installElem.querySelector('#sort-installDate'); 
    const cleanDateSort = installElem.querySelector('#sort-cleanDate'); 
    const maintDateSort = installElem.querySelector('#sort-maintDate'); 
    const publicSort = installElem.querySelector('#sort-public'); 
    const districtSort = installElem.querySelector('#sort-district'); 
    const sortBtn = installElem.querySelector('#sort-uninstall');
 
    sortInca.addEventListener('click', (e)=>sortTable(installElem,0,e));
    comNameSort.addEventListener('click', (e)=>sortTable(installElem,1,e));
    companySort.addEventListener('click', (e)=>sortTable(installElem,2,e));
    comIdSort.addEventListener('click', (e)=>sortTable(installElem,3,e));
    qhawaxIdSort.addEventListener('click', (e)=>sortTable(installElem,4,e));
    installDateSort.addEventListener('click', (e)=>sortTable(installElem,5,e));
    cleanDateSort.addEventListener('click', (e)=>sortTable(installElem,6,e));
    maintDateSort.addEventListener('click', (e)=>sortTable(installElem,7,e));
    publicSort.addEventListener('click', (e)=>sortTable(installElem,8,e));
    districtSort.addEventListener('click', (e)=>sortTable(installElem,9,e));
    sortBtn.addEventListener('click', (e)=>sortTable(installElem,10,e));

    
    return installElem;
};

export {viewQhawaxInstallationList, uninstallQhawax};