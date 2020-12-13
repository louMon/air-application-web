import { sourceAPI } from "..";
import { goToLogin } from "./directioning";

const dropdownLegend = `

<!-- Dropdown Structure 1-->
<ul id="dropdown1" class="dropdown-content">
    <li>
        <a class="modal-trigger" href="#modalAirInca">
            Leyenda gases (INCA)
        </a>
    </li>
    <li class="divider" tabindex="-1"></li>
    <li>
        <a class="modal-trigger" href="#modalRuidoEca">
            Leyenda ruido (ECA)
        </a>
    </li>
    <li class="divider" tabindex="-1"></li>
    <li>
        <a class="modal-trigger" href="#modalUVEca">
            Leyenda índice UV (ECA)
        </a>
    </li>
    <li class="divider" tabindex="-1"></li>
    <li>
        <a class="modal-trigger" href="#modalAireEca">
            Leyenda Aire (ECA)
        </a>
    </li>
</ul>

<!-- Dropdown Structure 2-->
        <ul id="dropdown2" class="dropdown-content">
            <li>
                <a class="modal-trigger" href="#modalAirInca">
                    Leyenda gases (INCA)
                </a>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
                <a class="modal-trigger" href="#modalRuidoEca">
                    Leyenda ruido (ECA)
                </a>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
                <a class="modal-trigger" href="#modalUVEca">
                    Leyenda índice UV (ECA)
                </a>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
                <a class="modal-trigger" href="#modalAireEca">
                    Leyenda Aire (ECA)
                </a>
            </li>
        </ul>

<!-- Modal Air INCA Structure -->
        <div id="modalAirInca" class="modal">
            <span class="modal-close right">X</span>
            <div class="modal-content center">
                <p>
                    <a
                        href="http://www.minam.gob.pe/wp-content/uploads/2016/07/RM-N%C2%B0-181-2016-MINAM.pdf"
                    >
                        Fuente: Resolución Ministerial N°-181-2016-MINAM.
                    </a>
                </p>
                <img
                    class="responsive-img"
                    src="/img/INCA - Calidad del Aire.png"
                    alt="Tabla colores INCA"
                />
            </div>
            <div class="modal-footer"></div>
        </div>

        <!-- Modal Ruido ECA Structure -->
        <div id="modalRuidoEca" class="modal">
            <span class="modal-close right">X</span>
            <div class="modal-content center">
                <p>
                    <a href="https://www.oefa.gob.pe/?wpfb_dl=19087">
                        Fuente: Contaminación Sonora OEFA
                    </a>
                </p>
                <img
                    class="responsive-img"
                    src="/img/ECA-Ruido.png"
                    alt="Tabla colores ECA-Ruido"
                />
            </div>
            <div class="modal-footer"></div>
        </div>

        <!-- Modal UV ECA Structure -->
        <div id="modalUVEca" class="modal">
            <span class="modal-close right">X</span>
            <div class="modal-content center">
                <p>
                    <a
                        href="https://apps.who.int/iris/bitstream/handle/10665/42633/9243590073.pdf;jsessionid=A51BDAB9660F30189903E31DAAF806ED?sequence=1		"
                    >
                        Fuente: OMS-Radiación Ultravioleta-2003
                    </a>
                </p>
                <img
                    class="responsive-img"
                    src="/img/Indice-UV.png"
                    alt="Tabla colores UV"
                />
            </div>
            <div class="modal-footer"></div>
        </div>

        <!-- Modal Aire ECA Structure -->
        <div id="modalAireEca" class="modal">
            <span class="modal-close right">X</span>
            <div class="modal-content center">
                <p>
                    <a
                        href="http://www.minam.gob.pe/wp-content/uploads/2017/06/DS-003-2017-MINAM.pdf"
                    >
                        Fuente: DS Nº 003-2017-MINAM
                    </a>
                </p>
                <img
                    class="responsive-img"
                    src="/img/ECA-aire.png"
                    alt="Tabla ECA Aire"
                />
            </div>
            <div class="modal-footer"></div>
        </div>
`;

const navbar = (structure) =>`
<div class="navbar-fixed sticky">
<nav id="nav-menu-bar" class="transparent" style="padding: 0px 10px;">
<div id="nav-wrapper-menu-bar" class="nav-wrapper">
    <ul id="menu-left-bar" class="left hide-on-med-and-down">
        <li class="client-spin" id="spinNav"></li>
    </ul>
    <a href="https://www.qairadrones.com" class="brand-logo center"id="brand-logo-menu-bar">
    <img src="/img/logo-white.png" alt="logo qAIRa" id="logo-menu-qAIRa" style="max-width: 4.5em; max-height: 2em" />
    </a>

    <a class="brand-logo right" id="brand-logo-menu-bar-client"  ></a>
  
    <ul id="menu-list-bar" class="right hide-on-med-and-down">
    </ul>
    <a href="#" id="menu-trigger" class="sidenav-trigger" data-target="mobile-nav" ><i class="material-icons">menu</i></a>
</div>
</nav>
</div>

<!-- Mobile menu -->
<ul id="mobile-nav" class="sidenav">

</ul>
${structure}
`;

const modalChangePass = `
<!-- Modal Change Password Structure -->
<div id="modalChangePassword" class="modal">
    <div class="modal-content center">
    <h5>Cambio de contraseña</h5>
    <div class="row">
      <form class="col s8 offset-s2  login">
        <div class="row">
          <div class="input-field col s10 offset-s1">
            <input id="new_email" type="email" class="validate">
            <label for="new_email" data-error="wrong" data-success="right">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s10 offset-s1">
            <input id="old-password" type="password" class="validate">
            <label for="old-password">Antiguo Password</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s10 offset-s1">
            <input id="new-password" type="password" class="validate">
            <label for="new-password">Nuevo Password</label>
          </div>
        </div>
        <div class="row">
          <div class="center-align">
          <button id="submit-btn-change" class="btn waves-effect waves-light" >Submit
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
        </div>
      </form>
    </div>
    </div>
    <div class="modal-footer"></div>
</div>
`;

const modalNewUser = `
<!-- Modal New User Structure -->
<div id="modalNewUser" class="modal">
    <div class="modal-content center">
    <h5>Crear Nuevo Usuario</h5>
    <div class="row">
      <form class="col s8 offset-s2  login">
      <div class="row">
      <div class="col s6 offset-s3">
            <select class="browser-default" name="" id="company_id_user">
            <option value="" disabled selected> Selecciona una Compañia</option>
            </select>
            </div></div>
        <div class="row">
          <div class="input-field col s10 offset-s1">
            <input id="email_new" type="email" class="validate">
            <label for="email_new" data-error="wrong" data-success="right" id="label-domain-user"></label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s10 offset-s1">
            <input id="new_pass_user" type="password" class="validate">
            <label for="new_pass_user">Nueva Contraseña</label>
          </div>
        </div>
        <div class="row">
          <div class="center-align">
          <button id="submit-btn-new-user" class="btn waves-effect waves-light" >Submit
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
        </div>
      </form>
    </div>
    </div>
    <div class="modal-footer"></div>
</div>
`;

const dropdownConfigADM = `
<!-- Dropdown Structure 3-->
<ul id="dropdown3" class="dropdown-content">
    <li><a class="modal-trigger" href="#modalChangePassword">Cambio de Contraseña</a></li>
    <li><a class="modal-trigger" href="#modalNewUser">Nuevo usuario</a></li>
</ul>
    <!-- Dropdown Structure 4-->
<ul id="dropdown4" class="dropdown-content">
    <li><a class="modal-trigger" href="#modalChangePassword">Cambio de Contraseña</a></li>
    <li><a class="modal-trigger" href="#modalNewUser">Nuevo usuario</a></li>
</ul>
`;

const dropdownConfig = `
<!-- Dropdown Structure 3-->
<ul id="dropdown3" class="dropdown-content">
    <li><a class="modal-trigger" href="#modalChangePassword">Cambio de Contraseña</a></li>
</ul>
    <!-- Dropdown Structure 4-->
<ul id="dropdown4" class="dropdown-content">
    <li><a class="modal-trigger" href="#modalChangePassword">Cambio de Contraseña</a></li>
</ul>
`;

const dropdownReports = `
<!-- Dropdown Structure 5-->
<ul id="dropdown5" class="dropdown-content">
    <li id="data-dwn"><a> Descarga Data</a></li>
    <li class="divider" tabindex="-1"></li>
    <li id="graph-dwn"><a>Gráficas Semanales</a></li>
    <li class="divider" tabindex="-1"></li>
    <li id="binnacle"><a> Bitácora</a></li>  
</ul>
<!-- Dropdown Structure 6-->
<ul id="dropdown6" class="dropdown-content">
    <li id="data-dwn-mob"><a> Descarga Data</a></li>
    <li class="divider" tabindex="-1"></li>
    <li id="graph-dwn-mob"><a> Gráficas Semanales</a></li>
    <li class="divider" tabindex="-1"></li>
    <li id="binnacle-mob"><a> Bitácora</a></li>        
</ul>
`;

const dropdownMonitor = `
<!-- Dropdown Structure 7-->
<ul id="dropdown7" class="dropdown-content">
    <li id="dashboard"><a>Dashboard</a></li>
    <li class="divider" tabindex="-1"></li>
    <li id="graphics"><a>Gráficos</a></li>
    <li class="divider" tabindex="-1"></li>
    <li id="qhawax-list"><a>Listado qHAWAX</a></li>  
    <li class="divider" tabindex="-1"></li>
    <li id="company-list"><a>Listado Compañías</a></li>
</ul>
<!-- Dropdown Structure 8-->
<ul id="dropdown8" class="dropdown-content">
    <li id="dashboard-mob"><a>Dashboard</a></li>
    <li class="divider" tabindex="-1"></li>
    <li id="graphics-mob"><a>Gráficos</a></li>
    <li class="divider" tabindex="-1"></li>
    <li id="qhawax-list-mob"><a>Listado qHAWAX</a></li>  
    <li class="divider" tabindex="-1"></li>
    <li id="company-list-mob"><a>Listado Compañías</a></li>       
</ul>
`;

const dropdownMaintenance = `
<!-- Dropdown Structure 9-->
<ul id="dropdown9" class="dropdown-content">
    <li id="qhawax-installed"><a>qHAWAX Instalados</a></li>  
    <li class="divider" tabindex="-1"></li>
    <li id="qhawax-installation"><a>Instalación qHAWAX</a></li>  
    <li class="divider" tabindex="-1"></li>
    <li id="qhawax-installation-edit"><a>Editar Instalación</a></li>  
    <li class="divider" tabindex="-1"></li>
    <li id="binnacle-reg"><a>Registro Bitácora</a></li>
    <li class="divider" tabindex="-1"></li>
    <li id="calibration"><a>Calibración</a></li>
    <li class="divider" tabindex="-1"></li>
    <li id="firmware-actual"><a>Actualización Firmware</a></li>
</ul>
<!-- Dropdown Structure 10-->
<ul id="dropdown10" class="dropdown-content">
    <li id="qhawax-installed-mob"><a>qHAWAX Instalados</a></li>  
    <li class="divider" tabindex="-1"></li>
    <li id="qhawax-installation-mob"><a>Instalación qHAWAX</a></li>  
    <li class="divider" tabindex="-1"></li>
    <li id="qhawax-installation-edit-mob"><a>Editar Instalación</a></li>  
    <li class="divider" tabindex="-1"></li>
    <li id="binnacle-reg-mob"><a>Registro Bitácora</a></li>
    <li class="divider" tabindex="-1"></li>
    <li id="calibration-mob"><a>Calibración</a></li>
    <li class="divider" tabindex="-1"></li>
    <li id="firmware-actual-mob"><a>Actualización Firmware</a></li>       
</ul>
`;

const spinMob = `
<li class="client-spin mobile-menu" id="spinMobile"></li>
`;

const legend = `
<li id="legend-menu">
<a class="dropdown-trigger" href="#" data-target="dropdown1"> Leyendas </a>
</li>
`;

const legendMobile = `  
<li id="legend-menu-mobile">
<a class="dropdown-trigger" href="#" data-target="dropdown2"> Leyendas </a>
</li>
`;

const config =`
<li id="config-menu">
<a class="dropdown-trigger" href="#" data-target="dropdown3"> Configuración </a>
</li>
`;

const configMobile =`  
<li id="config-menu-mobile">
<a class="dropdown-trigger" href="#" data-target="dropdown4"> Configuración </a>
</li>
`;

const reports =`
<li id="report-menu">
<a class="dropdown-trigger" href="#" data-target="dropdown5"> Reportes </a>
</li>
`;

const reportsMobile =`  
<li id="report-menu-mobile">
<a class="dropdown-trigger" href="#" data-target="dropdown6"> Reportes </a>
</li>
`;

const monitor =`
<li id="monitor-menu">
<a class="dropdown-trigger" href="#" data-target="dropdown7"> Monitoreo </a>
</li>
`;

const monitorMobile =`  
<li id="report-menu-mobile">
<a class="dropdown-trigger" href="#" data-target="dropdown8"> Monitoreo </a>
</li>
`;

const maintenance =`
<li id="maintenace-menu">
<a class="dropdown-trigger" href="#" data-target="dropdown9"> Mantenimiento </a>
</li>
`;

const maintenanceMobile =`  
<li id="maintenance-menu-mobile">
<a class="dropdown-trigger" href="#" data-target="dropdown10"> Mantenimiento </a>
</li>
`;

const login = `
<li id="login-menu"><a>Login</a></li>
`;

const loginMobile = `
<li id="login-menu-mobile"><a>Login</a></li>
`;

const forecasting = `
<li id="forecasting-menu"><a>Forecasting</a></li>
`;

const forecastingMobile = `
<li id="forecasting-menu-mobile"><a>Forecasting</a></li>
`;

const spatialRealTime = `
<li id="spatial-real-time-menu"><a>Tiempo Real Espacial</a></li>
`;

const spatialRealTimeMobile = `
<li id="spatial-real-time-menu-mobile"><a>Tiempo Real Espacial</a></li>
`;

const spatialHistorical = `
<li id="spatial-historical-menu"><a>Histórico Espacial</a></li>
`;

const spatialHistoricalMobile = `
<li id="spatial-historical-menu-mobile"><a>Histórico Espacial</a></li>
`;

const bulletinLima=`
<a href="http://smia.munlima.gob.pe/documentos-publicacion/recientes?tipoDocumento=10&titulo=vigilancia+de+la+calidad+del+aire+en+lima+metropolitana&tipoDocumentoNorma=ALL&idTematica=ALL&ambitoAplicacion=ALL&submit_search=true">Boletines</a>
`;
const bulletinLimaMobile=`
<li id="bulletin-menu"><a href="http://smia.munlima.gob.pe/documentos-publicacion/recientes?tipoDocumento=10&titulo=vigilancia+de+la+calidad+del+aire+en+lima+metropolitana&tipoDocumentoNorma=ALL&idTematica=ALL&ambitoAplicacion=ALL&submit_search=true">Boletines</a></li>
`;
const logout = `
<li id="logout-menu"><a>Salir</a></li>
`;

const logoutMob = `
<li id="logout-menu-mobile"><a>Salir</a></li>
`;

const returnArrow = `
<li id="return-menu"><a >Inicio</a></li>
`;

const returnArrowMob = `
<li id="return-menu-mobile"><a>Inicio</a></li>
`;

const download = `
<li id="download-menu"><a>Descarga</a></li>
`;

const downloadMob = `
<li id="download-mob-menu"><a>Descarga</a></li>
`;

const configAdm = `
<li id="config-menu-adm"><a>Configuración</a></li>
`;

const configAdmMob = `
<li id="config-menu-adm-mobile"><a>Configuración</a></li>
`;

const bulletin = `
<li id="bulletin-menu"><a href="http://smia.munlima.gob.pe/documentos-publicacion/recientes?tipoDocumento=10&titulo=vigilancia+de+la+calidad+del+aire+en+lima+metropolitana&tipoDocumentoNorma=ALL&idTematica=ALL&ambitoAplicacion=ALL&submit_search=true">Boletines</a></li>
`;

const bulletinMobile = `
<li id="bulletin-menu-mobile"><a href="http://smia.munlima.gob.pe/documentos-publicacion/recientes?tipoDocumento=10&titulo=vigilancia+de+la+calidad+del+aire+en+lima+metropolitana&tipoDocumentoNorma=ALL&idTematica=ALL&ambitoAplicacion=ALL&submit_search=true">Boletines</a></li>
`;

const chooseSpinnerMenu = company => {
	const navMenu = document.getElementById('spinNav');
	const mobMenu = document.getElementById('spinMobile');
	navMenu.classList.remove(
		'spinSanBorja',
		'spinMiraflores',
		'spinLima',
		'spinQaira',
		'spinMarina'
	);
	mobMenu.classList.remove(
		'spinSanBorjaMobile',
		'spinMirafloresMobile',
		'spinLimaMobile',
		'spinQairaMobile',
		'spinMarinaMobile'
	);
	switch (company) {
		case 4:
			{
				navMenu.classList.add('spinSanBorja');
				mobMenu.classList.add('spinSanBorjaMobile');
			}
			break;

		case 8:
			{
				navMenu.classList.add('spinMiraflores');
				mobMenu.classList.add('spinMirafloresMobile');
			}
			break;

		case 3:
			{
				navMenu.classList.add('spinLima');
				mobMenu.classList.add('spinLimaMobile');
			}
			break;
		case 1:
			{
				navMenu.classList.add('spinQaira');
				mobMenu.classList.add('spinQairaMobile');
			}
			break;
		case 0:
			{
				navMenu.classList.add('spinQaira');
				mobMenu.classList.add('spinQairaMobile');
			}
			break;
		case 9:
			{
				navMenu.classList.add('spinMarina');
				mobMenu.classList.add('spinMarinaMobile');
			}
			break;

		default:
			break;
	}
};


const styledNavBar = (company)=>{
    if (company === 3 || company === 4 || company === 8) {
        const logoMenu = document.getElementById('brand-logo-menu-bar');
        logoMenu.classList.remove('center');
        logoMenu.classList.add('right');
        logoMenu.style.width='8em';
        logoMenu.style.display='flex';
        logoMenu.style.flexDirection='row'

        const menuList = document.getElementById('menu-list-bar');
        menuList.classList.remove('right');
        menuList.classList.add('center');
        const menuNavMobile= document.querySelector('#mobile-nav');
    
        const legendMenu = document.getElementById('legend-menu');
        legendMenu.classList.add('legend-lima');

        const loginMenu = document.getElementById('login-menu');
        loginMenu.classList.add('login-lima');

        const menuListMobile = document.getElementById('mobile-nav');
    
        const logoAdition = document.getElementById('brand-logo-menu-bar-client');
        const logoClient = document.createElement('img');
        switch (company) {
            case 3:
                {
                    const barMenu = document.getElementById('nav-menu-bar');
                    logoMenu.style.width='10em';
                    logoAdition.setAttribute('href','http://www.munlima.gob.pe/')
                    barMenu.classList.remove('transparent');
                    barMenu.classList.add('mmlNavBar');
                    logoClient.setAttribute('id', 'logo-muniLima');
                    logoClient.setAttribute('src','/img/logo-mml.png');
                    logoClient.setAttribute('alt', 'logo-muniLima');
                    logoClient.style.width='5em';
                    menuList.innerHTML+=bulletin;
                    menuNavMobile.innerHTML+=bulletinMobile;
                    document.getElementById('login-menu').addEventListener('click',()=>goToLogin())
                    document.getElementById('login-menu-mobile').addEventListener('click',()=>goToLogin())
                    const mobileMenu = document.getElementById('mobile-nav');
                    M.Sidenav.init(mobileMenu);
                    const modals = document.querySelectorAll('.modal');
                    M.Modal.init(modals);
                    const modals2 = document.querySelectorAll('.modal');
                    M.Modal.init(modals2);
                    const dropMenu = document.querySelectorAll('.dropdown-trigger');
                    M.Dropdown.init(dropMenu,{coverTrigger:false});
                }
                break;
            case 4:
                {
                    logoAdition.setAttribute('href','http://www.munisanborja.gob.pe/')
                    logoClient.setAttribute('id', 'logo-muniSanBorja');
                    logoClient.setAttribute('src','/img/logo-san-borja.png');
                    logoClient.setAttribute('alt', 'logo-muniSanBorja');
                    logoClient.style.width='2em'
                    
                    
                }
                break;
            case 8:
                {
                    logoAdition.setAttribute('href','https://www.miraflores.gob.pe/')
                    logoClient.setAttribute('id', 'logo-muniMiraflores');
                    logoClient.setAttribute('src','/img/logo-miraflores.png');
                    logoClient.setAttribute('alt', 'logo-muniMiraflores');
                    logoClient.style.width='6rem'
                    
                }
                break;
    
            default:
                break;
        }
        // logoClient.classList.add('responsive-img');
        logoAdition.appendChild(logoClient);
    };
};

const forgotPass = `
<!-- Modal Change Password Structure -->
<div id="modalChangePassword" class="modal">
    <div class="modal-content center">
    <div class="row">
      <form class="col s8 offset-s2  login">
        <div class="row">
          <div class="input-field col s10 offset-s1">
            <input id="emailpass" type="email" class="validate">
            <label for="emailpass" data-error="wrong" data-success="right">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="center-align">
          <button id="submit-btn-pass" class="btn waves-effect waves-light" >Submit
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
        </div>
        <p>* le será enviado un correo a su email, por favor ingrese con ésa contraseña y puede cambiarla en configuración.	</p>
      </form>
    </div>
    </div>
    <div class="modal-footer"></div>
</div>

`;

const changePassEvent =  (e, element) => {
    e.preventDefault();
    const emailuser = window.btoa(
        element.querySelector('#new_email').value
    );
    const old_password = window.btoa(
        element.querySelector('#old-password').value
    );
    const new_password = window.btoa(
        element.querySelector('#new-password').value
    );
    const url = `${sourceAPI}changePassword/`;
    const data = {
        email: `${emailuser}`,
        old_password: `${old_password}`,
        new_password: `${new_password}`,
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(res => {
            if (res.OK === 'Password have been changed') {
                M.toast({
                    html: 'Su contraseña ha sido cambiada.',
                    displayLength: 6000,
                });
            } else if (res.error === 'Incorrect Password') {
                M.toast({
                    html: 'La contraseña enviada es incorrecta.',
                    displayLength: 6000,
                });
            }
        });
};

const addZero = i => {
	if (i < 10) {
		i = '0' + i;
	}
	return i;
};

const ppbToECAdash = sensor => {
	switch (sensor) {
		case 'CO':
			return { ECA: 10000 * 0.87, factor: 1.144919906 };
		case 'NO2':
			return { ECA: 100 * 0.532, factor: 1.880677075 };
		case 'O3':
			return { ECA: 100 * 0.51, factor: 1.962019118 };
		case 'H2S':
			return { ECA: 150 * 0.719, factor: 1.393033574 };
		case 'SO2':
			return { ECA: 250 * 0.382, factor: 2.618478014 };
		case 'PM25':
			return { ECA: 50, factor: 1 };
		case 'PM10':
			return { ECA: 100, factor: 1 };
		default:
			break;
	}
};

export {navbar,
legend,
login,
logout,
logoutMob,
returnArrow,
returnArrowMob,
dropdownLegend,
legendMobile,
loginMobile,
chooseSpinnerMenu,
spinMob,
styledNavBar,
forgotPass,
config,
configMobile,
dropdownConfig,
dropdownConfigADM,
modalChangePass,
modalNewUser,
changePassEvent,
reports,
reportsMobile,
dropdownReports,
monitor,
monitorMobile,
dropdownMonitor,
maintenance,
maintenanceMobile,
dropdownMaintenance,
addZero,
ppbToECAdash,
download,
downloadMob,
configAdm,
configAdmMob,
forecasting,
forecastingMobile,
spatialRealTime,
spatialRealTimeMobile,
spatialHistorical,
spatialHistoricalMobile
};