import {navbar, logout, returnArrow, returnArrowMob, forgotPass} from '../lib/navMenus.js';
import {goToLogout} from '../lib/directioning.js';
import {viewLogin} from '../lib/HtmlComponents.js';
import {login} from '../requests/post.js';
import {validateEmail, validatePass} from '../lib/validation.js'
import { sourceAPI } from '../index.js';

let mail;
let pass;
let setHide= 0;
const viewTheLogin = () => {
	const menuNavBar = document.querySelector('header');
	menuNavBar.innerHTML = navbar('');
	const menulist = document.querySelector('#menu-list-bar');
	menulist.innerHTML = logout;
	const menuleft = document.querySelector('#menu-left-bar');
	menuleft.innerHTML = returnArrow;
	const menuNavMobile= document.querySelector('#mobile-nav');
	menuNavMobile.innerHTML = returnArrowMob;


	const loginElem = document.createElement('div');
	loginElem.innerHTML = viewLogin + forgotPass;
	const logoutBtn = document.querySelector('#logout-menu');
	const returnBtn = document.querySelector('#return-menu');
	const returnMenuMobBtn = document.querySelector('#return-menu-mobile');

	const mobileMenu = document.getElementById('mobile-nav');
	M.Sidenav.init(mobileMenu);
	const modals = loginElem.querySelectorAll('.modal');
	M.Modal.init(modals);

	const changePassBtn = loginElem.querySelector('#submit-btn-pass');
	const loginBtn = loginElem.querySelector('#submit-btn');
	const loginform = loginElem.querySelector('.login-form');
	returnBtn.addEventListener('click', () =>goToLogout());
	logoutBtn.addEventListener('click', () =>goToLogout());
	returnMenuMobBtn.addEventListener('click', () =>goToLogout());
	window.innerWidth < 600 ? loginform.classList.remove('container'):loginform.classList.add('container');
	changePassBtn.addEventListener('click', e => {
		e.preventDefault();
		const emailpass = window.btoa(
			loginElem.querySelector('#emailpass').value
		);
		const url =`${sourceAPI}userForgotPassword/`;
		const data = { email: `${emailpass}` };
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(res => {
				if (res.OK === 'Email have been sent to the user') {
					M.toast({
						html:
							'Verifique su email, le hemos enviado su nueva contraseña.',
						displayLength: 6000,
					});
				} else if (res.error === 'You have entered an invalid email') {
					M.toast({
						html: 'Éste usuario no se encuentra registrado.',
						displayLength: 6000,
					});
				}
			});
	});

	const validations = loginElem.querySelectorAll('.login-check');
	const btnKeyIcon = loginElem.querySelector('.icon-key');

	btnKeyIcon.addEventListener('click', e=>{

		if (setHide===0) {
			validations[1].setAttribute('type','text');
			btnKeyIcon.classList.add('show');
			setHide=1;
		} else {
			validations[1].setAttribute('type','password');
			btnKeyIcon.classList.remove('show');
			setHide=0;
		}
	})

	Array.from(validations).forEach(i=>{
		i.addEventListener('input',e=>{
				if (validatePass(validations[1].value) && 
				validateEmail(validations[0].value)) {
					loginBtn.classList.remove('disabled');
					mail=window.btoa(validations[0].value);
					pass=window.btoa(validations[1].value)
				}else{
					loginBtn.classList.add('disabled');
				}
		})
	})
	loginBtn.addEventListener('click', e => {
		e.preventDefault();

		login(mail, pass, loginElem)
	});
	return loginElem;
};

export { viewTheLogin };
