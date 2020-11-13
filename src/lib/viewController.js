
import { viewTheLogin } from '../views/loginView.js';
import { viewQairaMap } from '../views/mapView.js';
import { viewFreeMap } from '../views/freeMapView.js';
import { downloadView } from '../views/downloadView.js';
import { viewDashboard } from '../views/dashboardView.js';
import { viewGraphics } from '../views/graphicsView.js';
import { viewDwnGraphs } from '../views/downloadGraphsView.js';
import { viewBinnacle } from '../views/binnacleView.js';
import { viewQhawaxList } from '../views/qhawaxListView.js';
import { viewCompanysList} from '../views/companyListView.js';
import { viewQhawaxInstallationList} from '../views/installationListView.js';
import { viewQhawaxInstallationEdit}from '../views/installationEditView.js';
import { viewQhawaxInstallation} from '../views/installationQhawaxView.js';
import { viewRegisterBinnacle} from '../views/registerBinnacleView.js';
import { viewCalibration} from '../views/calibrationView.js';
import { viewFirmware} from '../views/firmwareView.js';
import { viewClientMap}from '../views/clientMapView.js';
import { viewConfig}from '../views/configView.js'

const company_id = Number(sessionStorage.getItem('companyID'));
const user_name = sessionStorage.getItem('companyName');
const user_id = Number(sessionStorage.getItem('user_id'));
const username = sessionStorage.getItem('username');
const container = document.getElementById('content-page');

const changeView = router => {
	container.innerHTML = ``;
	switch (router) {
		case '':
			return container.appendChild(viewFreeMap(0));

		case '#/':
			return container.appendChild(viewFreeMap(0));

		case '#/login':
			return container.appendChild(viewTheLogin());

		case '#/msb':
			return container.appendChild(viewFreeMap(4));

		case '#/mmi':
			return container.appendChild(viewFreeMap(8));

		case '#/mml':
			return container.appendChild(viewFreeMap(3));

		case '#/mgp':
			return company_id === 9
				? container.appendChild(viewFreeMap(9))
				: container.appendChild(viewTheLogin());

		case '#/qairamap':
			return company_id === 1
				? container.appendChild(viewQairaMap(company_id))
				: container.appendChild(viewTheLogin());

		case '#/download':
			return company_id
				? container.appendChild(downloadView(company_id))
				: container.appendChild(viewTheLogin());

		case '#/dashboard':
			return company_id === 1
				? container.appendChild(viewDashboard(company_id))
				: container.appendChild(viewTheLogin());

		case '#/graphics':
			return company_id === 1
				? container.appendChild(viewGraphics(company_id))
				: container.appendChild(viewTheLogin());
		case '#/graphicsDownload':
			return company_id === 1
				? container.appendChild(viewDwnGraphs(company_id))
				: container.appendChild(viewTheLogin());
		case '#/binnacle':
			return company_id === 1
				? container.appendChild(viewBinnacle(company_id))
				: container.appendChild(viewTheLogin());
		case '#/qhawax_list':
			return company_id === 1
				? container.appendChild(viewQhawaxList(company_id))
				: container.appendChild(viewTheLogin());
		case '#/company_list':
			return company_id === 1
				? container.appendChild(viewCompanysList(company_id))
				: container.appendChild(viewTheLogin());
		case '#/qhawax_installation_list':
			return company_id === 1
				? container.appendChild(viewQhawaxInstallationList(company_id))
				: container.appendChild(viewTheLogin());
		case '#/qhawax_installation':
			return company_id === 1
				? container.appendChild(viewQhawaxInstallation(company_id))
				: container.appendChild(viewTheLogin());
		case '#/qhawax_installation_edit':
			return company_id === 1
				? container.appendChild(viewQhawaxInstallationEdit(company_id))
				: container.appendChild(viewTheLogin());
		case '#/register_binnacle':
			return company_id === 1
				? container.appendChild(viewRegisterBinnacle(company_id))
				: container.appendChild(viewTheLogin());
		case '#/calibration':
			return company_id === 1
				? container.appendChild(viewCalibration(company_id))
				: container.appendChild(viewTheLogin());
		case '#/firmware':
			return company_id === 1
				? container.appendChild(viewFirmware(company_id))
				: container.appendChild(viewTheLogin());
		case '#/clientmap':
			return company_id
				? container.appendChild(viewClientMap(company_id))
				: container.appendChild(viewTheLogin());
		case '#/configuration':
			return company_id === 1
				? container.appendChild(viewConfig(company_id))
				: container.appendChild(viewTheLogin());
	}
	
};

export { changeView };
