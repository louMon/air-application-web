import { navbarAdmin } from '../lib/navBarAdmin.js';
import { viewqhawaxList } from '../lib/HtmlComponents.js';
import {sortTable, displayList} from '../lib/displayAssets.js';
import { 
    turnQhawaxOn, 
    turnQhawaxOff, 
    changeModeToCalibration, 
    createQhawax
}from '../requests/post.js';
import { requestAllQhawax} from '../requests/get.js';

let page= 1;
const location = 'qhawax_list';

const qhawaxSwitchStatus=(element)=>{
    const allSwitchs = Array.from(element.querySelectorAll('.checkbox_on_off'));
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
        const selectionMode = element.querySelector(`[data-qhawax=${btn.name}]`);
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



const toNumber = (num) => {
    if(num<10){
        return '00';
    } else if (num>=10 || num <=99){
        return '0';
    }else{
        return '';
    }
}

const viewQhawaxList = (company) =>{
    const listElem = document.createElement('div');
    listElem.classList.add('container')
    navbarAdmin(listElem, viewqhawaxList, company);
    request(listElem)
    let type = '';
    let version='';

    //nameQhawaxRequest(listElem)

    const selection =listElem.querySelector('select');
    const versionSelect = listElem.querySelector('#version');
    
    const submitBtn =listElem.querySelector('#submit-btn-create');
    const sortInca = listElem.querySelector('#sort-inca')
    const qhawaxSort= listElem.querySelector('#sort-qhawax');
    const openSort= listElem.querySelector('#sort-open');
    const qhawaxType= listElem.querySelector('#sort-type');
    const qhawaxMode= listElem.querySelector('#sort-mode');
    const qhawaxConnection= listElem.querySelector('#sort-connection');

    
    
    selection.addEventListener('change', () =>{
        type=selection.value;
        //requestVersions(type)
    });

    versionSelect.addEventListener('change', ()=>{
        version=versionSelect.value;
        version!=''?true:false;
        version==='' ? submitBtn:submitBtn.classList.remove('disabled');
    })
    
    submitBtn.addEventListener('click',(e)=>{
       
        e.preventDefault();
        const qname = listElem.querySelector('#qhawax_name_label').dataset.name;
        const is_open = listElem.querySelector('#qhawax_type').checked;
            createQhawax(qname,type,version,is_open)
 
        window.location.assign(window.location.origin +'/#/qhawax_list');  
    });

    sortInca.addEventListener('click', (e)=>sortTable(listElem,0,e));
    qhawaxSort.addEventListener('click', (e)=>sortTable(listElem,1,e));
    openSort.addEventListener('click', (e)=>sortTable(listElem,2,e));
    qhawaxType.addEventListener('click', (e)=>sortTable(listElem,3,e));
    qhawaxMode.addEventListener('click', (e)=>sortTable(listElem,4,e));
    qhawaxConnection.addEventListener('click', (e)=>sortTable(listElem,5,e));
    
    return listElem;
};


export {viewQhawaxList, qhawaxSwitchStatus, qhawaxChangeMode}