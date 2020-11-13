import {navbarAdmin } from '../lib/navBarAdmin.js';
import { viewCompanys } from '../lib/HtmlComponents.js';
import { sortTable, displayList } from '../lib/displayAssets.js';
import { requestAllCompanys, requestUsers} from '../requests/get.js';

let page = 1;
const location= 'company_list';



const module = (q) =>`
<!-- Modal Users Structure -->
<div id="users${q.id}" class="modal">
  <div class="modal-content">
    <ul class="collection with-header" >
    <li class="collection-header center"><h4>Usuarios Activos de <strong>${q.name}</strong></h4></li>
    <li class="collection-item" id="list${q.id}"></li>
  </div>
  <div class="modal-footer">
  <button  class="modal-close waves-effect waves-red btn-flat center btn-edit">CERRAR</button>
  </div>
</div>
`;
const request = async (element) => {
    const company_list = await requestAllCompanys()
    company_list.forEach(c => {   
        element.innerHTML += module(c);
    });
    
    M.Modal.init(element.querySelectorAll('.modal'));
    displayList(element, company_list,page,location);
};
const usersList = (element) =>{
    const usersBtn = element.getElementsByClassName('users-btn');
    Array.from(usersBtn).forEach(btn=>{
        btn.addEventListener('click',async e=>{      
           const users = await requestUsers();
           const usersList = element.querySelector(`#list${e.target.dataset.id}`);
           usersList.innerHTML='';
           users.forEach(u=>{
            if (u.company_id===Number(e.target.dataset.id)) {
            const user = document.createElement('li');
            user.classList.add('collection-item');
            user.innerText = u.email;
            usersList.appendChild(user)
            
            }
            
           })
           
        })
    })
}


const viewCompanysList = (company) => {
    const companyElem = document.createElement('div');
    navbarAdmin(companyElem, viewCompanys, company);
    request(companyElem);
    const cidSort = companyElem.querySelector('#sort_id');    
    const cnameSort = companyElem.querySelector('#sort_name');    
    const crucSort = companyElem.querySelector('#sort_ruc');
    const caddressSort = companyElem.querySelector('#sort_address');
    const ccontactSort = companyElem.querySelector('#sort_contact');
    const cphoneSort = companyElem.querySelector('#sort_phone');
    const cdomainSort = companyElem.querySelector('#sort_domain');


   
    cidSort.addEventListener('click', (e)=>sortTable(companyElem,0,e));
    cnameSort.addEventListener('click', (e)=>sortTable(companyElem,1,e));
    crucSort.addEventListener('click', (e)=>sortTable(companyElem,2,e));
    caddressSort.addEventListener('click', (e)=>sortTable(companyElem,3,e));
    ccontactSort.addEventListener('click', (e)=>sortTable(companyElem,4,e));
    cphoneSort.addEventListener('click', (e)=>sortTable(companyElem,5,e));
    cdomainSort.addEventListener('click', (e)=>sortTable(companyElem,6,e));
    

    return companyElem;
};

export {viewCompanysList, usersList};