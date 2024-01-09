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

var dni = document.getElementById("dni");
var estadocivil = document.getElementById("estadocivil");
var nombrecompleto = document.getElementById("nombrecompleto");
var fechadenacimiento = document.getElementById("fechadenacimiento");
var vehiculo = document.getElementById("vehiculo");
var costovehiculo = document.getElementById("costovehiculo");
var fechaprestamo = document.getElementById("fechaprestamo");
var porcentajecuotainicial = document.getElementById("porcentajecuotainicial");
var CuotaInicial = document.getElementById("cuotainicial");
var prestamo = document.getElementById("prestamo");
var TNA = document.getElementById("TNA");
var TNM = document.getElementById("TNM");
var TEA = document.getElementById("TEA");
var TEM = document.getElementById("TEM");
var Plazoanual = document.getElementById("plazoanual");
var Plazomensual = document.getElementById("plazomensual");
var periodograciastotal = document.getElementById("graciastotal");
var periodograciasparcial = document.getElementById("graciasparcial");
var numcuota = document.getElementById("NumCuota");
var segdesgravament = document.getElementById("segdesgravament");
var segvehiculomensual = document.getElementById("segvehiculomensual");
var Portes = document.getElementById("Portes");
var submit = document.getElementById("submit");
var submitresumen = document.getElementById("submitresumen");

let porcentaje = 0;
let calculo = 0;
let Rprestamo = 0;
let tnmensual = 0;
let taanual = 0;
let tamensual = 0;
let data = {};
let datavehicular = {
  data: {},
  Dni: 0,
  Estadocivil: "",
  CuotaInicial: 0,
  Prestamo: 0,
  FechaPrestamo: "01/01/2005",
  Plazo: 0,
  interes: 0,
  NCuota: 0,
  segurodesgravamen: 0,
  segurovehiculomensual: 0,
  portes: 0,
  periododegraciastotal: 0,
  periodograciasparcial: 0
};

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const leftContent = document.getElementById("id-left-content");
  const menuTableContent = document.getElementById("id-menu-table-content");

  menuButton.addEventListener("click", function () {
    menuTableContent.classList.toggle("togle-menu-table-content");
    leftContent.classList.toggle("left-togle-menu-content");
  });
  // Recuperar datos desde localStorage
  const eleccionData = JSON.parse(localStorage.getItem("eleccionData"));
  data = eleccionData;
  datavehicular.data = data;
  elegido(data);
});

auth.onAuthStateChanged((user) => {
  if (user) {
    const userId = user.uid;
    obtenerYMostrarDatosDeUsuario(userId);
  } else {
    console.log("No se encontro los datos del usuario.");
  }
});

function obtenerYMostrarDatosDeUsuario(userId) {
  const dbref = ref(db);
  const userRef = child(dbref, `users/${userId}`);

  get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        let firstname = null;
        let lastname = null;
        let birthdate = null;
        for (const subdocumentId in userData) {
          if (
            userData[subdocumentId].firstname &&
            userData[subdocumentId].lastname &&
            userData[subdocumentId].birthdate
          ) {
            firstname = userData[subdocumentId].firstname;
            lastname = userData[subdocumentId].lastname;
            birthdate = userData[subdocumentId].birthdate;
            break;
          }
        }
        nombrecompleto.value = `${firstname} ${lastname}`;
        fechadenacimiento.value = birthdate;
      } else {
        console.log("No se encontraron datos del usuario.");
      }
    })
    .catch((error) => {
      console.error("Error para obtener los datos:", error);
    });
}

// Vehiculo seleccionado por el usuario
function elegido(data) {
  vehiculo.value = `${data.brand} ${data.optionModel}`;
  costovehiculo.innerHTML = "";
  for (let costo in data) {
    if (costo === "preciominimo" || costo === "preciomaximo") {
      var option = document.createElement("option");
      data.preciominimo = parseFloat(data.preciominimo.toFixed(2));
      data.preciomaximo = parseFloat(data.preciomaximo.toFixed(2));
      const valorConSimbolo = (costo === "USD" ? "$" : "S/") + data[costo];
      option.value = valorConSimbolo;
      option.text = valorConSimbolo.replace("S/","");
      costovehiculo.add(option);
    }
  }
}

//Cuota Inicial
function cuotaincial() {
  porcentaje = parseFloat(porcentajecuotainicial.value);

  // Elimina "S/" y convierte a número
  let costoSinMoneda = costovehiculo.value.replace("S/", "");
  let costoNumerico = parseFloat(costoSinMoneda);
  calculo = costoNumerico * (porcentaje / 100);
  datavehicular.CuotaInicial = parseFloat(calculo.toFixed(2));
  CuotaInicial.value = `S/ ${datavehicular.CuotaInicial}`;
}

// Importe de prestamo o saldo financiero
function importeprestamo() {
  let valorvehicular = costovehiculo.value.replace("S/", "");
  let preciovehicular = parseFloat(valorvehicular);
  Rprestamo = preciovehicular - datavehicular.CuotaInicial;
  datavehicular.Prestamo = parseFloat(Rprestamo.toFixed(2));
  prestamo.value = `S/. ${datavehicular.Prestamo}`;
}

// Plazos (meses o año)
function plazo() {
  if (Plazomensual.value !== "") {
    datavehicular.Plazo = Plazomensual.value;
    Plazoanual.value = "-";
  } else if (Plazoanual.value !== "") {
    datavehicular.Plazo = Plazoanual.value * 12;
    Plazomensual.value = datavehicular.Plazo;
  }
  numcuota.value = datavehicular.Plazo;
  datavehicular.NCuota = datavehicular.Plazo;
}

// Convertir de TNA a TNM / TEA a TEM / TNM a TEM
function tasasdeinteres() {
  if (TNA.value !== "" && TNA.value >= 10 && TNA.value <= 15) {
    tnmensual = (TNA.value / 100 / 12) * 100;
    tamensual = (Math.pow(1 + tnmensual / 12, 12) - 1).toFixed(3).concat("%");
    TEM.value = tamensual;
    datavehicular.interes = TEM.value;
    TEA.value = "-";
    TNM.value = "-";
  } else if (TNM.value !== "" && TNM.value >= 10 && TNM.value <= 15) {
    tamensual = (Math.pow(1 + TNM.value / 100 / 12, 12) - 1)
      .toFixed(3)
      .concat("%");
    TEM.value = tamensual;
    datavehicular.interes = TEM.value;
    TNA.value = "-";
    TEA.value = "-";
  } else if (TEA.value !== "" && TEA.value >= 10 && TEA.value <= 15) {
    taanual = (Math.pow(1 + TEA.value, 1 / 12) - 1).toFixed(3).concat("%");
    TEM.value = taanual;
    datavehicular.interes = TEM.value;
    TNA.value = "-";
    TNM.value = "-";
  } else {
    TEM.value = `${TEM.value}%`;
    datavehicular.interes = TEM.value;
    TNA.value = "-";
    TNM.value = "-";
    TEA.value = "-";
  }
}

// Periodo de gracias seleccionado
function PeriododeGracias() {
  if (periodograciastotal.value !== "") {
    datavehicular.periododegraciastotal = parseInt(periodograciastotal.value);
    periodograciasparcial.value = 0;
  } else if (periodograciasparcial.value !== "") {
    datavehicular.periodograciasparcial = parseInt(periodograciasparcial.value);
    periodograciastotal.value = 0;
  } else {
    periodograciasparcial.value = 0;
    periodograciastotal.value = 0;
  }
}

// Seguro de desgravament, vehicular y Portes
var segdesgravament = document.getElementById("segdesgravament");
var segvehiculomensual = document.getElementById("segvehiculomensual");
var Portes = document.getElementById("Portes");
function SegurosyPortes() {
  if (segdesgravament.value !== "" ) {
    datavehicular.segurodesgravamen = parseFloat(segdesgravament.value);
  } 
  if (segvehiculomensual.value !== ""){
    datavehicular.segurovehiculomensual = parseFloat(segvehiculomensual.value)
  } 
  if(Portes.value !== ""){
    datavehicular.portes = parseFloat(Portes.value);
  }else{
    segdesgravament.value = 0
    segvehiculomensual.value = 0
    Portes.value = 0
  }
}
// Calculo general
submit.addEventListener("click", (e) => {
  e.preventDefault();
  tasasdeinteres();
  plazo();
  if (
    dni.value.trim() !== "" &&
    estadocivil.value.trim() !== "" &&
    vehiculo.value.trim() !== "" &&
    costovehiculo.value.trim() !== "" &&
    porcentajecuotainicial.value.trim() !== "" &&
    fechaprestamo.value.trim() !== "" &&
    Plazomensual.value.trim() !== "" &&
    TEM.value.trim() !== ""
  ) {
    cuotaincial();
    importeprestamo();
    PeriododeGracias();
    SegurosyPortes();
    datavehicular.Dni = dni.value;
    datavehicular.Estadocivil = estadocivil.value;
    datavehicular.FechaPrestamo = fechaprestamo.value;
  } else {
    alert("Los campos obigatorios estan incompleto o digito mal un campo");
  }
});

// Resumir
submitresumen.addEventListener("click", () => {
  if (
    dni.value.trim() !== "" &&
    estadocivil.value.trim() !== "" &&
    vehiculo.value.trim() !== "" &&
    costovehiculo.value.trim() !== "" &&
    porcentajecuotainicial.value.trim() !== "" &&
    fechaprestamo.value.trim() !== "" &&
    Plazomensual.value.trim() !== "" &&
    TEM.value.trim() !== ""
  ) {
    localStorage.setItem("datavehicular", JSON.stringify(datavehicular));
    window.location.href = "../resumen/resumen.html";
  }else{
    alert("Los campos obigatorios estan incompleto");
  }
});
/*
---DOMContentLoaded---
document.addEventListener('DOMContentLoaded', () => {}) es un evento que se dispara cuando el navegador ha terminado de analizar el documento HTML y ha construido el árbol del DOM (Document Object Model), lo que significa que la página web está lista y se pueden manipular los elementos HTML con JavaScript de manera segura.

La función que se pasa como segundo argumento a addEventListener en este caso se ejecutará cuando ocurra el evento 'DOMContentLoaded'. Esto es útil para asegurarse de que el código JavaScript se ejecute después de que la página se haya cargado completamente, lo que evita problemas de ejecución de código antes de que los elementos HTML estén disponibles en el DOM.

Aquí tienes un ejemplo de cómo se utiliza:
document.addEventListener('DOMContentLoaded', () => {
  // Tu código JavaScript que necesita acceder a elementos HTML aquí
  const myElement = document.getElementById('miElemento');
  // Realiza operaciones con los elementos HTML después de que la página se haya cargado
});

En este ejemplo, el código dentro de la función anónima (() => {}) se ejecutará solo cuando se haya completado la carga del documento, lo que garantiza que los elementos HTML (como el elemento con id "miElemento") estén disponibles para su manipulación. Esto es especialmente útil en aplicaciones web para evitar errores y problemas de sincronización en tu código JavaScript.

---localStorage.getItem(key)---
localStorage.getItem(key) es un método que se utiliza para recuperar datos previamente almacenados en localStorage. Se proporciona la clave "eleccionData" como argumento.
El valor recuperado es una cadena JSON que representa los datos que se guardaron previamente.
JSON.parse() se utiliza para analizar (parsear) la cadena JSON y convertirla nuevamente en un objeto JavaScript.
Luego, el objeto resultante se almacena en la variable eleccionData.
En resumen, estas líneas de código se utilizan para guardar los datos del objeto eleccionData en el almacenamiento local del navegador (localStorage) como una cadena JSON en una página y luego recuperar esos datos en otra página, convirtiéndolos de nuevo en un objeto JavaScript para su uso. Esto permite pasar datos entre páginas web en el navegador sin necesidad de una conexión de servidor.

*/
// EXTRA FUNCIONALIDAD
let originalTNAState = false;
let originalTNMState = false;
let originalTEAState = false;
let originalTEMState = false;
let originalPlazoanualState = false;
let originalPlazomensualState = false;

Plazomensual.addEventListener("click", () => {
  originalPlazomensualState = Plazomensual.disabled;
  originalPlazoanualState = Plazoanual.disabled;
  Plazomensual.disabled = false;
  Plazoanual.disabled = true;
});

Plazoanual.addEventListener("click", () => {
  originalPlazomensualState = Plazomensual.disabled;
  originalPlazoanualState = Plazoanual.disabled;
  Plazomensual.disabled = true;
  Plazoanual.disabled = false;
});

Plazomensual.addEventListener("blur", () => {
  if (Plazomensual.value.trim() === "") {
    Plazomensual.disabled = false;
    Plazoanual.disabled = originalPlazoanualState;
  }
});

Plazoanual.addEventListener("blur", () => {
  if (Plazoanual.value.trim() === "") {
    Plazoanual.disabled = false;
    Plazomensual.disabled = originalPlazomensualState;
  }
});

TNA.addEventListener("click", () => {
  originalTNAState = TNA.disabled;
  originalTNMState = TNM.disabled;
  originalTEAState = TEA.disabled;
  originalTEMState = TEM.disabled;

  TNA.disabled = false;
  TNM.disabled = true;
  TEM.disabled = true;
  TEA.disabled = true;
});

TNM.addEventListener("click", () => {
  originalTNAState = TNA.disabled;
  originalTNMState = TNM.disabled;
  originalTEAState = TEA.disabled;
  originalTEMState = TEM.disabled;

  TNA.disabled = true;
  TNM.disabled = false;
  TEM.disabled = true;
  TEA.disabled = true;
});

TEA.addEventListener("click", () => {
  originalTNAState = TNA.disabled;
  originalTNMState = TNM.disabled;
  originalTEAState = TEA.disabled;
  originalTEMState = TEM.disabled;

  TNA.disabled = true;
  TNM.disabled = true;
  TEM.disabled = true;
  TEA.disabled = false;
});

TEM.addEventListener("click", () => {
  originalTNAState = TNA.disabled;
  originalTNMState = TNM.disabled;
  originalTEAState = TEA.disabled;
  originalTEMState = TEM.disabled;

  TNA.disabled = true;
  TNM.disabled = true;
  TEM.disabled = false;
  TEA.disabled = true;
});

TNA.addEventListener("blur", () => {
  if (TNA.value.trim() === "") {
    extra();
  }
});

TNM.addEventListener("blur", () => {
  if (TNM.value.trim() === "") {
    extra();
  }
});

TEA.addEventListener("blur", () => {
  if (TEA.value.trim() === "") {
    extra();
  }
});

TEM.addEventListener("blur", () => {
  if (TEM.value.trim() === "") {
    extra();
  }
});

function extra() {
  TEA.disabled = false;
  TNA.disabled = false;
  TNM.disabled = false;
  TEM.disabled = false;

  TNA.disabled = originalTNAState;
  TNM.disabled = originalTNMState;
  TEA.disabled = originalTEAState;
  TEM.disabled = originalTEMState;
}

let gtotal = false;
let gparcil = false;
let originalgtotalState = false;
let originalgparcialState = false;

periodograciastotal.addEventListener("click", () => {
  originalgtotalState = periodograciastotal.disabled;
  originalgparcialState = periodograciasparcial.disabled;
  periodograciastotal.disabled = false;
  periodograciasparcial.disabled = true;
});

periodograciasparcial.addEventListener("click", () => {
  originalgtotalState = periodograciastotal.disabled;
  originalgparcialState = periodograciasparcial.disabled;
  periodograciastotal.disabled = true;
  periodograciasparcial.disabled = false;
});

periodograciastotal.addEventListener("blur", () => {
  if (periodograciastotal.value.trim() === "") {
    periodograciastotal.disabled = false;
    periodograciasparcial.disabled = originalPlazomensualState;
  }
});

periodograciasparcial.addEventListener("blur", () => {
  if (periodograciasparcial.value.trim() === "") {
    periodograciasparcial.disabled = false;
    periodograciastotal.disabled = originalPlazomensualState;
  }
});

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