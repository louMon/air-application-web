import { navbarAdmin } from '../lib/navBarAdmin.js';
import { calibration } from '../lib/HtmlComponents.js';
import { requestQhawaxByMode, urlOffsets, requestAllQhawaxByCompany} from '../requests/get.js';
import { saveOffsets, requestEndCalibration } from '../requests/post.js';


const offsetsValues = 
{"product_id": "", 
"description":"Calibrando offset", 
    "offsets": 
        {
            "CO": {"AE":Number, "AEt":Number,"WE":Number,"WEt":Number,"algorithm":Number,"sensitivity":Number,"sensitivity_2":Number},
            "H2S":{"AE":Number, "AEt":Number,"WE":Number,"WEt":Number,"algorithm":Number,"sensitivity":Number,"sensitivity_2":Number}, 
            "NO":{"AE":Number, "AEt":Number,"WE":Number,"WEt":Number,"algorithm":Number,"sensitivity":Number,"sensitivity_2":Number}, 
            "NO2":{"AE":Number, "AEt":Number,"WE":Number,"WEt":Number,"algorithm":Number,"sensitivity":Number,"sensitivity_2":Number},	
            "O3":{"AE":Number, "AEt":Number,"WE":Number,"WEt":Number,"algorithm":Number,"sensitivity":Number,"sensitivity_2":Number},	
            "SO2":{"AE":Number, "AEt":Number,"WE":Number,"WEt":Number,"algorithm":Number,"sensitivity":Number,"sensitivity_2":Number}
        },
 "person_in_charge": sessionStorage.getItem('username')
    };

const offsetsContrValues = 
{"product_id": "",  
    "controlled_offsets": 
        { 
            "CO":{"C0":Number,"C1":Number,"C2":Number}, 
            "H2S":{"C0":Number,"C1":Number,"C2":Number}, 
            "NO":{"C0":Number,"C1":Number,"C2":Number},
            "NO2":{"C0":Number,"C1":Number,"C2":Number}, 
            "O3":{"C0":Number,"C1":Number,"C2":Number}, 
            "SO2":{"C0":Number,"C1":Number,"C2":Number}
        },
        "person_in_charge": sessionStorage.getItem('username')
    };

const offsetsNcValues = 
{"product_id": "", 
    "non_controlled_offsets": 
        {
            "CO":{"NC0":Number,"NC1":Number}, 
            "H2S":{"NC0":Number,"NC1":Number},
            "NO":{"NC0":Number,"NC1":Number}, 
            "NO2":{"NC0":Number,"NC1":Number}, 
            "O3":{"NC0":Number,"NC1":Number}, 
            "SO2":{"NC0":Number,"NC1":Number}
        },
        "person_in_charge": sessionStorage.getItem('username')
    };   

const offsetsNcValuesPM = 
{"product_id": "", 
    "opc_variable": 
        {
            "PM1":{"A_OPC":Number,"B_OPC":Number}, 
            "PM10":{"A_OPC":Number,"B_OPC":Number},
            "PM25":{"A_OPC":Number,"B_OPC":Number}, 
        },
        "person_in_charge": sessionStorage.getItem('username')
    };  


const offsetsLabels = (table) => {
    switch (table) {
        case 0: return ['AE', 'AEt', 'algorithm', 'WE', 'WEt', 'sensitivity', 'sensitivity_2'];
        case 1: return ['C0', 'C1', 'C2'];
        case 2: return ['NC0', 'NC1'];
        case 3: return ['A_OPC','B_OPC'];
    };
};

const request = async (element, company) => {
    const qhawax_list = await requestQhawaxByMode('Calibracion');
    const all_qhawax = await requestAllQhawaxByCompany(company);
    all_qhawax.forEach(qhawax => {
    const qHAWAX = qhawax_list.find(c=>c.id===qhawax.qhawax_id);  
    const addOptions = element.querySelector('#selectQhawax');
      const option = document.createElement('option');
      option.setAttribute('value', qhawax.name);
      option.innerText =	qhawax.name + ': ' + qhawax.comercial_name;
     qHAWAX? addOptions.appendChild(option):'';
    });
};




const requestOffsets = async (element, ID, table) => {  
    let idCounter = 0;
    const response = await fetch(urlOffsets(ID,table));
    const offsets_list = await response.json();
    const table_body = element.querySelectorAll('tbody')[table];
    table_body.querySelectorAll('tr').forEach(n => n.remove());

    offsetsLabels(table).forEach(o=>{
        const row_table = document.createElement('tr');
        row_table.classList.add(`${o}`)
        table_body.appendChild(row_table);
    })
  
    Object.entries(offsets_list).forEach(([key1,q ])=>{
  
    Object.entries(q).forEach(([key,q ])=>{
       idCounter++;
        
        const row_data_element = element.getElementsByClassName(`${key}`)

        const cell_element= document.createElement('td');
        cell_element.setAttribute('value',key)
        row_data_element[0].appendChild(cell_element);

        const input_element= document.createElement('input');
        input_element.setAttribute('type', 'number');
        input_element.setAttribute('id', `${key}-${idCounter}-${key1}`);
        input_element.classList.add('center');
        input_element.value=q;

        const label_element = document.createElement('label');
        label_element.classList.add('center');
        label_element.setAttribute('for',`${key}`);
        label_element.setAttribute('class',`label-chart`);
        label_element.textContent=key;

        cell_element.appendChild(label_element);
        cell_element.appendChild(input_element);
    })
    Array.from(element.getElementsByTagName('input')).forEach(i=>{

        i.addEventListener('input', (e) =>{
            e.preventDefault();
            

            offsetsValues.offsets.CO.AE= document.getElementById(`AE-1-CO`).value;
            offsetsValues.offsets.CO.AEt= document.getElementById(`AEt-2-CO`).value;
            offsetsValues.offsets.CO.WE= document.getElementById(`WE-3-CO`).value;
            offsetsValues.offsets.CO.WEt= document.getElementById(`WEt-4-CO`).value;
            offsetsValues.offsets.CO.algorithm=document.getElementById(`algorithm-5-CO`).value;
            offsetsValues.offsets.CO.sensitivity= document.getElementById(`sensitivity-6-CO`).value;
            offsetsValues.offsets.CO.sensitivity_2= document.getElementById(`sensitivity_2-7-CO`).value;

            offsetsValues.offsets.H2S.AE= document.getElementById(`AE-8-H2S`).value;
            offsetsValues.offsets.H2S.AEt= document.getElementById(`AEt-9-H2S`).value;
            offsetsValues.offsets.H2S.WE= document.getElementById(`WE-10-H2S`).value;
            offsetsValues.offsets.H2S.WEt= document.getElementById(`WEt-11-H2S`).value;
            offsetsValues.offsets.H2S.algorithm =document.getElementById(`algorithm-12-H2S`).value;
            offsetsValues.offsets.H2S.sensitivity= document.getElementById(`sensitivity-13-H2S`).value;
            offsetsValues.offsets.H2S.sensitivity_2= document.getElementById(`sensitivity_2-14-H2S`).value;

            offsetsValues.offsets.NO.AE= document.getElementById(`AE-15-NO`).value;
            offsetsValues.offsets.NO.AEt= document.getElementById(`AEt-16-NO`).value;
            offsetsValues.offsets.NO.WE= document.getElementById(`WE-17-NO`).value;
            offsetsValues.offsets.NO.WEt= document.getElementById(`WEt-18-NO`).value;
            offsetsValues.offsets.NO.algorithm= document.getElementById(`algorithm-19-NO`).value;
            offsetsValues.offsets.NO.sensitivity= document.getElementById(`sensitivity-20-NO`).value;
            offsetsValues.offsets.NO.sensitivity_2= document.getElementById(`sensitivity_2-21-NO`).value;

            offsetsValues.offsets.NO2.AE= document.getElementById(`AE-22-NO2`).value;
            offsetsValues.offsets.NO2.AEt= document.getElementById(`AEt-23-NO2`).value;
            offsetsValues.offsets.NO2.WE= document.getElementById(`WE-24-NO2`).value;
            offsetsValues.offsets.NO2.WEt= document.getElementById(`WEt-25-NO2`).value;
            offsetsValues.offsets.NO2.algorithm= document.getElementById(`algorithm-26-NO2`).value;
            offsetsValues.offsets.NO2.sensitivity= document.getElementById(`sensitivity-27-NO2`).value;
            offsetsValues.offsets.NO2.sensitivity_2= document.getElementById(`sensitivity_2-28-NO2`).value;

            offsetsValues.offsets.O3.AE= document.getElementById(`AE-29-O3`).value;
            offsetsValues.offsets.O3.AEt= document.getElementById(`AEt-30-O3`).value;
            offsetsValues.offsets.O3.WE= document.getElementById(`WE-31-O3`).value;
            offsetsValues.offsets.O3.WEt= document.getElementById(`WEt-32-O3`).value;
            offsetsValues.offsets.O3.algorithm= document.getElementById(`algorithm-33-O3`).value;
            offsetsValues.offsets.O3.sensitivity= document.getElementById(`sensitivity-34-O3`).value;
            offsetsValues.offsets.O3.sensitivity_2= document.getElementById(`sensitivity_2-35-O3`).value;

            offsetsValues.offsets.SO2.AE= document.getElementById(`AE-36-SO2`).value;
            offsetsValues.offsets.SO2.AEt= document.getElementById(`AEt-37-SO2`).value;
            offsetsValues.offsets.SO2.WE= document.getElementById(`WE-38-SO2`).value;
            offsetsValues.offsets.SO2.WEt= document.getElementById(`WEt-39-SO2`).value;
            offsetsValues.offsets.SO2.algorithm= document.getElementById(`algorithm-40-SO2`).value;
            offsetsValues.offsets.SO2.sensitivity= document.getElementById(`sensitivity-41-SO2`).value;
            offsetsValues.offsets.SO2.sensitivity_2= document.getElementById(`sensitivity_2-42-SO2`).value;

            offsetsContrValues.controlled_offsets.CO.C0= document.getElementById(`C0-1-CO`).value;
            offsetsContrValues.controlled_offsets.CO.C1= document.getElementById(`C1-2-CO`).value;
            offsetsContrValues.controlled_offsets.CO.C2= document.getElementById(`C2-3-CO`).value;

            offsetsContrValues.controlled_offsets.H2S.C0= document.getElementById(`C0-4-H2S`).value;
            offsetsContrValues.controlled_offsets.H2S.C1= document.getElementById(`C1-5-H2S`).value;
            offsetsContrValues.controlled_offsets.H2S.C2= document.getElementById(`C2-6-H2S`).value;

            offsetsContrValues.controlled_offsets.NO.C0= document.getElementById(`C0-7-NO`).value;
            offsetsContrValues.controlled_offsets.NO.C1= document.getElementById(`C1-8-NO`).value;
            offsetsContrValues.controlled_offsets.NO.C2= document.getElementById(`C2-9-NO`).value;

            offsetsContrValues.controlled_offsets.NO2.C0= document.getElementById(`C0-10-NO2`).value;
            offsetsContrValues.controlled_offsets.NO2.C1= document.getElementById(`C1-11-NO2`).value;
            offsetsContrValues.controlled_offsets.NO2.C2= document.getElementById(`C2-12-NO2`).value;

            offsetsContrValues.controlled_offsets.O3.C0= document.getElementById(`C0-13-O3`).value;
            offsetsContrValues.controlled_offsets.O3.C1= document.getElementById(`C1-14-O3`).value;
            offsetsContrValues.controlled_offsets.O3.C2= document.getElementById(`C2-15-O3`).value;

            offsetsContrValues.controlled_offsets.SO2.C0= document.getElementById(`C0-16-SO2`).value;
            offsetsContrValues.controlled_offsets.SO2.C1= document.getElementById(`C1-17-SO2`).value;
            offsetsContrValues.controlled_offsets.SO2.C2= document.getElementById(`C2-18-SO2`).value;

            offsetsNcValues.non_controlled_offsets.CO.NC0 = document.getElementById(`NC0-1-CO`).value;
            offsetsNcValues.non_controlled_offsets.CO.NC1 = document.getElementById(`NC1-2-CO`).value;

            offsetsNcValues.non_controlled_offsets.H2S.NC0 = document.getElementById(`NC0-3-H2S`).value;
            offsetsNcValues.non_controlled_offsets.H2S.NC1 = document.getElementById(`NC1-4-H2S`).value;

            offsetsNcValues.non_controlled_offsets.NO.NC0 = document.getElementById(`NC0-5-NO`).value;
            offsetsNcValues.non_controlled_offsets.NO.NC1 = document.getElementById(`NC1-6-NO`).value;

            offsetsNcValues.non_controlled_offsets.NO2.NC0 = document.getElementById(`NC0-7-NO2`).value;
            offsetsNcValues.non_controlled_offsets.NO2.NC1 = document.getElementById(`NC1-8-NO2`).value;

            offsetsNcValues.non_controlled_offsets.O3.NC0 = document.getElementById(`NC0-9-O3`).value;
            offsetsNcValues.non_controlled_offsets.O3.NC1 = document.getElementById(`NC1-10-O3`).value;

            offsetsNcValues.non_controlled_offsets.SO2.NC0 = document.getElementById(`NC0-11-SO2`).value;
            offsetsNcValues.non_controlled_offsets.SO2.NC1 = document.getElementById(`NC1-12-SO2`).value;

            offsetsNcValuesPM.opc_variable.PM1.A_OPC = document.getElementById(`A_OPC-1-PM1`).value;
            offsetsNcValuesPM.opc_variable.PM1.B_OPC = document.getElementById(`B_OPC-2-PM1`).value;

            offsetsNcValuesPM.opc_variable.PM10.A_OPC = document.getElementById(`A_OPC-3-PM10`).value;
            offsetsNcValuesPM.opc_variable.PM10.B_OPC = document.getElementById(`B_OPC-4-PM10`).value;

            offsetsNcValuesPM.opc_variable.PM25.A_OPC = document.getElementById(`A_OPC-5-PM25`).value;
            offsetsNcValuesPM.opc_variable.PM25.B_OPC = document.getElementById(`B_OPC-6-PM25`).value;
            
            })
        })
      
    });

};



const viewCalibration = (company) => {
    let selectedQhawax = '';
    const calibrationElem = document.createElement('div');
    calibrationElem.classList.add('container');
    navbarAdmin(calibrationElem, calibration, company)
    request(calibrationElem, company)
    
    const modalTitle = calibrationElem.querySelector('#title-calibration-modal');
    const selection = calibrationElem.querySelectorAll('select');
    const saveOffsetsBtn = calibrationElem.querySelector('#save-offsets');
    const endCalibrationBtn = calibrationElem.querySelector('#end-calibration');
    selection[0].onchange = (e) => {	
        e.preventDefault()
        
        selectedQhawax = selection[0].value.toString();
        offsetsValues.product_id = selectedQhawax ;
        offsetsContrValues.product_id = selectedQhawax ;
        offsetsNcValues.product_id = selectedQhawax ;
        offsetsNcValuesPM.product_id = selectedQhawax ;
  
        if (selectedQhawax==='qH001'|selectedQhawax==='qH002'||selectedQhawax==='qH003') {
            calibrationElem.querySelector('#COa').innerText='Gas1'
            calibrationElem.querySelector('#COb').innerText='Gas1'
            calibrationElem.querySelector('#COc').innerText='Gas1'
            calibrationElem.querySelector('#H2Sa').innerText='Gas2'
            calibrationElem.querySelector('#H2Sb').innerText='Gas2'
            calibrationElem.querySelector('#H2Sc').innerText='Gas2'
            calibrationElem.querySelector('#NO2a').innerText='Gas3'
            calibrationElem.querySelector('#NO2b').innerText='Gas3'
            calibrationElem.querySelector('#NO2c').innerText='Gas3'
            calibrationElem.querySelector('#O3a').innerText='Gas4'
            calibrationElem.querySelector('#O3b').innerText='Gas4'
            calibrationElem.querySelector('#O3c').innerText='Gas4'
            calibrationElem.querySelector('#SO2a').innerText='Gas5'
            calibrationElem.querySelector('#SO2b').innerText='Gas5'
            calibrationElem.querySelector('#SO2c').innerText='Gas5'
            calibrationElem.querySelector('#NOa').innerText='Gas6'
            calibrationElem.querySelector('#NOb').innerText='Gas6'
            calibrationElem.querySelector('#NOc').innerText='Gas6'
        }else{
            calibrationElem.querySelector('#COa').innerText='CO'
            calibrationElem.querySelector('#COb').innerText='CO'
            calibrationElem.querySelector('#COc').innerText='CO'
            calibrationElem.querySelector('#H2Sa').innerText='H2S'
            calibrationElem.querySelector('#H2Sb').innerText='H2S'
            calibrationElem.querySelector('#H2Sc').innerText='H2S'
            calibrationElem.querySelector('#NO2a').innerText='NO2'
            calibrationElem.querySelector('#NO2b').innerText='NO2'
            calibrationElem.querySelector('#NO2c').innerText='NO2'
            calibrationElem.querySelector('#O3a').innerText='O3'
            calibrationElem.querySelector('#O3b').innerText='O3'
            calibrationElem.querySelector('#O3c').innerText='O3'
            calibrationElem.querySelector('#SO2a').innerText='SO2'
            calibrationElem.querySelector('#SO2b').innerText='SO2'
            calibrationElem.querySelector('#SO2c').innerText='SO2'
            calibrationElem.querySelector('#NOa').innerText='NO'
            calibrationElem.querySelector('#NOb').innerText='NO'
            calibrationElem.querySelector('#NOc').innerText='NO'
        }
        
        for (let i = 0; i < 4; i++) {
            requestOffsets(calibrationElem, selectedQhawax, i);               
        }
        selectedQhawax ? saveOffsetsBtn.classList.remove('disabled'):saveOffsetsBtn.classList.add('disabled');
        selectedQhawax ? endCalibrationBtn.classList.remove('disabled'):endCalibrationBtn.classList.add('disabled');
        
        modalTitle.innerText = `Módulo seleccionado: ${selectedQhawax}`;
    };

  
    saveOffsetsBtn.addEventListener('click',(e)=> {
        e.preventDefault()
        saveOffsets(offsetsValues, offsetsContrValues, offsetsNcValues, offsetsNcValuesPM);
        M.toast({
            html:
                `Los offsets del qHAWAX ${selectedQhawax} han sido actualizados`,
            displayLength: 4000,
        });
    })

    endCalibrationBtn.addEventListener('click',(e)=> {
        e.preventDefault()
        const data = {qhawax_name:`${selectedQhawax}`,person_in_charge:sessionStorage.getItem('username')}
        saveOffsets(offsetsValues, offsetsContrValues, offsetsNcValues,offsetsNcValuesPM);
        requestEndCalibration(data);
        M.toast({
            html:
                `Fin de calibración del qHAWAX ${selectedQhawax} `,
            displayLength: 2000,
        });
        setTimeout(()=>window.location.reload(), 2000)
    })
    
    
    return calibrationElem;
};

export {viewCalibration};