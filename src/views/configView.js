
import { configuration } from '../lib/HtmlComponents.js';
import {navbarAdmin } from '../lib/navBarAdmin.js';
import {requestAllCompanys} from '../requests/get.js'
import { toAddOptions} from '../lib/displayAssets.js';
import { validatePass, validateEmail} from '../lib/validation.js';
import { changePassword, createUser} from '../requests/post.js';

let email;
let old_pass;
let new_pass;
let email_group;
let new_user;
let new_user_pass;
let new_user_pass_bis;
let company_id;
let setHide = [0,0,0,0];
const requestCompanys = async (element) =>{
    const company_list = await requestAllCompanys();
    toAddOptions(element, 'company_id_user', company_list);
    company_list.forEach(c => {
        if (c.id===Number(sessionStorage.getItem('companyID'))) {
            element.querySelector('#user-disabled').value=`${sessionStorage.getItem('username')}@${c.email_group}`;
            email = window.btoa(element.querySelector('#user-disabled').value);  
        }
        element.querySelector('#company_id_user').addEventListener('change', e=>{
            if (c.id===Number(e.target.value)) {
                company_id=Number(e.target.value);
                email_group = c.email_group;
                element.querySelector('#label-domain-user').innerText=`Ejemplo: ${sessionStorage.getItem('username')}@${c.email_group}`;
            }
        })
    });
};


const viewConfig = (company) => {
    const configElem = document.createElement('div');
    navbarAdmin(configElem, configuration, company);
    configElem.querySelector('.newpass').addEventListener('click',e=>{
        window.location.href = "#change-password";
        window.location='#/configuration'
    });
    configElem.querySelector('.newuser').addEventListener('click',e=>{
        window.location.href = "#create-new-user";
        window.location='#/configuration'
    });
    M.updateTextFields();
    const textNeedCount = configElem.querySelectorAll('.counter');
    const createInputs = configElem.querySelectorAll('.create');
    const withHideInputs = configElem.querySelectorAll('.hideop');
    const changeBtn = configElem.querySelector('#submit-btn-change');
    const createBtn = configElem.querySelector('#submit-btn-new-user');
    const inputEmail = configElem.querySelector('#email_new');
    const btnKeyIcon = configElem.querySelectorAll('.icon-key');
    
    Array.from(textNeedCount).forEach(p=> {
        p.addEventListener('input',e=>{
            old_pass = window.btoa(textNeedCount[0].value);
            new_pass = window.btoa(textNeedCount[1].value);
            validatePass(textNeedCount[0].value) && validatePass(textNeedCount[1].value)
            ?changeBtn.classList.remove('disabled'):changeBtn.classList.add('disabled');
        })
    });

    Array.from(createInputs).forEach(p=> {
        p.addEventListener('input',e=>{

            new_user=createInputs[0].value;
            new_user_pass=window.btoa(createInputs[1].value);
            new_user_pass_bis=window.btoa(createInputs[2].value);
           
            validateEmail(createInputs[0].value) && validatePass(createInputs[1].value) && (createInputs[1].value===createInputs[2].value)
            ?createBtn.classList.remove('disabled'):createBtn.classList.add('disabled');
        })
    });

    changeBtn.addEventListener('click',e=>{
        e.preventDefault();
       changePassword(email, old_pass, new_pass)
    });

    createBtn.addEventListener('click',e=>{
        e.preventDefault();
        const data = {email:new_user, company_id, encripted_pasword:new_user_pass};
        createUser(data);
    })

    inputEmail.addEventListener('click', e=>{
        e.target.value=`@${email_group}`;
    })

    Array.from(btnKeyIcon).forEach((btn,i)=>{
        btn.addEventListener('click',e=>{

            if (setHide[i]===0) {
                withHideInputs[i].setAttribute('type','text');
                btnKeyIcon[i].classList.add('show');
                setHide[i]=1;
            } else {
                withHideInputs[i].setAttribute('type','password');
                btnKeyIcon[i].classList.remove('show');
                setHide[i]=0;
            }
        })
    })


    M.CharacterCounter.init(textNeedCount);
    requestCompanys(configElem)
    return configElem;
};

export {viewConfig};