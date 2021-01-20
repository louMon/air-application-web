import { qhawaxSwitchStatus, qhawaxChangeMode} from '../views/qhawaxListView.js';
import { qhawaxLeaf} from './mapAssets.js';
let rows_per_page = 5;
let current_page = 1;
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour: '2-digit', minute: '2-digit' };
const dateProcess = (date) =>{
    const dateIn = new Date(Date.parse(date));
    return date?dateIn.getDate()+' / '+(dateIn.getMonth()+1)+' / '+dateIn.getFullYear():'Sin registro';

}
const isUrlLink = (str) => {
    if (str.includes('http')) {
        return `<a href="${str}">Repositorio Github</a>`;
    } else {
        return `${str}`;
    }
}
    

const  row_data =(q,location)=>{

    switch (location) {
    case 'qhawax_list':return `
    <td ><img src="${qhawaxLeaf(q.main_inca)}" alt="INCA: ${q.main_inca}" width="30" height="30"></td> 
    <td >${q.name}</td> 
    <td >${q.qhawax_type}</td> 
    <td >${q.mode==='Calibracion'||q.mode==='Firmware Update'?q.mode: q.mode + `<button class="btn-floating btn-small waves-effect waves-light edit-mode-list" name="${q.name}"><i class="material-icons" >edit</i></button>
    <div class="row">
        <div>
          <select class="browser-default change-mode-select none" id="${q.name}">
              <option value="" disabled selected>Cambiar Modo</option>
              <option value="${q.name}">Calibración</option>
            </select>
        </div>
      </div>`}</td> 
    <td >${q.state}</td>
    <td ><div class="switch">
     <label>
        Off
        <input type="checkbox"${q.state ==='ON'? 'checked':''} id="${q.name}">
        <span class="lever"></span>
        On
    </label>
    </div></td>

    `;

    case 'company_list': return `
    <td >${q.id}</td> 
    <td >${q.name}</td> 
    <td >${q.ruc}</td> 
    <td >${q.address}</td> 
    <td >${q.contact_person}</td> 
    <td >${q.phone}</td> 
    <td >${q.email_group}</td>
    <td >
    <a class="btn-floating btn-small waves-effect waves-light green btn modal-trigger users-btn" href="#users${q.id}" >
    <i class="material-icons" data-id="${q.id}">account_circle</i>
    </a></td>
`;

    case 'qhawax_installation_list': return `
   
    <td ><img src="${qhawaxLeaf(q.main_inca)}" alt="INCA: ${q.main_inca}" width="30" height="30"></td> 
    <td >${q.comercial_name}</td> 
    <td >${q.name}</td> 
    <td >${q.qhawax_id}</td> 
    <td >${q.qhawax_name}</td> 
    <td >${dateProcess(q.installation_date_zone)}</td> 
    <td >${dateProcess(q.last_cleaning_equipment_date)}</td> 
    <td >${dateProcess(q.last_maintenance_date)}</td> 
    <td >${q.is_public}</td> 
    <td >${q.district}</td>
    <td >
    <a class="btn-floating btn-small waves-effect waves-light red btn modal-trigger" href="#uninstall${q.qhawax_id}" >
    <i class="material-icons" data-id="${q.qhawax_id}">stop</i>
    </a></td>

`;
    case 'qhawax_firmware_list': return `
    <td >${q.qhawax_name}</td> 
    <td >${q.mode}</td> 
    <td style="color:${q.mode==='Firmware Update'?'red':'black'}" id="${q.qhawax_name}">${q.mode==='Firmware Update'?'En Progreso':'Estable'}</td> 
    <td >${dateProcess(q.last_firmware_update)}</td> 
    <td >${q.qhawax_type}</td> 
    <td >${q.firmware_version}</td> 
    <td >${isUrlLink(q.description)}</td> 
    `;

        
    default:
        break;
}}

const sortTable = (element,n,e) => {  
    const table =element.querySelector('tbody');
    let i;
    let switchcount = 0;
    let shouldSwitch =false;
    let switching = true;
    let dir = "asc";
    while (switching) {
        switching = false;
        const rows = table.rows;
        for (i=1; i < (rows.length); i++) {     
            const x = rows[i-1].getElementsByTagName('td')[n];
            const y = rows[i].getElementsByTagName('td')[n];
            if (dir==='asc') {
                e.target.firstChild.innerText = 'arrow_drop_down';                
                if (x.innerHTML.toLowerCase().localeCompare(y.innerHTML.toLowerCase())===1) {
                    shouldSwitch= true;
                    break;
                  }
            } else if (dir == "desc") {
                e.target.firstChild.innerText = 'arrow_drop_up';
                if (x.innerHTML.toLowerCase().localeCompare(y.innerHTML.toLowerCase())===-1) {
                    shouldSwitch = true;
                    break;
                  }
            }
        }
        if (shouldSwitch && rows[i]!==undefined) {
            rows[i].parentNode.insertBefore(rows[i], rows[i-1]);
            switching = true;
            switchcount ++;           
        } else {
            if (switchcount === 0 && dir === "asc") {                
                dir = "desc";
                switching = true;
              }
        }
    }
};
const paginationBtn = (element,page, items,location) => {
    const button = document.createElement('button');
    button.innerText = page;
    
    if(current_page=== page) {button.classList.add('active')};
    button.addEventListener('click',()=>{
       
        current_page = page;
         displayList(element, items,page, location);
    })
    return button;
};

const paginationSetup = (element, items, rows_per_page,location) => {
    
    const wrapper = element.querySelector('#wrapper-pagination');
    wrapper.querySelectorAll('button').forEach(n => n.remove());
    const page_counter = Math.ceil(items.length /rows_per_page);
    
    for (let i = 1; i < page_counter+1; i++) {
        const btn = paginationBtn(element,i,items,location);
        wrapper.appendChild(btn)
    }
};

const displayList = (element, qhawax_list,page,location) =>{
    if (element.querySelector('#submit-btn-create-co')) {
        let name='';
        let ruc='';
        let contact='';
        let phone='';
        let domain='';
        let address='';
    
        const submitBtn = element.querySelector('#submit-btn-create-co');
        const requiredFields = element.querySelectorAll('.required-field')

        Array.from(requiredFields).forEach((v,i)=>{
            v.addEventListener('input', e =>{
                e.preventDefault()
                name = requiredFields[0].value;
                ruc = requiredFields[1].value;
                contact = requiredFields[2].value;
                phone = requiredFields[3].value;
                domain = requiredFields[4].value;
                address = requiredFields[5].value;
    
                if (name!== '' && ruc!== '' && contact!== '' && phone!== '' && domain!== '' && address!== '') {
                    submitBtn.classList.remove('disabled');  
                } 
            })
        })
    
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            createCompany(name, ruc, contact, phone, domain, address);
            window.location.assign(window.location.origin +'/#/company_list'); 
        })
    }
    const table =element.querySelector('tbody');
    const items = Array.prototype.slice.call(qhawax_list);

    page--;

    let start = rows_per_page * page;
    let end = start+rows_per_page;
    let paginatedItems = items.slice(start,end)
    for (let i = 0; i < paginatedItems.length; i++) {   
        table.querySelectorAll('tr').forEach(n => n.remove());
        paginatedItems.forEach(q =>{   
            const row_table = document.createElement('tr');
            table.appendChild(row_table);
            row_table.innerHTML = row_data(q,location);  
        });   
    }
    paginationSetup(element, qhawax_list,rows_per_page,location )
};

const toAddOptions = (element, selector, list)=>{
    const addOptions = element.querySelector(`#${selector}`);
    list.forEach(item=>{
        const option = document.createElement('option');
            option.setAttribute('value', item.id);
            option.innerText = item.name;
			addOptions.appendChild(option);
    })
};



 export { sortTable, 
    paginationSetup,
    displayList, 
    toAddOptions, 
    options
}
