const zone = [
  {id:1, zone:'Zona de Protección Especial'},
  {id:2, zone:'Zona Residencial'},
  {id:3, zone:'Zona Comercial'},
  {id:4, zone:'Zona Industrial'},
];
const notNull = (value) => value===null ? '__': value;

const viewMap = `   
<div class="wrapper_map" id="wrapper_map">
<div class="animate__animated animate__fadeInDown" id="map"></div>
<div class="animate__animated animate__zoomIn z-depth-4 none" id="over_map_infowindow"></div>
<div class="animate__animated animate__swing none" id="over_map_qairito"></div>
<div class="animate__animated animate__zoomIn" id="over_map">
<table class="centered">
<p class="inca-title">Indice de Calidad del Aire (INCA)</p>
<thead><tr><th class="inca-color1">Buena</th><th class="inca-color1">Moderada</th><th class="inca-color1">Mala</th><th class="inca-color1">Cuidado</th></tr></thead>
<tbody><tr><td bgcolor="#009966" class="inca-color"></td>
<td bgcolor="#ffde33" class="inca-color"></td>
<td bgcolor="#ff9933" class="inca-color"></td>
<td bgcolor="#cc0033" class="inca-color"></td></tr>
<tr>
<td class="inca-qairito1"><img class="inca-qairito" id="qairito-good" src="img/qairito/qairito_buena.gif" alt="qairito-good"></img></td>
<td class="inca-qairito1"><img class="inca-qairito" id="qairito-moderate" src="img/qairito/qairito_moderada.gif" alt="qairito-moderate" ></img></td>
<td class="inca-qairito1"><img class="inca-qairito" id="qairito-bad" src="img/qairito/qairito_mala.gif" alt="qairito-bad" ></img></td>
<td class="inca-qairito1"><img class="inca-qairito" id="qairito-hazardous" src="img/qairito/qairito_cuidado.gif" alt="qairito-hazardous"></img></td>
</tr>
</tbody>
</table>
</div>
</div>
<!-- Modal Graphics -->
<div id="modalGraphic" class="modal">
<a id="close" class="modal-close right responsive-img modal-images-close">X</a>
<div class="modal-content center" id="graphicValues">
</div>
</div>
`;

const viewSearchingPanelHistorical = `   
<div class="wrapper_map" id="wrapper_map">
<div class="animate__animated animate__fadeInDown" id="map"></div>
<div class="animate__animated animate__zoomIn z-depth-4 none" id="over_map_infowindow"></div>
<div class="animate__animated animate__zoomIn" id="over_map">

<div class="card-pannel z-depth-5">
    <form id="form_panel_historical">
      <div class="row">
      <p class="left-align" style="padding-left:30px"><b>Contaminante (ug/m3)</b></p>

        <div class="col s4">
        <label for="NO2"> <input id="NO2" class="with-gap" name="pollutant" type="radio" value="NO2" checked /><span>NO2 (gas)</span></label>
        </div>

        <div class="col s4">
        <label for="CO"><input id="CO" class="with-gap" name="pollutant" type="radio" value="CO" /><span>CO (gas)</span></label>
        </div>

        <div class="col s4">
        <label for="PM25"><input id="PM25" class="with-gap" name="pollutant" type="radio" value="PM25" /><span>PM2.5 (polvo)</span></label>
        </div>    

      </div>

    </form>
    <div class="row">
      <div class="col s4"><p><button id="play" class="btn waves-effect waves-light" >Iniciar<i class="material-icons right">play_arrow</i></button></p></div>
      <div class="col s4"><p><button id="pause" class="btn waves-effect waves-light" >Pausar<i class="material-icons right">pause</i></button></p></div>
      <div class="col s4"><p><button id="restart" class="btn waves-effect waves-light" >Restaurar<i class="material-icons right">restart_alt</i></button></p></div>
    </div>
    <form id="form_progress_spatial">
      <div class="row">
        <div class="container" style="height:20px; background-color:#CCC; position:relative; border-radius:7px">
          <div class="progress-bar" style="height:20px; background-color:rgb(125,44,255); position:absolute; animation: progress-animation 5s forwards"></div>
        </div>
      </div>
    </form>
</div>


</div>
</div>
<!-- Modal Graphics -->
<div id="modalGraphic" class="modal">
<a id="close" class="modal-close right responsive-img modal-images-close">X</a>
<div class="modal-content center" id="graphicValues">
</div>
</div>
`;

const viewPointsManagement = `   
<div class="wrapper_map" id="wrapper_map">
<div class="animate__animated animate__fadeInDown" id="map"></div>
<div class="animate__animated animate__zoomIn z-depth-4 none" id="over_map_infowindow"></div>
<div class="animate__animated animate__zoomIn" id="over_map">

<div class="card-pannel z-depth-5">
    <h6 class="center-align"><b>Mantenimiento de Puntos<b/></h6>
    <h6 class="left-align">Gestion de puntos históricos</h6>
    <div class="row">
      <div class="col 6"><p><button id="get-all-grids" class="btn waves-effect waves-light" >Mostrar Puntos</button></p></div>
      <div class="col 6"><p><button id="delete-all-grids" class="btn waves-effect waves-light" >Borrar Puntos</button></p></div>
    </div>
    <h6 class="left-align">Gestion de puntos nuevos</h6>
    <div class="row">
      <div class="col s6"><p><button id="save" class="btn waves-effect waves-light" >Guardar Puntos</button></p></div>
      <div class="col s6"><p><button id="restart" class="btn waves-effect waves-light" >Borrar Figura</button></p></div>
    </div>
</div>


</div>
</div>
<!-- Modal Graphics -->
<div id="modalGraphic" class="modal">
<a id="close" class="modal-close right responsive-img modal-images-close">X</a>
<div class="modal-content center" id="graphicValues">
</div>
</div>
`;


const viewSearchingPanelForecasting = `   
<div class="wrapper_map" id="wrapper_map">
<div class="animate__animated animate__fadeInDown" id="map"></div>
<div class="animate__animated animate__zoomIn z-depth-4 none" id="over_map_infowindow"></div>
<div class="animate__animated animate__zoomIn" id="over_map">

<div class="card-pannel z-depth-5">
    <h6 class="center-align"><b>Predicción Temporal</b></h6>
    <h8 class="center-align">Próximas 6 horas</h8>
    <form id="form_panel_forecasting">
      <div class="row">
      <p class="left-align" style="padding-left:30px"><b>Contaminante (ug/m3)</b></p>

        <div class="col s4">
        <label for="NO2"> <input id="NO2" class="with-gap" name="pollutant" type="radio" value="NO2" checked /><span>NO2 (gas)</span></label>
        </div>

        <div class="col s4">
        <label for="CO"><input id="CO" class="with-gap" name="pollutant" type="radio" value="CO" /><span>CO (gas)</span></label>
        </div>

        <div class="col s4">
        <label for="PM25"><input id="PM25" class="with-gap" name="pollutant" type="radio" value="PM25" /><span>PM2.5 (polvo)</span></label>
        </div>    

      </div>
    </form>
    <div class="row">
      <div class="col s4"><p><button id="play" class="btn waves-effect waves-light" >Iniciar<i class="material-icons right">play_arrow</i></button></p></div>
      <div class="col s4"><p><button id="pause" class="btn waves-effect waves-light" >Pausar<i class="material-icons right">pause</i></button></p></div>
      <div class="col s4"><p><button id="restart" class="btn waves-effect waves-light" >Restaurar<i class="material-icons right">restart_alt</i></button></p></div>
    </div>
    <form id="form_progress_forecasting">
      <div class="row">
        <div class="container" style="height:20px; background-color:#CCC; position:relative; border-radius:7px">
          <div class="progress-bar" style="height:20px; background-color:rgb(125,44,255); position:absolute; animation: progress-animation 5s forwards"></div>
        </div>
      </div>
    </form>
</div>


</div>
</div>
<!-- Modal Graphics -->
<div id="modalGraphic" class="modal">
<a id="close" class="modal-close right responsive-img modal-images-close">X</a>
<div class="modal-content center" id="graphicValues">
</div>
</div>
`;


const viewSearchingPanelFuture = `   
<div class="wrapper_map" id="wrapper_map">
<div class="animate__animated animate__fadeInDown" id="map"></div>
<div class="animate__animated animate__zoomIn z-depth-4 none" id="over_map_infowindow"></div>
<div class="animate__animated animate__zoomIn" id="over_map">

<div class="card-pannel z-depth-5">
    <h6 class="center-align"><b>Prediccion Espacial a Futuro</b></h6>
    <h8 class="center-align">Próximas 6 horas</h8>
    <form action="">
      <div class="row">
      <p class="left-align" style="padding-left:20px"><b>Selecciona el contaminante (ug/m3)</b></p>

        <div class="col s4">
        <label for="NO2"> <input id="NO2" class="with-gap" name="pollutant" type="radio" value="NO2" checked /><span>NO2</span></label>
        </div>

        <div class="col s4">
        <label for="CO"><input id="CO" class="with-gap" name="pollutant" type="radio" value="CO" /><span>CO (gas)</span></label>
        </div>

        <div class="col s4">
        <label for="PM25"><input id="PM25" class="with-gap" name="pollutant" type="radio" value="PM25" /><span>PM2.5</span></label>
        </div>
      
      </div>

    </form>
    <div class="row">
      <div class="col s4"><p><button id="play" class="btn waves-effect waves-light" >Iniciar<i class="material-icons right">play_arrow</i></button></p></div>
      <div class="col s4"><p><button id="pause" class="btn waves-effect waves-light" >Pausar<i class="material-icons right">pause</i></button></p></div>
      <div class="col s4"><p><button id="restart" class="btn waves-effect waves-light" >Restaurar<i class="material-icons right">restart_alt</i></button></p></div>
    </div>
    <form id="form_progress_future_spatial">
      <div class="row">
        <div class="container" style="height:20px; background-color:#CCC; position:relative; border-radius:7px">
          <div class="progress-bar" style="height:20px; background-color:rgb(125,44,255); position:absolute; animation: progress-animation 5s forwards"></div>
        </div>
      </div>
    </form>
</div>


</div>
</div>
<!-- Modal Graphics -->
<div id="modalGraphic" class="modal">
<a id="close" class="modal-close right responsive-img modal-images-close">X</a>
<div class="modal-content center" id="graphicValues">
</div>
</div>
`;


const infowindow = (qhawax) =>`
<p>${qhawax.name}: ${qhawax.comercial_name}</p>
<div class="col s12">
      <ul class="tabs">
        <li class="tab col s2"><a class="active" href="#test1">INCA</a></li>
        <li class="tab col s2"><a href="#test2" >Tiempo Real</a></li>
        <li class="tab col s2"><a href="#test3" >Tiempo</a></li>
        <li class="tab col s2"><a href="#test4">Gráficos</a></li>
      </ul>
</div>
    <div id="test1" class="col s12"></div>
    <div id="test2" class="col s12"></div>
    <div id="test3" class="col s12"></div>
    <div id="test4" class="col s12"></div>

`;

const pannelInca = (inca, color)=> `
<table class="responsive-table stripped centered pannel-inca">
        <thead>
          <tr>
              <th>${window.innerWidth > 768 ? 'Monóxido de Carbono (CO)' : 'CO'}</th>
              <th>${window.innerWidth > 768 ? 'Dióxido de Nitrógeno (NO<sub>2</sub>)' : 'NO<sub>2</sub>'}</th>
              <th>${window.innerWidth > 768 ? 'Ozono (O<sub>3</sub>)' : 'O<sub>3</sub>'}</th>
              <th>${window.innerWidth > 768 ? 'Sulfuro de Hidrógeno (H<sub>2</sub>S)' : 'H<sub>2</sub>S'}</th>
              <th>${window.innerWidth > 768 ? 'Dióxido de Azúfre (SO<sub>2</sub>)' : 'SO<sub>2</sub>'}</th>
              <th>${window.innerWidth > 768 ? 'Material Particulado ' : 'PM'}2,5&micro;</th>
              <th>${window.innerWidth > 768 ? 'Material Particulado ' : 'PM'}10&micro;</th>
              <th>Hora</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td bgcolor="${color.result.CO.color}">${notNull(inca.CO)}</td>
            <td bgcolor="${color.result.NO2.color}">${notNull(inca.NO2)}</td>
            <td bgcolor="${color.result.O3.color}">${notNull(inca.O3)}</td>
            <td bgcolor="${color.result.H2S.color}">${notNull(inca.H2S)}</td>
            <td bgcolor="${color.result.SO2.color}">${notNull(inca.SO2)}</td>
            <td bgcolor="${color.result.PM25.color}">${notNull(inca.PM25)}</td>
            <td bgcolor="${color.result.PM10.color}">${notNull(inca.PM10)}</td>
            <td>${color.time}</td>
          </tr>
        </tbody>
      </table>
`
const pannelRealTime = (socket)=> `
<table class="responsive-table stripped centered pannel-inca">
        <thead>
          <tr>
              <th>${window.innerWidth > 768 ? 'Monóxido de Carbono (CO)' : 'CO'}<sub>(&microg/m<sup>3</sup>)</sub></th>
              <th>${window.innerWidth > 768 ? 'Dióxido de Nitrógeno (NO<sub>2</sub>) ' : 'NO<sub>2</sub>'}<sub>(&microg/m<sup>3</sup>)</sub></th>
              <th>${window.innerWidth > 768 ? 'Ozono <br> (O<sub>3</sub>)' : 'O<sub>3</sub>'}<sub>(&microg/m<sup>3</sup>)</sub></th>
              <th>${window.innerWidth > 768 ? 'Sulfuro de Hidrógeno (H<sub>2</sub>S)' : 'H<sub>2</sub>S'}<sub>(&microg/m<sup>3</sup>)</sub></th>
              <th>${window.innerWidth > 768 ? 'Dióxido de Azúfre  <br> (SO<sub>2</sub>)' : 'SO<sub>2</sub>'}<sub>(&microg/m<sup>3</sup>)</sub></th>
              <th>${window.innerWidth > 768 ? 'Material Particulado PM2,5&micro' : 'PM2,5&micro'}<sub>(&microg/m<sup>3</sup>)</sub></th>
              <th>${window.innerWidth > 768 ? 'Material Particulado PM10&micro' : 'PM10&micro'}<sub>(&microg/m<sup>3</sup>)</sub></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>${notNull(socket.CO_ug_m3)}</td>
            <td>${notNull(socket.NO2_ug_m3)}</td>
            <td>${notNull(socket.O3_ug_m3)}</td>
            <td>${notNull(socket.H2S_ug_m3)}</td>
            <td>${notNull(socket.SO2_ug_m3)}</td>
            <td>${notNull(socket.PM25)}</td>
            <td>${notNull(socket.PM10)}</td>
          </tr>
        </tbody>
      </table>
`

const pannelMeteo = (zone,meteo,uv)=> `
<p>Tipo de zona: ${zone.zone}</p>
<table class="responsive-table stripped centered pannel-inca">
        <thead>
          <tr>
              <th>${window.innerWidth > 768 ? 'Ruido' : '<i class="small material-icons">volume_up</i>'}<sub>(dB)</sub></th>
              <th>${window.innerWidth > 768 ? 'Temperatura ' : 'T '}<sub>(°C)</sub></th>
              <th>${window.innerWidth > 768 ? 'Ultra Violeta ' : 'UV '}<sub>(UVI)</sub><br></th>
              <th>${window.innerWidth > 768 ? 'Presión ' : 'P '}<sub>(hPa)</sub></th>
              <th>${window.innerWidth > 768 ? 'Humedad ' : 'HR '}<sub>(%)</sub></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td bgcolor="${zone.color}">${notNull(meteo.spl)}</td>
            <td >${notNull(meteo.temperature)}</td>
            <td bgcolor="${uv.color}">${notNull(meteo.UV)}</td>
            <td >${notNull(meteo.pressure)}</td>
            <td >${notNull(meteo.humidity)}</td>
          </tr>
        </tbody>
      </table>
`
const pannelGraphics = (qhawax)=> `
<p >Gráficos de las últimas 24 horas. Click en <i class="tiny material-icons">remove_red_eye</i></p>
<table class="responsive-table stripped centered pannel-inca">
    <thead id="graph-head">
          <tr>
              <th >${window.innerWidth > 768 ? 'Monóxido de Carbono (CO)' : 'CO'}</th>
              <th >${window.innerWidth > 768 ? 'Dióxido de Nitrógeno (NO<sub>2</sub>)' : 'NO<sub>2</sub>'}</th>
              <th >${window.innerWidth > 768 ? 'Ozono (O<sub>3</sub>)' : 'O<sub>3</sub>'}</th>
              <th >${window.innerWidth > 768 ? 'Sulfuro de Hidrógeno (H<sub>2</sub>S)' : 'H<sub>2</sub>S'}</th>
              <th >${window.innerWidth > 768 ? 'Dióxido de Azúfre (SO<sub>2</sub>)' : 'SO<sub>2</sub>'}</th>
              <th >${window.innerWidth > 768 ? 'Material Particulado ' : 'PM'}2,5&micro;</th>
              <th >${window.innerWidth > 768 ? 'Material Particulado ' : 'PM'}10&micro;</th>
          </tr>
    </thead> 

    <tbody>
    <tr>
      <td class="infowindow-graph icon-eye" ><a class="modal-trigger" href="#modalGraphic" ><i class="material-icons icon-green" data-infograph="${qhawax.name}" data-label="CO">remove_red_eye</i></a></td>
      <td class="infowindow-graph icon-eye" ><a class="modal-trigger" href="#modalGraphic" ><i class="material-icons icon-green" data-infograph="${qhawax.name}" data-label="NO2">remove_red_eye</i></a></td>
      <td class="infowindow-graph icon-eye" ><a class="modal-trigger" href="#modalGraphic" ><i class="material-icons icon-green" data-infograph="${qhawax.name}" data-label="O3">remove_red_eye</i></a></td>
      <td class="infowindow-graph icon-eye" ><a class="modal-trigger" href="#modalGraphic" ><i class="material-icons icon-green" data-infograph="${qhawax.name}" data-label="H2S">remove_red_eye</i></a></td>
      <td class="infowindow-graph icon-eye" ><a class="modal-trigger" href="#modalGraphic" ><i class="material-icons icon-green" data-infograph="${qhawax.name}" data-label="SO2">remove_red_eye</i></a></td>
      <td class="infowindow-graph icon-eye" ><a class="modal-trigger" href="#modalGraphic" ><i class="material-icons icon-green" data-infograph="${qhawax.name}" data-label="PM25">remove_red_eye</i></a></td>
      <td class="infowindow-graph icon-eye" ><a class="modal-trigger" href="#modalGraphic" ><i class="material-icons icon-green" data-infograph="${qhawax.name}" data-label="PM10">remove_red_eye</i></a></td>
    </tr>
  </tbody>

      </table>
      
`

const dwnGraphView = `
<div class="row edition-element">
<h4 class="center">Gráficas Semanales</h4>
    <div class="row">
          <div class="col s4 offset-s4">
          <label for="qhawax_id">qHAWAX</label>
          <select class="browser-default selection" id="qhawax_id">
          <option value="" disabled selected> Selecciona un qHAWAX</option>
          </select>
          </div>

    </div>

    <div class="row">
    <div class="col s2 offset-s4">
          <label for="week-init" class="week-picker">Semana Inicial</label>
          <input id="week-init" type="week" name="week" value="2020-W01" class="week-picker selection" required>
          
          </div>
       
    <div class="col s2 ">
          <label for="week-end" class="week-picker">Semana Final</label>
          <input id="week-end" type="week" name="week" value="2020-W01" class="week-picker selection" required>
          
          </div>
    </div>

    <div class="row center">
    <div class="col s4 offset-s4">
    <a class="waves-effect waves-light btn disabled" id="graphBtn" >Graficar</a>
    </div>
    </div>

</div>

<div class="row">
        <div id="chart1" class="chart"></div><br>
        <div id="chart2" class="chart"></div><br>
        <div id="chart3" class="chart"></div><br>
        <div id="chart4" class="chart"></div><br>
        <div id="chart5" class="chart"></div><br>
        <div id="chart6" class="chart"></div><br>
        <div id="chart7" class="chart"></div><br>
        <div id="chart8" class="chart"></div><br>
        <div id="chart9" class="chart"></div><br>
        <div id="chart10" class="chart"></div><br>
        <div id="chart11" class="chart"></div><br>
        <div id="chart12" class="chart"></div><br>
</div>
`;

const binnacle = `
<div class="row edition-element">
<h4 class="center">Bitácora</h4>
    <div class="row">
          <div class="col s4 offset-s4">
          <label for="qhawax_id">qHAWAX</label>
          <select class="browser-default" id="qhawax_id">
          <option value="" disabled selected> Selecciona un qHAWAX</option>
          </select>
          </div>
    </div>
</div>
<div class="container">
<div class="timeline" id="binnacle"></div>
</div>
`;

const viewBoard = `   
<table class="responsive-table highlight centered table-calibration">
            <thead>
              <tr>
                <th align="justify" scope="row">Qhawax</th> 
                <th align="justify" scope="row">Nombre</th>  
                <th align="justify" scope="row">Hora</th>
                <th align="justify" scope="row">SO<sub>2</sub><br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify" scope="row">NO<sub>2</sub><br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify" scope="row">CO<br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify" scope="row">H<sub>2</sub>S<br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify" scope="row">O<sub>3</sub><br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify" scope="row">PM<sub>2,5</sub><br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify" scope="row">PM<sub>10</sub><br>(&micro;g/m<sup>3</sup>)</th>
                <th align="justify" scope="row">UV</th>    
                <th align="justify" scope="row">dB</th>
                <th align="justify" scope="row">T°C</th>
                <th align="justify" scope="row">Ti°C</th>
                <th align="justify" scope="row">H (%)</th>
                <th align="justify" scope="row">P<br>(hPa)</th>
                <th align="justify" scope="row">Conexión</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
            <tfoot>
        <tr>
            <th scope="row" align="center" colspan="16" id="wrapper-pagination">
            </th>
        </tr>
    </tfoot>
          </table>

    <style>
    @media screen and (min-width: 760px) {
      tbody {
        display:block;
        height:72vh;
        overflow:auto;
      }
      thead, tbody tr {
        display:table;
        width:100%;
        table-layout:fixed;
      }
    }
      
    </style>
`;

const chartView = `
  <div class="row edition-element">
  <h4 class="center">Gráficos en Tiempo Real</h4>
  <div class="col s4  ">
  <label for="selectQhawax">qHAWAX</label>
    <select class="browser-default" name="" id="selectQhawax">
    <option value="" disabled selected> Selecciona un qHAWAX</option>
	</select>
	</div>
  <div class="col s4  ">
  <label for="selectTime">Tiempo de la gráfica</label>
    <select class="browser-default" name="" id="selectTime">
	<option value="" disabled selected> Selecciona tiempo en minutos</option>
	<option value="5"> 5 </option>
	<option value="10"> 10 </option>
	<option value="15"> 15 </option>
	<option value="20"> 20 </option>
	<option value="25"> 25 </option>
	<option value="30"> 30 </option>
	<option value="60"> 60 </option>
	<option value="120"> 120 </option>
	</select>
	</div>
	<br>
	<div class="col s2">
	<a class="waves-effect waves-light btn" id="graphicBtn">Graficar</a>
	</div>
	</div>
        <div class="row">
        <div id="chart1" class="chart"></div><br>
        <div id="chart2" class="chart"></div><br>
        <div id="chart3" class="chart"></div><br>
        <div id="chart4" class="chart"></div><br>
        <div id="chart5" class="chart"></div><br>
        <div id="chart6" class="chart"></div><br>
        <div id="chart7" class="chart"></div><br>
        <div id="chart8" class="chart"></div><br>
        <div id="chart9" class="chart"></div><br>
        <div id="chart10" class="chart"></div><br>
        <div id="chart11" class="chart"></div><br>
        <div id="chart12" class="chart"></div><br>
        <div id="chart13" class="chart"></div><br>
        <div id="chart14" class="chart"></div><br>
        <div id="chart15" class="chart"></div><br>
        <div id="chart16" class="chart"></div><br>
        <div id="chart17" class="chart"></div><br>
        <div id="chart18" class="chart"></div><br>
        <div id="chart19" class="chart"></div><br>
        <div id="chart20" class="chart"></div><br>
        </div>
    </div>
        
`;

const viewDownload = `
<div class="row edition-element">
<div class="col s6 offset-s3">
<div class="card-pannel z-depth-5">
    <form action="">
      <h5 class="center-align">Descarga la data de medición de calidad del aire</h5>
      <div class="row">

      <div class="input-field col s3 offset-s1">
      <p><label for="hourly-average"> <input id="hourly-average" class="with-gap" name="group1" type="radio" value="hourly-average" checked /><span>Promedio Horario</span></label></p>
      </div>

      <div class="input-field col s3 offset-s1">
      <p><label for="raw-data"><input id="raw-data" class="with-gap" name="group1" type="radio" value="raw-data" /><span>Data Cruda</span></label> </p>
      </div>
      
      <div class="input-field col s3">
      <p><label for="5min-average"><input id="5min-average" class="with-gap" name="group1" type="radio" value="5min-average" /><span>Promedio 5 min</span></label></p>
      </div>
      <div class="input-field col s6 offset-s3">
      <label for="selectQhawax"></label>
      <select class="browser-default center-align" name="" id="selectQhawax">
      <option value="" disabled selected> Selecciona un qHAWAX</option>
      </select>
      </div>
      </div>
                <div class="container">
                  <div class="row center-align">
                    <div class="col s6">
                      <label for="initDate">Fecha de Inicio</label>
                      <input type="text" class="datepicker center-align" name="initDate">
                    </div>
                    <div class="col s6">
                        <label for="initHour">Hora de Inicio</label>
                        <input type="text" class="timepicker center-align" name="initHour">
                    </div>
                </div>
                </div>
                <div class="container">
                  <div class="row center-align">
                    <div class="col s6">
                        <label for="endDate">Fecha de fin</label>
                        <input type="text" class="datepicker center-align" name="endDate">
                      </div>
                    <div class="col s6">
                      <label for="endHour">Hora de fin</label>
                      <input type="text" class="timepicker center-align" name="endHour">
                    </div>
                  </div>
                  <div class="row">
                  <div class="center-align">
                  <button id="submit-btn" class="btn waves-effect waves-light" >Descargar
                    <i class="material-icons right">send</i>
                  </button>
                </div>
                </div>
			</form>
			<p class="center"><strong><sub>Los datos no han pasado un control de calidad.</sub></strong></p>
        </div>
    </div>
	</div>
	
`;

const viewLogin = `
<h3 class="white-text center-align slogan">Know your air, become the change</h3>

  <!-- LOGIN FORM -->
  <div class="login-form">
    <div class="container row">
      <form class="login">

        <div class="row">
          <div class="input-field col s10 offset-s1">
            <input id="email_login" type="email" class="validate login-check"autocomplete="on">
            <label for="email_login" >Email</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s10 offset-s1">
            <input id="password" type="password" class="validate login-check" autocomplete="on">
            <span class="icon-input icon-key"></span>
            <label for="password">Password</label>
          </div>
        </div>

        <div class="row">
          <div class="center-align">
          <button id="submit-btn" class="btn waves-effect waves-light disabled" >Submit
            <i class="material-icons right">send</i>
          </button>
		  </div>
  
      <div class="center-align">
		<br>
		<a class="modal-trigger underline bold" href="#modalChangePassword">
						Olvidé mi contraseña
					</a>
		<p>* Si desea mayor información sobre la data de calidad del aire, puede escribirnos al correo software@qairadrones.com</p>
		</div>
        <div class="chip hide"><i class="material-icons" style="color:red">warning</i>
        La dirección de email o contaseña ingresada es incorrecta.
        <i class="close material-icons close-tag">close</i>
      </div>
        </div>
      </form>
    </div>
  </div>

 
`;

const viewqhawaxList = `

<div class="container center edition-element ">
<h4 class="center">Listado de qHAWAX</h4>
<button data-target="modal_create_quawax" class="btn modal-trigger create-qhawax ">Crear nuevo qHAWAX</button>
</div>


<table class="responsive-table highlight centered table-calibration-2" >
            <thead>
              <tr>
                <th align="justify" id="sort-inca"><i class="small material-icons right order-arrow"></i>INCA</th> 
                <th align="justify" id="sort-qhawax"><i class="small material-icons right order-arrow"></i>Qhawax</th> 
                <th align="justify" id="sort-type"><i class="small material-icons right order-arrow"></i>Tipo</th> 
                <th align="justify" id="sort-mode"><i class="small material-icons right order-arrow"></i>Modo</th> 
                <th align="justify" id="sort-connection"><i class="small material-icons right order-arrow"></i>Conexión</th>
                <th align="justify">Switch</th>
              </tr>
            </thead>
            <tbody>
        </tbody>
        <tfoot>
        <tr>
            <th scope="row" align="center"colspan="5" id="wrapper-pagination">
            </th>
        </tr>
    </tfoot>
 </table>



  <div id="modal_create_quawax" class="modal">
    <div class="modal-content center">
      <h4>Creación de qHAWAX</h4>
      <div class="row">
      <form class="col s8 offset-s2 create">
       
        <div class="row">
        <select class="browser-default col s10 offset-s1" id="type">
          <option value="" disabled selected>Selecciona el tipo</option>
          <option value="STATIC">STATIC</option>
          <option value="AEREAL">AEREAL</option>
        </select>
        </div>

        <div class="row">
        <select class="browser-default col s6" id="version">
        <option value="" disabled selected>Selecciona la versión</option>
        </select>
        
          <h6 class="input-field col s6" id="qhawax_name_label"></h6>
       
      </div>

        <div class="row">
          <div class="center-align">
          <button id="submit-btn-create" class="btn waves-effect waves-light disabled" >Crear
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
        </div>
      </form>
    </div>
    </div>
  </div>



`;;

const viewCompanys = `
<div class="container center edition-element ">
<h4 class="center">Listado de Compañías</h4>
<button data-target="modal_create_company" class="btn modal-trigger create-company ">Crear nueva Compañía</button>
</div>
<div class="row"></div>

<table class="responsive-table highlight centered table-calibration-2">
            <thead>
              <tr>
                <th align="justify" id="sort_id"><i class="small material-icons right order-arrow"></i>ID</th> 
                <th align="justify" id="sort_name"><i class="small material-icons right order-arrow"></i>Nombre</th> 
                <th align="justify" id="sort_ruc"><i class="small material-icons right order-arrow"></i>RUC</th> 
                <th align="justify" id="sort_address"><i class="small material-icons right order-arrow"></i>Dirección</th> 
                <th align="justify" id="sort_contact"><i class="small material-icons right order-arrow"></i>Contacto</th> 
                <th align="justify" id="sort_phone"><i class="small material-icons right order-arrow"></i>Teléfono</th> 
                <th align="justify" id="sort_domain"><i class="small material-icons right order-arrow"></i>Dominio</th> 
                <th align="justify" id="sort_users"><i class="small material-icons right order-arrow"></i>Usuarios</th> 
              </tr>
            </thead>
            <tbody>
        </tbody>
        <tfoot>
        <tr>
            <th scope="row" align="center" colspan="7" id="wrapper-pagination">
            </th>
        </tr>
    </tfoot>
 </table>

 <div id="modal_create_company" class="modal">
    <div class="modal-content center">
      <h4>Creación de Compañía</h4>

      <div class="col s8 offset-s2 create">

        <div class="row">

        <div class="input-field col s5 offset-s1">
          <input id="company_name" type="text" class="validate required-field" >
          <label for="company_name" data-error="wrong" data-success="right">Nombre de Compañía</label>
        </div>
        <div class="input-field col s5 ">
          <input id="company_ruc" type="number" step="1" min="10000000000" max="30000000000" class="validate required-field" size="11">
          <label for="company_ruc" data-error="wrong" data-success="right">RUC</label>
        </div>

      </div>

      <div class="row">

        <div class="input-field col s5 offset-s1">
          <input id="company_contact" type="text" class="validate required-field" >
          <label for="company_contact" data-error="wrong" data-success="right">Contacto</label>
        </div>

        <div class="input-field col s5 ">
          <input id="company_phone" type="number" class="validate required-field" >
          <label for="company_phone" data-error="wrong" data-success="right">Teléfono</label>
        </div>

      </div>

      <div class="row">
      <div class="input-field col s10 offset-s1">
        <input id="company_domain" type="text" class="validate required-field" >
        <label for="company_domain" data-error="wrong" data-success="right">Dominio</label>
      </div>
    </div>

    <div class="row">
    <div class="input-field col s10 offset-s1">
      <input id="company_address" type="text" class="validate required-field" >
      <label for="company_address" data-error="wrong" data-success="right">Dirección</label>
    </div>
  </div>

        <div class="row">
          <div class="center-align">
          <button id="submit-btn-create-co" class="btn waves-effect waves-light disabled" >Crear
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
        </div>
      </div>
    </div>
  </div>
`;

const qhawaxInstallList = `
<div class="row center edition-element ">
<h4 class="center">Listado de qHAWAX instalados</h4>
</div>


<table class="responsive-table highlight centered table-calibration-2" >

<thead>
  <tr>
    <th align="justify" id="sort-inca">INCA</th>
    <th align="justify" id="sort-comName"><i class="small material-icons right order-arrow"></i>Nombre Comercial</th> 
    <th align="justify" id="sort-company"><i class="small material-icons right order-arrow"></i>Compañía</th> 
    <th align="justify" id="sort-comId"><i class="small material-icons right order-arrow"></i>ID</th> 
    <th align="justify" id="sort-qhawaxId"><i class="small material-icons right order-arrow"></i>qHAWAX</th> 
    <th align="justify" id="sort-installDate"><i class="small material-icons right order-arrow"></i>Instalación</th> 
    <th align="justify" id="sort-cleanDate"><i class="small material-icons right order-arrow"></i>Prox. Limpieza</th> 
    <th align="justify" id="sort-maintDate"><i class="small material-icons right order-arrow"></i>Prox. Mantenimiento</th> 
    <th align="justify" id="sort-public"><i class="small material-icons right order-arrow"></i>Público</th> 
    <th align="justify" id="sort-district"><i class="small material-icons right order-arrow"></i>Distrito</th>
    <th align="justify" id="sort-uninstall">Desinstalar</th>
  </tr>
</thead>
<tbody>
</tbody>
<tfoot>
<tr>
<th scope="row" align="center"colspan="5" id="wrapper-pagination">
</th>
</tr>
</tfoot>
</table>

`;

const qhawaxInstall=`
<div class=" table-calibration container">

<div class="row">
</div>

    <h4 class="center">Instalación de qHAWAX</h4>
<div class="row">
</div>
<div class="row">
</div>
      <div class="row">

            <div class="col s5 offset-s1">
            <label for="qhawax_id">qHAWAX</label>
            <select class="browser-default" name="" id="qhawax_id">
            <option value="" disabled selected> Selecciona un qHAWAX</option>
            </select>
            </div>

            <div class="col s5 ">
            <label for="company_id">Compañía</label>
            <select class="browser-default" name="" id="company_id">
            <option value="" disabled selected> Selecciona una Compañia</option>
            </select>
            </div>

            

      </div>

     
      <div class="row">

            <div class="row">
            <div class="col s5 offset-s1">
            <label for="season">Estación</label>
            <select class="browser-default" name="" id="season">
            <option value="" disabled selected> Estación</option>
            <option value="Primavera"> Primavera</option>
            <option value="Verano"> Verano</option>
            <option value="Otoño"> Otoño</option>
            <option value="Invierno"> Invierno</option>
            </select>
            </div>

            <div class="col s5 ">
            <label for="is_public">Modo</label>
            <select class="browser-default" name="" id="is_public">
            <option value="" disabled selected> Es público?</option>
            <option value="si" > Sí</option>
            <option value="no" > No</option>
            </select>
            </div>

      </div>

      <div class="row">

            <div class=" col s5 offset-s1">
            <label for="connection_type">Conexión</label>
            <select class="browser-default" name="" id="connection_type">
            <option value="" disabled selected> Conexión</option>
            <option value="Panel" > Panel Solar</option>
            <option value="Corriente" > Corriente</option>
            </select>
            </div>

            <div class=" col s5 ">
            <label for="eca_noise_id">Zona</label>
            <select class="browser-default" name="" id="eca_noise_id">
            <option value="" disabled selected> Zona</option>
            <option value="1" > Zona de Protección Especial</option>
            <option value="2" > Zona Residencial</option>
            <option value="3" > Zona Comercial</option>
            <option value="4" > Zona Industrial</option>
            </select>
            </div>

      </div>

      <div class="row">


          <div class="input-field col s5 offset-s1">
          <input id="lat" type="number" class="validate" placeholder="1.0" step="0.0000000001" min="-90" max="90">
          <label for="lat" data-error="wrong" data-success="right" >Latitud (ej:-12.04318)</label>
          </div>

          <div class="input-field col s5 ">
          <input id="lon" type="number" class="validate" placeholder="1.0" step="0.0000000001" min="-90" max="90" >
          <label for="lon" data-error="wrong" data-success="right">Longitud (ej:-77.02824)</label>
          </div>


    </div>

    <div class="row">

          <div class="input-field col s10 offset-s1">
            <input id="address" type="text" class="validate" >
            <label for="address" data-error="wrong" data-success="right">Dirección</label>
          </div>

    </div>

  <div class="row">

        <div class="col s6 offset-s3 ">
        <label for="district">Distrito de Lima</label>
        <select class="browser-default" name="" id="district">
              <option value="" disabled selected> Distrito:</option>
              <option value="Ancón" > Ancón</option>
              <option value="Ate" > Ate</option>
              <option value="Barranco" > Barranco</option>
              <option value="Breña" > Breña</option>
              <option value="Carabayllo" > Carabayllo</option>
              <option value="Chaclacayo" > Chaclacayo</option>
              <option value="Chorrillos" > Chorrillos</option>
              <option value="Cieneguilla" > Cieneguilla</option>
              <option value="Comas" > Comas</option>
              <option value="El Agustino" > El Agustino</option>
              <option value="Independencia" > Independencia</option>
              <option value="Jesús María" > Jesús María</option>
              <option value="La Molina" > La Molina</option>
              <option value="La Victoria" > La Victoria </option>
              <option value="Lima" > Lima</option>
              <option value="Lince" > Lince</option>
              <option value="Los Olivos" > Los Olivos</option>
              <option value="Lurigancho-Chosica" > Lurigancho-Chosica</option>
              <option value="Lurín" > Lurín</option>
              <option value="Magdalena del Mar" > Magdalena del Mar</option>
              <option value="Miraflores" > Miraflores</option>
              <option value="Pachacámac" > Pachacámac</option>
              <option value="Pucusana" > Pucusana</option>
              <option value="Pueblo Libre" > Pueblo Libre</option>
              <option value="Puente Piedra" > Puente Piedra</option>
              <option value="Punta Hermosa" > Punta Hermosa</option>
              <option value="Punta Negra" > Punta Negra</option>
              <option value="Rímac" > Rímac</option>
              <option value="San Bartolo" > San Bartolo</option>
              <option value="San Borja" > San Borja</option>
              <option value="San Isidro" > San Isidro</option>
              <option value="San Juan de Lurigancho" > San Juan de Lurigancho</option>
              <option value="San Juan de Miraflores" > San Juan de Miraflores</option>
              <option value="San Luis" > San Luis</option>
              <option value="San Martín de Porres" > San Martín de Porres</option>
              <option value="San Miguel" > San Miguel</option>
              <option value="Santa Anita" > Santa Anita</option>
              <option value="Santa María del Mar" > Santa María del Mar</option>
              <option value="Santa Rosa" > Santa Rosa</option>
              <option value="Santiago de Surco" > Santiago de Surco</option>
              <option value="Surquillo" > Surquillo</option>
              <option value="Villa el Salvador" > Villa el Salvador</option>
              <option value="Villa María del Triunfo" > Villa María del Triunfo</option>
              </select>
        </div>

    </div>

<div class="row">

        <div class="input-field col s10 offset-s1">
          <input id="comercial_name" type="text" class="validate" >
          <label for="comercial_name" data-error="wrong" data-success="right">Nombre Comercial</label>
        </div>

  </div>

  <div class="row">

        <div class="input-field col s5 offset-s1">
        <input id="measuring_height" type="number" class="validate" placeholder="1.0" step="0.01" min="0" max="10" >
      <label for="measuring_height" data-error="wrong" data-success="right">Altura en metros</label>
        </div>

        <div class="input-field col s5 ">
        <input id="link_report" type="url" class="validate" >
      <label for="link_report" data-error="wrong" data-success="right">Link Documento (https://)</label>
        </div>

  </div>


  <div class="row">

        <div class="input-field col s10 offset-s1">
        <textarea id="observations" class="materialize-textarea"></textarea>
        <label for="observations" class='active'>Observaciones</label>
        </div>

  </div>
 
  <div class="row">
  </div>
  <div class="row">
  </div>
  <div class="row">
  </div>
  <div class="row">
  </div>
  <div class="row">
  </div>
  <div class="row">
  </div>

  <div class="row">

                <div class="center-align">
                <button id="submit-btn-install" class="btn waves-effect waves-light modal-trigger" href="#modalInstallation">Instalar
                  <i class="material-icons right">send</i>
                </button>
              </div>
  </div>
  <div class="row">
  </div>
  <div class="row">
  </div>

</div>

<!-- Modal Installation -->
<div id="modalInstallation" class="modal modal-fixed-footer">
<div class="modal-content" id="installation_modal">
<ul class="collection with-header">
<li class="collection-header center"><h4>Información de Instalación:</h4></li>
<li class="collection-item" name="qhawax_id"></li>
<li class="collection-item" name="company_id"></li>
<li class="collection-item" name="comercial_name"></li>
<li class="collection-item" name="address"></li>
<li class="collection-item" name="district"></li>
<li class="collection-item" name="is_public"></li>
<li class="collection-item" name="measuring_height"></li>
<li class="collection-item" name="season"></li>
<li class="collection-item" name="connection_type"></li>
<li class="collection-item" name="eca_noise_id"></li>
<li class="collection-item" name="index_type"></li>
<li class="collection-item" name="link_report"></li>
<li class="collection-item" name="instalation_date"></li>
<li class="collection-item" name="lat"></li>
<li class="collection-item" name="lon"></li>
<li class="collection-item" name="person_in_charge"></li>
<li class="collection-item" name="observations"></li>
</ul>
</div>
<div class="modal-footer">
  <button  class="modal-close waves-effect waves-green btn-flat right btn-save">GUARDAR</button>
  <button  class="modal-close waves-effect waves-red btn-flat left btn-edit">EDITAR</button>
</div>
</div>

`;

const qhawaxInstallEdit=`
  <div class="row edition-element">
  <h4 class="center">Edición de instalación de qHAWAX</h4>
      <div class="row">
            <div class="col s4 offset-s4">
            <label for="qhawax_id_reg">qHAWAX</label>
            <select class="browser-default" id="qhawax_id_reg">
            <option value="" disabled selected> Selecciona un qHAWAX</option>
            </select>
            </div>
      </div>
  </div>

  <div class=" table-calibration container edit-table-form"></div>

  <!-- Modal Installation -->
<div id="modalInstallation" class="modal modal-fixed-footer">
<div class="modal-content" id="installation_modal">
<ul class="collection with-header">
<li class="collection-header center"><h4 id="title-module"></h4></li>

</ul>
</div>
<div class="modal-footer">
  <button  class="modal-close waves-effect waves-green btn-flat right btn-save">GUARDAR</button>
  <button  class="modal-close waves-effect waves-red btn-flat left btn-edit">EDITAR</button>
</div>
`;

const qhawaxInstallEditForm = (info, company_name) =>`
<div class="row">
</div>
<div class="row">
</div>
<div class="row">
</div>
      <div class="row">

            <div class="col s5 offset-s1">
            <h5 id="qhawax_id">${info.name}
            </h5>
            </div>

            <div class="col s5 ">
            <h5 id="company_id">${company_name}
            </h5>
            </div>

            

      </div>

     
      <div class="row">

            <div class="row">
            <div class="col s5 offset-s1">
            <label for="season">Estación</label>
            <select class="browser-default" name="" id="season">
            <option value="" disabled selected>${info.season}</option>
            <option value="Primavera"> Primavera</option>
            <option value="Verano"> Verano</option>
            <option value="Otoño"> Otoño</option>
            <option value="Invierno"> Invierno</option>
            </select>
            </div>

            <div class="col s5 ">
            <label for="is_public">Modo</label>
            <select class="browser-default" name="" id="is_public">
            <option value="" disabled selected>Es público: ${info.is_public}</option>
            <option value="si" > Sí</option>
            <option value="no" > No</option>
            </select>
            </div>

      </div>

      <div class="row">

            <div class=" col s5 offset-s1">
            <label for="connection_type">Conexión</label>
            <select class="browser-default" name="" id="connection_type">
            <option value="" disabled selected>${info.connection_type}</option>
            <option value="Panel" > Panel Solar</option>
            <option value="Corriente" > Corriente</option>
            </select>
            </div>

            <div class=" col s5 ">
            <label for="eca_noise_idi">Zona</label>
            <select class="browser-default" name="" id="eca_noise_id">
            <option value="" disabled selected>${zone.find(z=>z.id===info.eca_noise_id).zone}</option>
            <option value="1" > Zona de Protección Especial</option>
            <option value="2" > Zona Residencial</option>
            <option value="3" > Zona Comercial</option>
            <option value="4" > Zona Industrial</option>
            </select>
            </div>

      </div>

      <div class="row">


          <div class="input-field col s5 offset-s1">
          <input id="lat" type="number" class="validate" placeholder="1.0" step="0.0000000001" min="-90" max="90">
          <label for="lat" data-error="wrong" data-success="right" >Latitud</label>
          actual: ${info.lat}
          </div>

          <div class="input-field col s5 ">
          <input id="lon" type="number" class="validate" placeholder="1.0" step="0.0000000001" min="-90" max="90" >
          <label for="lon" data-error="wrong" data-success="right">Longitud</label>
          actual: ${info.lon}
          </div>


    </div>

    <div class="row">

          <div class="input-field col s10 offset-s1">
            <input id="address" type="text" class="validate" >
            <label for="address" data-error="wrong" data-success="right">Dirección</label>
            actual: ${info.address}
          </div>

    </div>

  <div class="row">

        <div class="col s6 offset-s3 ">
        <label for="district">Distrito de Lima</label>
        <select class="browser-default" name="" id="district">
              <option value="" disabled selected>${info.district}</option>
              <option value="Ancón" > Ancón</option>
              <option value="Ate" > Ate</option>
              <option value="Barranco" > Barranco</option>
              <option value="Breña" > Breña</option>
              <option value="Carabayllo" > Carabayllo</option>
              <option value="Chaclacayo" > Chaclacayo</option>
              <option value="Chorrillos" > Chorrillos</option>
              <option value="Cieneguilla" > Cieneguilla</option>
              <option value="Comas" > Comas</option>
              <option value="El Agustino" > El Agustino</option>
              <option value="Independencia" > Independencia</option>
              <option value="Jesús María" > Jesús María</option>
              <option value="La Molina" > La Molina</option>
              <option value="La Victoria" > La Victoria </option>
              <option value="Lima" > Lima</option>
              <option value="Lince" > Lince</option>
              <option value="Los Olivos" > Los Olivos</option>
              <option value="Lurigancho-Chosica" > Lurigancho-Chosica</option>
              <option value="Lurín" > Lurín</option>
              <option value="Magdalena del Mar" > Magdalena del Mar</option>
              <option value="Miraflores" > Miraflores</option>
              <option value="Pachacámac" > Pachacámac</option>
              <option value="Pucusana" > Pucusana</option>
              <option value="Pueblo Libre" > Pueblo Libre</option>
              <option value="Puente Piedra" > Puente Piedra</option>
              <option value="Punta Hermosa" > Punta Hermosa</option>
              <option value="Punta Negra" > Punta Negra</option>
              <option value="Rímac" > Rímac</option>
              <option value="San Bartolo" > San Bartolo</option>
              <option value="San Borja" > San Borja</option>
              <option value="San Isidro" > San Isidro</option>
              <option value="San Juan de Lurigancho" > San Juan de Lurigancho</option>
              <option value="San Juan de Miraflores" > San Juan de Miraflores</option>
              <option value="San Luis" > San Luis</option>
              <option value="San Martín de Porres" > San Martín de Porres</option>
              <option value="San Miguel" > San Miguel</option>
              <option value="Santa Anita" > Santa Anita</option>
              <option value="Santa María del Mar" > Santa María del Mar</option>
              <option value="Santa Rosa" > Santa Rosa</option>
              <option value="Santiago de Surco" > Santiago de Surco</option>
              <option value="Surquillo" > Surquillo</option>
              <option value="Villa el Salvador" > Villa el Salvador</option>
              <option value="Villa María del Triunfo" > Villa María del Triunfo</option>
              </select>
        </div>

    </div>

<div class="row">

        <div class="input-field col s10 offset-s1">
          <input id="comercial_name" type="text" class="validate" >
          <label for="comercial_name" data-error="wrong" data-success="right">Nombre Comercial</label>
          actual: ${info.comercial_name}
        </div>

  </div>

  <div class="row">

        <div class="input-field col s5 offset-s1">
        <input id="measuring_height" type="number" class="validate" placeholder="1.0" step="0.01" min="0" max="10" >
      <label for="measuring_height" data-error="wrong" data-success="right">Altura en metros</label>
      actual : ${info.measuring_height}
        </div>

        <div class="input-field col s5 ">
        <input id="link_report" type="url" class="validate" >
      <label for="link_report" data-error="wrong" data-success="right">Link Documento (https://)</label>
      <span class="form-actual-value">actual: ${info.link_report}</span>
        </div>

  </div>


  <div class="row">

        <div class="input-field col s10 offset-s1">
        <textarea id="observations" class="materialize-textarea"></textarea>
        <label for="observations" class='active'>Observaciones</label>
        </div>

  </div>

  <div class="row">
  </div>
  <div class="row">
  </div>
  <div class="row">
  </div>
  <div class="row">
  </div>
  <div class="row">
  </div>
  <div class="row">
  </div>

  <div class="row">

                <div class="center-align">
                <button id="submit-btn-install" class="btn waves-effect waves-light modal-trigger" href="#modalInstallation">Instalar
                  <i class="material-icons right">send</i>
                </button>
              </div>
  </div>
  <div class="row">
  </div>
  <div class="row">
  </div>

</div>



`;

const registerBinnacle = `
<div class="row edition-element">
<h4 class="center">Bitácora</h4>
    <div class="row">
          <div class="col s4 offset-s4">
          <label for="qhawax_id">qHAWAX</label>
          <select class="browser-default" id="qhawax_id">
          <option value="" disabled selected> Selecciona un qHAWAX</option>
          </select>
          </div>
          <div class="col s4 offset-s4">
          <label for="register_type">Tipo de Registro</label>
          <select class="browser-default" id="register_type">
          <option value="" disabled selected> Selecciona un tipo</option>
          <option value="Observación">Observación</option>
          <option value="Mantenimiento">Mantenimiento</option>
          <option value="Limpieza de Área">Limpieza de Área</option>
          <option value="Limpieza de qHAWAX">Limpieza de qHAWAX</option>
          </select>
          </div>
    </div>
</div>

<div class="row" id="register-form">
<div class="row">
    <div class="col s6 offset-s3">
        <div class="card-pannel z-depth-5" id="card-register-binnacle">
                <h5 class="center-align" id="binnacle_type"></h5>
                <br></br>
                <div class="container">
                  <div class="row center-align">
                    <div class="col s6">
                      <label for="initDate">Fecha de Inicio</label>
                      <input type="text" class="datepicker center-align" name="initDate">
                    </div>
                    <div class="col s6">
                        <label for="initHour">Hora de Inicio</label>
                        <input type="text" class="timepicker center-align" name="initHour">
                    </div>
                </div>
                </div>
                <div class="container">
                  <div class="row center-align">
                    <div class="col s6">
                        <label for="endDate">Fecha de fin</label>
                        <input type="text" class="datepicker center-align" name="endDate">
                      </div>
                    <div class="col s6">
                      <label for="endHour">Hora de fin</label>
                      <input type="text" class="timepicker center-align" name="endHour">
                    </div>
                  </div>


                  <div class="row">
                  <div class="input-field col s12 ">
                  <textarea id="description" class="materialize-textarea" data-length="100"></textarea>
                  <label for="description" class='active'>Descripción</label>
                  </div>
                  </div>

                  <div class="row">
                  <div class="input-field col s12 ">
                  <textarea id="solution" class="materialize-textarea" data-length="800"></textarea>
                  <label for="solution" class='active'>Solución</label>
                  </div>
                  </div>

                  <div class="row">
                  <div class="center-align">
                  <button id="submit-btn" class="btn waves-effect waves-light" >Registar
                    <i class="material-icons right">send</i>
                  </button>
                </div>
                </div>
        </div>
    </div>
	</div>
</div>
`;

const calibration = `
<div class="row edition-element">
<h4 class="center">Calibración</h4>
</div>
<div class="row">
<div class="col s4 offset-s4">
<label for="selectQhawax">qHAWAX</label>
  <select class="browser-default" name="" id="selectQhawax">
  <option value="" disabled selected> Selecciona un qHAWAX</option>
</select>
</div>
</div>

<h5 class="center">Offsets</h5>
<table class="responsive-table highlight centered table-calibration-2">
            <thead>
              <tr>
                <th align="justify" id="COa">CO</th> 
                <th align="justify" id="H2Sa">H<sub>2</sub>S</th> 
                <th align="justify" id="NOa">NO</th> 
                <th align="justify" id="NO2a">NO<sub>2</sub></th> 
                <th align="justify" id="O3a">O<sub>3</sub></th> 
                <th align="justify" id="SO2a">SO<sub>2</sub></th> 
              </tr>
            </thead>
            <tbody>
        </tbody>
 </table>

 <h5 class="center">Offsets Controlados</h5>
 <table class="responsive-table highlight centered table-calibration-2">
            <thead>
              <tr>
              <th align="justify" id="COb">CO</th> 
              <th align="justify"id="H2Sb">H<sub>2</sub>S</th> 
              <th align="justify" id="NOb">NO</th> 
              <th align="justify"id="NO2b">NO<sub>2</sub></th> 
              <th align="justify"id="O3b">O<sub>3</sub></th> 
              <th align="justify"id="SO2b">SO<sub>2</sub></th> 
              </tr>
            </thead>
            <tbody>
        </tbody>
 </table>

 <h5 class="center">Offsets No Controlados</h5>
 <table class="responsive-table highlight centered table-calibration-2">
            <thead>
              <tr>
              <th align="justify" id="COc">CO</th> 
              <th align="justify"id="H2Sc">H<sub>2</sub>S</th> 
              <th align="justify"id="NOc">NO</th> 
              <th align="justify"id="NO2c">NO<sub>2</sub></th> 
              <th align="justify"id="O3c">O<sub>3</sub></th> 
              <th align="justify"id="SO2c">SO<sub>2</sub></th> 
              </tr>
            </thead>
            <tbody>
        </tbody>
 </table>

 <h5 class="center">Offsets No Controlados PM</h5>
 <table class="responsive-table highlight centered table-calibration-2">
            <thead>
              <tr>
              <th align="justify">PM1</th> 
              <th align="justify">PM10</th> 
              <th align="justify">PM2.5</th> 
              </tr>
            </thead>
            <tbody>
        </tbody>
 </table>
 <div class="row ">
 </div>
 <div class="row center">
 <button class="btn waves-effect waves-light btn-large modal-trigger" href="#modalCalibration" >Guardar
 <i class="material-icons right">send</i>
</button>
</div>

<div id="modalCalibration" class="modal modal-fixed-footer modal-calibration">
<div class="modal-content ">
  <h4 class="center">Instucciones de Guardado:</h4>
  <h4 id="title-calibration-modal">Por favor seleccione un qHAWAX</h4>
  <h6 class="left">GUARDAR Y CONTINUAR: Podrás seguir calibrando el qHAWAX</h6>
  <h6 class="left">TERMINAR CALIBRACIÓN: El qHAWAX regresa a modo cliente, será retirado de ésta lista.</h6>
</div>
<div class="modal-footer">
<button  class="modal-close waves-effect waves-green btn-flat right btn-save disabled" id="end-calibration">TERMINAR CALIBRACIÓN</button>
<button  class="modal-close waves-effect waves-red btn-flat left btn-edit disabled" id="save-offsets">GUARDAR Y CONTINUAR</button>
</div>
</div>
     
`;

const firmware = `
<div class="row center edition-element ">
<h4 class="center">Listado de qHAWAX</h4>
</div>


<table class="responsive-table highlight centered table-calibration-2" >

<thead>
  <tr>
    <th align="justify" id="sort-Id"><i class="small material-icons right order-arrow"></i>ID</th> 
    <th align="justify" id="sort-mode"><i class="small material-icons right order-arrow"></i>Modo</th> 
    <th align="justify" id="sort-progress"><i class="small material-icons right order-arrow"></i>Progreso</th> 
    <th align="justify" id="sort-lastUpdate"><i class="small material-icons right order-arrow"></i>Última Actualización</th> 
    <th align="justify" id="sort-type"><i class="small material-icons right order-arrow"></i>Tipo</th> 
    <th align="justify" id="sort-version"><i class="small material-icons right order-arrow"></i>Versión</th>
    <th align="justify" id="sort-description"><i class="small material-icons right order-arrow"></i>Link</th>
  </tr>
</thead>
<tbody>
</tbody>
<tfoot>
<tr>
<td  align="center" colspan="7" id="wrapper-pagination">
</td>
</tr>
</tfoot>
</table>

<div class="container firmware">
<div class="row">
<p class="col s8">Para registrar una nueva versión de Firmare ingresa aquí:</p>
<div class="col s4 new-firmware">
<button id="btn-new-version" class="btn waves-effect waves-light modal-trigger" href="#modalNewFirmware">Nuevo Firmware</button>
</div>
</div>
</div>

<div class="container firmware">
<br>
<form id="form_update_firmware">
<div class="row">
        <select class="browser-default col s3 offset-s2" id="qhawax_id">
        <option value="" disabled selected>Selecciona el qHAWAX</option>
        </select>
        <select class="browser-default col s3 offset-s2" id="version">
        <option value="" disabled selected>Selecciona la versión</option>
        </select>
</div>
<div class="row">
<div class="file-field input-field col s3 offset-s2">
  <div class="btn">
    <span>Archivo .bin</span>
    <input id="firmware_file" type="file">
  </div>
  <div class="file-path-wrapper">
    <input class="file-path validate" type="text">
    <span id="loading_file"></span>
  </div>

</div>
<div class="col s3 offset-s2">
<button id="btn-save" class="btn waves-effect waves-light disabled">Actualizar</button>
</div>
</div>
</form>
</div>


<div id="modalNewFirmware" class="modal">
<div class="modal-content center">
  <h4>Nueva versión de firmware</h4>
  <div class="row">
  <form class="col s8 offset-s2 create">
   
    <div class="row">
    <select class="browser-default col s6" id="type">
      <option value="" disabled selected>Selecciona el tipo</option>
      <option value="STATIC">STATIC</option>
      <option value="AEREAL">AEREAL</option>
    </select>

    <div class="col s6">
    Ejemplo: V01.1
          <div class="input-field inline">
            <input id="v_inline" type="text" class="validate">
            <label for="v_inline">Versión:</label>
            <span class="helper-text" data-error="obligatorio" data-success="OK!">Campo necesario</span>
          </div>
        </div>
    </div>

    </div>
    
    <div class="row">
    <div class="input-field col s8 offset-s2">
      <textarea id="description" class="materialize-textarea"></textarea>
      <label for="description">Link a la versión en GitHub:</label>
    </div>
  </div>

   


    <div class="row">
      <div class="center-align">
      <button id="submit-btn-create" class="btn waves-effect waves-light disabled" >Crear
        <i class="material-icons right">send</i>
      </button>
    </div>
  </div>
    </div>
  </form>
</div>
</div>
</div>

`;

const configuration = `
<div id="change-password">
    <div class="row">
      <form class="col s8 offset-s2  login">
      <h5 class="center">Cambiar contraseña</h5>
        <div class="row">
          <div class="input-field col s10 offset-s1">
          <input disabled  id="user-disabled" type="text" class="validate center">
          </div>
        </div>
        <div class="row">
          <div class="input-field col s10 offset-s1">
            <input id="old-password" type="password" class="validate counter hideop" data-length="10" autocomplete="off">
            <span class="icon-input icon-key"></span>
            <label for="old-password">Antigua Contraseña</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s10 offset-s1">
            <input id="new-password" type="password" class="validate counter hideop" data-length="10" autocomplete="off">
            <span class="icon-input icon-key"></span>
            <label for="new-password">Nueva Contraseña (* mínimo 6 caracteres)</label>
          </div>
        </div>
        <div class="row">
          <div class="center-align">
          <button id="submit-btn-change" class="btn waves-effect waves-light disabled" >Submit
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
        </div>
      </form>
    </div>
    </div>
</div>

<div>

<div class="row" id="create-new-user">
  <form class="col s8 offset-s2  login">
  <h5 class="center">Crear Nuevo Usuario</h5>
  <div class="row"></div>
  <div class="row">
  <div class="col s6 offset-s3">
  <label for="company_id_user">Compañía</label>
        <select class="browser-default" name="" id="company_id_user">
        <option value="" disabled selected> Selecciona una Compañia</option>
        </select>
        </div></div>
    <div class="row">
      <div class="input-field col s10 offset-s1">
        <input id="email_new" type="email" class="validate create">
        <label for="email_new" data-error="wrong" data-success="right" id="label-domain-user"></label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s10 offset-s1">
        <input id="new_pass_user" type="password" class="validate create hideop" autocomplete="off">
        <span class="icon-input icon-key"></span>
        <label for="new_pass_user">Nueva Contraseña (* mínimo 6 caracteres)</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s10 offset-s1">
        <input id="new_pass_user_repeat" type="password" class="validate create hideop" autocomplete="off">
        <span class="icon-input icon-key"></span>
        <label for="new_pass_user_repeat">Repetir la contraseña</label>
      </div>
    </div>
    <div class="row">
      <div class="center-align">
      <button id="submit-btn-new-user" class="btn waves-effect waves-light disabled" >Submit
        <i class="material-icons right">send</i>
      </button>
    </div>
  </div>
    </div>
  </form>
</div>
</div>

<ul id="menu-side-config">
<li><a href="javascript:;" class="newpass">Cambiar Contraseña</a>
<li><a href="javascript:;" class="newuser">Crear Nuevo Usuario</a>
</ul>
`;

const landbar = `
<div class="navbar-fixed">
<nav id="nav-menu-bar" class="transparent" style="padding: 0px 10px;">
<div id="nav-wrapper-menu-bar" class="nav-wrapper">
    <a href="https://www.qairadrones.com" class="brand-logo center"id="brand-logo-menu-bar">
      <img src="/img/fondecyt.png" alt="logo fondecyt"id="logo-menu-fondecyt"style="max-width: 4.5em; max-height: 3em; position:relative; left:80px"/>
    </a>
    <a href="https://www.qairadrones.com" class="brand-logo center"id="brand-logo-menu-bar">
      <img src="/img/logopupc.png" alt="logo pucp"id="logo-menu-pucp"style="max-width: 4.5em; max-height: 3em; position:relative; right:80px"/>
    </a>  
</div>

</nav>
</div>
`;


const landpage = `
<div id="background"></div>
<div class="wrapper">
  <div class="cards_wrap">
    <div class="card_item hoverable z-depth-4" id="historical_interpolation">
      <div class="card_inner">
        <div class="card_top">
          <img src="img/historical-min.png" alt="historical" style="width:auto ; height:180px;" />
        </div>
        <div class="card_bottom">
          <div class="card_category">
            Interpolación Histórica
          </div>
          <div class="card_info">
            <p class="title">Description</p>
            <p>
            The last 6, 12 or 24 hours of our air quality spatial model.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="card_item hoverable z-depth-4" id="future_interpolation">
      <div class="card_inner">
        <div class="card_top">
          <img src="img/real-time-min.png" alt="real_time" style="width:auto ; height:180px;" />
        </div>
        <div class="card_bottom">
          <div class="card_category">
            Interpolación Futura
          </div>
          <div class="card_info">
            <p class="title">Description</p>
            <p>
            We show air quality data of next 6 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="card_item hoverable z-depth-4" id="forecasting">
      <div class="card_inner">
        <div class="card_top">
          <img src="img/forecasting-min.png" alt="forecasting" style="width:auto ; height:180px;"/>
        </div>
        <div class="card_bottom">
          <div class="card_category">
            Predicción Temporal
          </div>
          <div class="card_info">
            <p class="title">Description</p>
            <p>
            We show air quality data about the next 6 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

const landpage2 = `
<div id="background"></div>
<div class="wrapper">
  <div class="cards_wrap">
    <div class="card_item hoverable z-depth-4" id="historical">
      <div class="card_inner">
        <div class="card_top">
          <img src="img/spatial_prediction_historical.png" alt="historical" style="width:auto ; height:180px;" />
        </div>
        <div class="card_bottom">
          <div class="card_category">
            Historical Spatial Prediction
          </div>
          <div class="card_info">
            <p class="title">Descripcion</p>
            <p>
            The last 12, 24 or 48 hours of our air quality spatial model.
            </p>
          </div>
          <div class="card_creator">
            qAIRa
          </div>
        </div>
      </div>
    </div>
    <div class="card_item hoverable z-depth-4" id="real_time">
      <div class="card_inner">
        <div class="card_top">
          <img src="img/spatial_prediction_real_time.png" alt="real_time" style="width:auto ; height:180px;" />
        </div>
        <div class="card_bottom">
          <div class="card_category">
            Real time Spatial Prediction
          </div>
          <div class="card_info">
            <p class="title">Descripcion</p>
            <p>
            We run our script every period of time to show you air quality in different positions
            </p>
          </div>
          <div class="card_creator">
            qAIRa
          </div>
        </div>
      </div>
    </div>
    <div class="card_item hoverable z-depth-4" id="forecasting">
      <div class="card_inner">
        <div class="card_top">
          <img src="img/forecasting.png" alt="forecasting" style="width:auto ; height:180px;"/>
        </div>
        <div class="card_bottom">
          <div class="card_category">
            Temporal Prediction
          </div>
          <div class="card_info">
            <p class="title">Description</p>
            <p>
            Forecasting - Temporal Series
            </p>
          </div>
          <div class="card_creator">
            qAIRa
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

export { viewMap,
  infowindow,
  pannelInca,
  pannelMeteo,
  pannelRealTime,
  pannelGraphics,
  dwnGraphView,
  binnacle,
  viewBoard,
  chartView,
  viewDownload,
  viewLogin,
  viewqhawaxList,
  viewCompanys,
  qhawaxInstallList,
  qhawaxInstall,
  qhawaxInstallEdit,
  registerBinnacle,
  calibration,
  firmware,
  qhawaxInstallEditForm,
  configuration,
  viewSearchingPanelHistorical,
  viewSearchingPanelForecasting,
  viewSearchingPanelFuture,
  landbar,
  landpage,
  viewPointsManagement
}