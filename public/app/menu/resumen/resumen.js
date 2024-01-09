import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {getDatabase,ref,set,child,update,remove,push,get,} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import {getAuth,onAuthStateChanged,signOut,} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyDm1H0XFl2gXIoM9vSeHfxz8sTx2baaFFQ",
  authDomain: "creditovehicularapp.firebaseapp.com",
  databaseURL: "https://creditovehicularapp-default-rtdb.firebaseio.com",
  projectId: "creditovehicularapp",
  storageBucket: "creditovehicularapp.appspot.com",
  messagingSenderId: "697634516145",
  appId: "1:697634516145:web:1453e1dc7fa3a37b9ac690",
  measurementId: "G-XP533G7VP2",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

var boxTIR = document.getElementById("boxTIR");
var boxVAN = document.getElementById("boxVAN");

//Para Calcular Cuota
let DPR = 0;
let DI = 0;
let DP = 0;
let auxcuota = 0;

let numero = 0;
let factor = 0;
let saldoInicial = 0;
let interes = 0;
let amortizacion = 0;
let cuota = 0;
let saldoFinal = 0;
let seguroDesgravamen = 0;
let seguroRiesgo = 0;
let portes =0;
let flujo = 0;
let flujoTEM = 0;
let valorActual = 0;
let auxTIR = [];
let aux2 = 0;
let cons = 0;
let consaldoinicial = 0;
let DataVehicular = {}
let getdata={
    datavehicular:{},
    TIR: 0.0,
    VAN: 0.0
};

let dni = 0;
let fechainicio = ""
let importe = 0;
let marca = "";
let modelo = "";
let estadocivil ="";
document.addEventListener("DOMContentLoaded",()=>{
    const datavehicular =  JSON.parse(localStorage.getItem("datavehicular"));
    DataVehicular = datavehicular;
    getdata.datavehicular = DataVehicular;
    DataVehicular.FechaPrestamo = DataVehicular.FechaPrestamo;
    dni = parseInt(DataVehicular.Dni);
    fechainicio = DataVehicular.FechaPrestamo;
    importe = parseFloat(DataVehicular.Prestamo);
    marca = DataVehicular.data.brand;
    modelo = DataVehicular.data.optionModel;
    estadocivil = DataVehicular.Estadocivil;
    cronograma(DataVehicular);
})

//Cronograma
function cronograma(DataVehicular) {
    const table = document.querySelector('.table-resumen');
    let factor_interes = parseFloat(DataVehicular.interes.replace("%", ""));
    DPR = DataVehicular.Prestamo
    DI = parseFloat(DataVehicular.interes.replace("%",""));
    DP = parseInt(DataVehicular.Plazo);
    auxcuota = Math.pow((1 + (DI/100)), DP);
    let aux1 = 0

    // Función para agregar una fila a la tabla
    function agregarFila(numero, fecha, factor, saldoInicial, interes, amortizacion, cuota, saldoFinal, 
        seguroDesgravamen, seguroRiesgo, portes, flujo, flujoTEM, valorActual) {
        const row = table.insertRow(-1);

        // Formatear la fecha como "yyyy-mm-dd"
        const fechaFormateada = fecha.toISOString().split('T')[0];

        const cells = [numero, fechaFormateada, factor, saldoInicial, interes, amortizacion, cuota, saldoFinal, 
        seguroDesgravamen, seguroRiesgo, portes, flujo, flujoTEM, valorActual];

        cells.forEach((value, index) => {
            const cell = row.insertCell(index);
            cell.textContent = value;
        });
    }

    // Clonar la fecha original para evitar modificarla directamente
    let fechaIteracion = new Date(DataVehicular.FechaPrestamo);

    for (let i = 0; i <= DataVehicular.NCuota; i++) {
        numero = i;

        //CON PERIODO DE GRACIAS TOTAL
        if (DataVehicular.periododegraciastotal > numero) {
            for (let t = 0; t <= DataVehicular.periododegraciastotal; t++) {
                // numero = t;
                if (numero !==0) {
                    factor = parseFloat(1/(Math.pow(1 +  factor_interes, numero))).toFixed(4);
                    saldoInicial = saldoFinal ;
                    interes = ((saldoInicial * DI)/100).toFixed(2);;
                    cuota = 0;
                    amortizacion = 0;
                    seguroDesgravamen = (saldoInicial*(DataVehicular.segurodesgravamen/100)).toFixed(3);
                    seguroRiesgo = DataVehicular.segurovehiculomensual;
                    portes = DataVehicular.portes;
                }
                if(numero === 0){
                    saldoFinal = DataVehicular.Prestamo;
                    flujo = saldoFinal;
                    flujoTEM = saldoFinal;
                    valorActual = saldoFinal;
                }else{
                    saldoFinal = (saldoInicial - parseFloat(amortizacion)).toFixed(1); // FORMULA PARA P.G.TOTAL
                    flujo = (-cuota - seguroDesgravamen  - seguroRiesgo - portes).toFixed(2);
                    flujoTEM = (-interes-amortizacion).toFixed(2);
                    valorActual = (flujo / Math.pow((1 + DI/100),numero)).toFixed(2);
                }
                // agregarFila(numero, fechaIteracion, factor, saldoInicial, interes, amortizacion, cuota, saldoFinal, 
                // seguroDesgravamen, seguroRiesgo, portes, flujo, flujoTEM, valorActual);

                // Sumar 30 días a la fecha de iteración
                fechaIteracion.setDate(fechaIteracion.getDate() + 30);
                // i++;
                // numero = i;
            }
        }

        //CON PERIODO DE GRACIAS PARCIAL
        else if (DataVehicular.periodograciasparcial > numero){
           // for (let p = 0; p <= DataVehicular.periodograciasparcial; p++) {
                //numero = p;
                if (numero !==0) {
                    factor = parseFloat(1/(Math.pow(1 +  factor_interes, numero))).toFixed(4);
                    saldoInicial = saldoFinal;
                    interes = ((saldoInicial * DI)/100).toFixed(2);
                    amortizacion = 0;
                    cuota = parseFloat(interes + amortizacion).toFixed(2);
                    seguroDesgravamen = (saldoInicial*(DataVehicular.segurodesgravamen/100)).toFixed(2);
                    seguroRiesgo = DataVehicular.segurovehiculomensual;
                    portes = DataVehicular.portes;
                }
                if(numero === 0){
                    saldoFinal = DataVehicular.Prestamo;
                    flujo = saldoFinal;
                    flujoTEM = saldoFinal;
                    valorActual = saldoFinal;
                }else{
                    saldoFinal = (saldoInicial - parseFloat(amortizacion)).toFixed(1);
                    flujo = (-cuota - seguroDesgravamen  - seguroRiesgo - portes).toFixed(2);
                    flujoTEM = (-interes-amortizacion).toFixed(2);
                    valorActual = (flujo / Math.pow((1 + DI/100),numero)).toFixed(2);
                }
                // agregarFila(numero, fechaIteracion, factor, saldoInicial, interes, amortizacion, cuota, saldoFinal, 
                // seguroDesgravamen, seguroRiesgo, portes, flujo, flujoTEM, valorActual);

                // Sumar 30 días a la fecha de iteración
                fechaIteracion.setDate(fechaIteracion.getDate() + 30);
                //i++;   
                numero = i;    
           // }
        }

        //SIN PERIODO DE GRACIAS
        if (numero !== 0) {
            factor = parseFloat(1/(Math.pow(1 +  factor_interes, numero))).toFixed(4);  
            saldoInicial = saldoFinal;
            interes = ((saldoInicial * DI)/100).toFixed(2);
            cuota = ((DPR*(DI*auxcuota)/(auxcuota-1))/100).toFixed(2);
            amortizacion = (cuota - interes).toFixed(2);
            seguroDesgravamen = (saldoInicial*(DataVehicular.segurodesgravamen/100)).toFixed(3);
            seguroRiesgo = DataVehicular.segurovehiculomensual;
            portes = DataVehicular.portes;
        }
        if(numero === 0){
            saldoFinal = DataVehicular.Prestamo;
            consaldoinicial = saldoFinal;
            flujo = saldoFinal;
            flujoTEM = saldoFinal;
            valorActual = saldoFinal;
        }else{
            saldoFinal = (saldoInicial - parseFloat(amortizacion)).toFixed(1);
            flujo = (-cuota - seguroDesgravamen  - seguroRiesgo - portes).toFixed(2);
            flujoTEM = (-interes-amortizacion).toFixed(2);
            valorActual = (flujo / Math.pow((1 + DI/100),numero)).toFixed(2);
            aux1 = -parseFloat(valorActual) + aux1;
        }
        if (i === parseInt(DataVehicular.NCuota)) {
            saldoFinal = saldoFinal - saldoFinal;
        }

        agregarFila(numero, fechaIteracion, factor, saldoInicial, interes, amortizacion, cuota, saldoFinal, 
        seguroDesgravamen, seguroRiesgo, portes, flujo, flujoTEM, valorActual);

        // Sumar 30 días a la fecha de iteración
        fechaIteracion.setDate(fechaIteracion.getDate() + 30);
        aux2 = parseFloat(flujoTEM);
        auxTIR.push(aux2);
        cons++;
    }
    getdata.VAN = parseFloat(-DataVehicular.Prestamo) - aux1;
    boxVAN.value = getdata.VAN;
    const cashflows = auxTIR;
    const TIR = calculateTIR(cashflows);
    getdata.TIR = TIR;
    boxTIR.value = TIR;
}   

//Calculo de TIR
function calculateTIR(cashflows) {
    // Función para calcular el valor presente neto (VPN) dado una tasa de interés
    function calculateNPV(rate) {
      let npv = 0;
      for (let i = 0; i < cashflows.length; i++) {
        npv += cashflows[i] / Math.pow(1 + rate, i);
      }
      return npv;
    }
  
    // Método de Newton-Raphson para encontrar la TIR
    const tolerance = 0.00001; // Tolerancia de error
    let guess = 0.1; // Suposición inicial
    let npv = calculateNPV(guess);
    while (Math.abs(npv) > tolerance) {
      let npvDerivative = -cashflows[0];
      for (let i = 1; i < cashflows.length; i++) {
        npvDerivative += (cashflows[i] / Math.pow(1 + guess, i)) * (-i);
      }
      guess = guess - npv / npvDerivative;
      npv = calculateNPV(guess);
    }
  
    // Multiplica la TIR por 100 para obtener el valor en porcentaje y redondea a 2 decimales
    return (guess * 100).toFixed(2);
  }
  
//envio a la base de datos
var sumit = document.getElementById("submit");

sumit.addEventListener("click",(e)=>{
    e.preventDefault();
    let precio = consaldoinicial;
    let Cuota = cuota;
    set(ref(db, 'Financiamiento/' + dni),{
        DNI: dni,
        FechaInicio: fechainicio,
        marca: marca,
        modelo: modelo,
        precioprestamo: precio,
        Interes: interes,
        estadocivil: estadocivil,
        cuota: Cuota,
    })
    .then(()=>{
        alert('Datos Guardados');
        window.location.href = '../historial/historial.html'
    })
    .catch((error)=>{
        alert('Error al guardar los datos en la base de datos: ' + error.message);
    })
})

//Cierre de Sesión
var logout = document.getElementById("logout")
logout.addEventListener('click', (e)=>{
    e.defaultPrevented()
    signOut(auth).then(() => {
        if (confirm("¿Desea cerrar la sesión?")) {
            window.location.href = "../../../index.html"   
        }
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage  = error.message;
        alert(errorMessage);
    });
})