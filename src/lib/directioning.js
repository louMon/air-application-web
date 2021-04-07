
const goToLogin = () => {
	window.location.assign('..#/login');
	window.location.reload();
};

const goToConfig = () => {
	window.location.assign('..#/configuration');
	window.location.reload();
};

const goInit = (company) => {
	switch (company) {
		case 1:
			{
				window.location.replace('#/qairamap');
				window.location.reload();
			}
			break;
		case 3:
			{
				window.location.replace('#/mml');
				window.location.reload();
			}
			break;
		case 4:
			{
				window.location.replace('#/msb');
				window.location.reload();
			}
			break;
		case 8:
			{
				window.location.replace('#/mmi');
				window.location.reload();
			}
			break;
		case 9:
			{
				window.location.replace('#/mgp');
				window.location.reload();
			}
			break;
		default:
			{
				window.location.replace('#/');
				window.location.reload();
			}
			break;
	}
}

const goInitLog = company =>{
	window.location.assign('..#/clientmap');
    window.location.reload(); 
};

const goToLogout = company => {
	switch (company) {
		case 1:
			{
				window.location.replace('#/');
				window.location.reload();
			}
			break;
		case 3:
			{
				window.location.replace('#/mml');
				window.location.reload();
			}
			break;
		case 4:
			{
				window.location.replace('#/msb');
				window.location.reload();
			}
			break;
		case 8:
			{
				window.location.replace('#/mmi');
				window.location.reload();
			}
			break;
		case 9:
			{
				window.location.replace('#/mgp');
				window.location.reload();
			}
			break;
		default:
			{
				window.location.replace('#/');
				window.location.reload();
			}
			break;
	}
	sessionStorage.clear();
};

const goToDownload = () => {
    window.location.assign('..#/download');
    window.location.reload();
};


const goToDashboard = () => {
    window.location.assign('..#/dashboard');
    window.location.reload();
};

const goToDwnGraph = () => {
    window.location.assign('..#/graphicsDownload');
    window.location.reload(); 
};

const goToBinnacle = () => {
    window.location.assign('..#/binnacle');
    window.location.reload(); 
};

const goToGraphics = () => {
    window.location.assign('..#/graphics');
    window.location.reload(); 
};

const goBack =() => {
    // window.history.back();
    window.history.go(-1);  

};

const goToListQhawax = ()=>{
    window.location.assign('..#/qhawax_list');
    window.location.reload();  
};

const goToListCompany  = ()=>{
    window.location.assign('..#/company_list');
    window.location.reload();  
};

const goToQhawaxInstallationList  = ()=>{
    window.location.assign('..#/qhawax_installation_list');
    window.location.reload();  
};

const goToQhawaxInstallation  = ()=>{
    window.location.assign('..#/qhawax_installation');
    window.location.reload();  
};

const goToQhawaxInstallationEdit  = ()=>{
    window.location.assign('..#/qhawax_installation_edit');
    window.location.reload();  
};

const goToRegisterBinnacle  = ()=>{
    window.location.assign('..#/register_binnacle');
    window.location.reload();  
};


const goToFirmware = ()=>{
    window.location.assign('..#/firmware');
    window.location.reload();  
};

const goToForecasting = () => {
	window.location.assign('..#/forecasting');
	window.location.reload();
};

const goToSpatialRealTime = () => {
	window.location.assign('..#/future_interpolation');
	window.location.reload();
};

const goToSpatialHistorical = () => {
	window.location.assign('..#/spatial_historical');
	window.location.reload();
};

const goToPositionsMaintain = () => {
	window.location.assign('..#/positions');
	window.location.reload();
};

const goToCalibration  = ()=>{
    window.location.assign('..#/calibration');
    window.location.reload();  
};

export { goToLogin,
	 goToLogout,
     goToDownload,
     goToDashboard,
     goToDwnGraph,
     goToBinnacle,
     goToGraphics,
     goBack,
	 goToListQhawax,
	 goToListCompany,
	 goToQhawaxInstallation,
	 goToQhawaxInstallationList,
	 goToQhawaxInstallationEdit,
	 goToRegisterBinnacle,
	 goToCalibration,
	 goToFirmware,
	 goInit,
	 goInitLog,
	 goToConfig,
	 goToForecasting,
	 goToSpatialRealTime,
	 goToSpatialHistorical,
	 goToPositionsMaintain
		}
		