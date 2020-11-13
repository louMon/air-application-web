import { changeView } from './lib/viewController.js';

const sourceAPI = 'https://qairamapnapi.qairadrones.com/api/';
const sourceSocket = 'https://qairamapnapi.qairadrones.com/';

	window.onload = () => {

		document.getElementById('loader').classList.add('hide');
		
		const chipAlert = document.querySelectorAll('.chip');
		M.Chips.getInstance(chipAlert);
		window.onhashchange = changeView(window.location.hash);
		

			 let oldHash = window.location.hash;
			setInterval(function() {
				let newHash = window.location.hash;
			  if (newHash !== oldHash ) {
				 window.location.reload();
				oldHash = newHash;
			  }
			}, 100);
		  
	
		
	};
	


export {sourceAPI, sourceSocket}
