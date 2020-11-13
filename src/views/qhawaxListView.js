import { navbarAdmin } from '../lib/navBarAdmin.js';
import { viewqhawaxList } from '../lib/HtmlComponents.js';
import {sortTable, displayList} from '../lib/displayAssets.js';
import { turnQhawaxOn, turnQhawaxOff, changeModeToCalibration, createQhawax}from '../requests/post.js';
import { requestAllQhawax, requestLastQhawax, requestFirmwareVersions} from '../requests/get.js';

let page= 1;
const location = 'qhawax_list';

const qhawaxSwitchStatus=(element)=>{
    const allSwitchs = Array.from(element.querySelectorAll('[type="checkbox"]'));
    allSwitchs.forEach(s=>{
        s.addEventListener('change',(e)=>{
            s.checked ? turnQhawaxOn(e.target.id):turnQhawaxOff(e.target.id);
            const status = s.checked ? 'ENCENDIDO' : 'APAGADO';
            
            request(element).then(res =>{ 
                M.toast({
                    html: `El qHAWAX ${e.target.id} ha sido ${status}.`,
                    displayLength: 2000,
                });
                setTimeout(()=>window.location.reload(), 2000)
             }) 
        })
    })
}  

const qhawaxChangeMode = (element)=>{
    const editModeBtnCollection = element.getElementsByClassName('edit-mode-list');
    Array.from(editModeBtnCollection).forEach(btn =>{
        btn.addEventListener('click', e=>{
            e.preventDefault()
        const selectionMode = element.querySelector(`#${btn.name}`);
        selectionMode.classList.remove('none')
         selectionMode.addEventListener('change', e =>{
             e.preventDefault()
             changeModeToCalibration(selectionMode.value)
                selectionMode.classList.add('none')
                M.toast({
                    html: `El qHAWAX ${selectionMode.value} ha pasado a Calibración.`,
                    displayLength: 2000,
                });
                setTimeout(()=>window.location.reload(), 2000)
             
         })   

       
        })
        
    })

}



const request = async (element) => {    
    const qhawax_list = await requestAllQhawax();
    displayList(element, qhawax_list,page,location);
};

const requestVersions = async (type) => {    
    const versions_list = await requestFirmwareVersions(type);
    const select = document.getElementById('version');
    select.innerHTML='<option value="" disabled selected>Selecciona la versión</option>';
    versions_list.forEach(v=>{
        const option = document.createElement('option');
        option.innerText=v.name;
        option.value=v.id;
        select.appendChild(option);
    })
};


const nameQhawaxRequest = async(element)=>{
    const initName = await requestLastQhawax()
    const qnameLabel = element.querySelector('#qhawax_name_label');
    qnameLabel.innerText = `qH0${initName.id+1}`
    qnameLabel.setAttribute('data-name',`qH0${initName.id+1}` )
};

const viewQhawaxList = (company) =>{
    const listElem = document.createElement('div');
    listElem.classList.add('container')
    navbarAdmin(listElem, viewqhawaxList, company);
    request(listElem)
    let type = '';
    let version='';

    nameQhawaxRequest(listElem)

    const selection =listElem.querySelector('select');
    const versionSelect = listElem.querySelector('#version');
    
    const submitBtn =listElem.querySelector('#submit-btn-create');
    const sortInca = listElem.querySelector('#sort-inca')
    const qhawaxSort= listElem.querySelector('#sort-qhawax');
    const qhawaxType= listElem.querySelector('#sort-type');
    const qhawaxMode= listElem.querySelector('#sort-mode');
    const qhawaxConnection= listElem.querySelector('#sort-connection');

    
    
    selection.addEventListener('change', () =>{
        type=selection.value;
        requestVersions(type)
    });

    versionSelect.addEventListener('change', ()=>{
        version=versionSelect.value;
        version!=''?true:false;
        version==='' ? submitBtn:submitBtn.classList.remove('disabled');
    })
    
    submitBtn.addEventListener('click',(e)=>{
       
        e.preventDefault();
        const qname = listElem.querySelector('#qhawax_name_label').dataset.name;
        createQhawax(qname,type,version);  
        window.location.assign(window.location.origin +'/#/qhawax_list');  
    });

    sortInca.addEventListener('click', (e)=>sortTable(listElem,0,e));
    qhawaxSort.addEventListener('click', (e)=>sortTable(listElem,1,e));
    qhawaxType.addEventListener('click', (e)=>sortTable(listElem,2,e));
    qhawaxMode.addEventListener('click', (e)=>sortTable(listElem,3,e));
    qhawaxConnection.addEventListener('click', (e)=>sortTable(listElem,4,e));
    
    return listElem;
};


export {viewQhawaxList, qhawaxSwitchStatus, qhawaxChangeMode}