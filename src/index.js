import { changeView } from './lib/viewController.js';

const sourceAPI = 'http://pucp-calidad-aire-api.qairadrones.com/api/';
const sourceSocket = 'http://pucp-calidad-aire-api.qairadrones.com/';
const qairamapAPI = 'https://qairamapnapi.qairadrones.com/api/';

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
	


export {sourceAPI, sourceSocket,qairamapAPI}
