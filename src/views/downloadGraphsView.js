import {navbarAdmin } from '../lib/navBarAdmin.js';
import { dwnGraphView } from '../lib/HtmlComponents.js';
import { requestAllQhawaxByCompany, requestWeeklyData} from '../requests/get.js';
import {addZero} from '../lib/navMenus.js';
import { configuration, barColor} from '../lib/graphAssets.js';


const requestSelectQhawax = async (element,company) => {
    const qhawax_list = await requestAllQhawaxByCompany(company);
    const addOptions = element.querySelector(`#qhawax_id`);
    qhawax_list.forEach(item=>{
        const option = document.createElement('option');
            option.setAttribute('value', item.qhawax_id);
            option.innerText = `${item.name}: ${item.comercial_name}`;
			addOptions.appendChild(option);
    })

};


let data = {
    name:null,
    qhawax_id:null,
    init_week:null,
    init_year:null,
    end_year:null,
    end_week:null
}

const createTraces = async (data, charts) =>{
    let traces = [];
    const data_charts = await requestWeeklyData(data);

    let yAxis = {
         CO : {value:[],name: 'Promedio Diario de CO (ppb) de '},
         CO_ug_m3 : {value:[],name: 'Promedio Diario de CO (ug/m3) de '},
         H2S : {value:[],name: 'Promedio Diario de H2S (ppb) de '},
         H2S_ug_m3 : {value:[],name: 'Promedio Diario de H2S (ug/m3) de '},
         NO2 : {value:[],name: 'Promedio Diario de NO2 (ppb) de '},
         NO2_ug_m3 : {value:[],name: 'Promedio Diario de NO2 (ug/m3) de '},
         O3 : {value:[],name: 'Promedio Diario de O3 (ppb) de '},
         O3_ug_m3 : {value:[],name: 'Promedio Diario de O3 (ug/m3) de '},
         SO2 : {value:[],name: 'Promedio Diario de SO2 (ppb) de '},
         SO2_ug_m3 : {value:[],name: 'Promedio Diario de SO2 (ug/m3) de '},
		 PM10 : {value:[],name: 'Promedio Diario de PM10 (ug/m3) de '},
         PM25 : {value:[],name: 'Promedio Diario de PM2,5 (ug/m3) de '},
        
	}
	 let x = [];
    data_charts.forEach(d => {
	
        let index = 0;
		Object.entries(yAxis).forEach(([key, value]) => {
			yAxis[key].value.push(d[key])

			traces.push({
				trace: {
					y:yAxis[key].value,
					x: x,
					name: yAxis[key].name,
                    type: 'bar',
                    marker:{
                        color:barColor
                        }
				},
				chart: charts[index],
				layout: { title: `${yAxis[key].name + data.name}`, showlegend: false },
			},)
            index++;
        });
		x.push(new Date(Date.parse(d.timestamp_zone)).toUTCString().slice(4,12));

	
    });
    traces.forEach(trace => {
        Plotly.newPlot(trace.chart, [trace.trace], trace.layout, configuration);
    });
}
const viewDwnGraphs = (company) => {
    const graphElem = document.createElement('div');
    navbarAdmin(graphElem, dwnGraphView, company);
    requestSelectQhawax(graphElem,company)

    const pickers = graphElem.querySelectorAll('.selection');
    const graphBtn = graphElem.querySelector('#graphBtn');
    const charts = graphElem.querySelectorAll('.chart');
    Array.from(pickers).forEach(p=>{
        p.addEventListener('change',e=>{

            const initial = pickers[1].value.split('-');
            const final = pickers[2].value.split('-');
            const sel=graphElem.querySelector('#qhawax_id');
            data.name=sel.options[sel.selectedIndex].text
            data.qhawax_id=pickers[0].value;
            data.init_week=initial[1].slice(1);
            data.init_year=initial[0]
            data.end_week=final[1].slice(1);
            data.end_year=final[0];

            if (data.init_year>data.end_year) {
                M.toast({
					html: 'El año inicial no puede ser mayor que el final.',
					displayLength: 3000,
                });
                graphBtn.classList.add('disabled');
            }else if (data.init_year===data.end_year&&data.end_week<data.init_week) {
                M.toast({
					html: 'En el mismo año, la semana final debe ser mayor que la inicial.',
					displayLength: 3000,
                });
                graphBtn.classList.add('disabled');
            }else if (data.qhawax_id==="") {
                M.toast({
					html: 'Seleccione un qHAWAX, por favor.',
					displayLength: 3000,
                }); 
                graphBtn.classList.add('disabled');
            } else {
                graphBtn.classList.remove('disabled');
            }
        })
    })
    
    graphBtn.addEventListener('click', e=>{
        createTraces(data,charts)
    })

    return graphElem;
};

export {viewDwnGraphs};

