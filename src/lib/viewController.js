import { generatePositions } from '../views/generatePositions.js';
import { viewForecasting} from '../views/forecastingView.js';
import { viewFutureInterpolation} from '../views/spatialFutureView.js';
import { viewSpatialHistorical} from '../views/spatialHistoricalView.js';
import { landPage } from '../views/landPage.js';

const changeView = router => {
	const container = document.getElementById('content-page');
  	container.innerHTML = '';
	switch (router) {
		case '':
			return container.appendChild(landPage());
		case '#/forecasting':
			return container.appendChild(viewForecasting());
		case '#/future_interpolation':
			return container.appendChild(viewFutureInterpolation());
		case '#/historical_interpolation':
			return container.appendChild(viewSpatialHistorical());
		case '#/positions':
			return container.appendChild(generatePositions());
	}
	
};

const goTo = (location) => {
  window.location.assign(`..#/${location}`);
  window.location.reload();
};

export { changeView, goTo };
