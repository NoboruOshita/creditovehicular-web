import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

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
const app = initializeApp(firebaseConfig);
const auth = getAuth();

var brands = document.getElementById("brand");
var models = document.getElementById("model");
var price_min = document.getElementById("price_min");
var price_max = document.getElementById("price_max");
var boton = document.getElementById("cambiarPrecio");
var submit = document.getElementById("submit");
var logout = document.getElementById("logout");

let precioformateominimo = "S/";
let precioformateomaximo = "S/";
let brand = "";
let model = "";

let eleccionData = {
  brand: "",
  optionModel: "",
  preciominimo: 0,
  preciomaximo: 0,
};
//Elección de Marca
brands.addEventListener("change", (e) => {
  e.preventDefault();
  brand = brands.value;
  if (brand !== "seleccionB") {
    models.removeAttribute("disabled");
    enableB();
    showModelsByBrand(brand);
  }
});

// Elección del modelo
models.addEventListener("change", (e) => {
  e.preventDefault();
  brand = brands.value;
  model = models.value;
  VehicleChange(brand, model);
});

// Desabilitar la opción "--seleccionar--" de Marca
function enableB() {
  const optionToDisable = brands.querySelector('option[value="seleccionB"]');
  if (optionToDisable) {
    optionToDisable.disabled = true;
  }
}
// Muestra los Modelos segun la Marca elegidas
function showModelsByBrand(brand) {
  const modelOptions = models.querySelectorAll("option");
  for (var i = 0; i < modelOptions.length; i++) {
    var option = modelOptions[i];
    var optionBrand = option.getAttribute("data-brand");
    if (optionBrand === brand) {
      option.style.display = "block";
    } else {
      option.style.display = "none";
    }
  }
}
// Resultado de imagen, precios y descripción del vehiculo
function VehicleChange(brand, model) {
  let modelseleccionado = models.querySelectorAll("option");
  for (let i = 0; i < modelseleccionado.length; i++) {
    var selection = modelseleccionado[i];
    var selectionmodel = selection.getAttribute("data-brand");
    if (brand === selectionmodel) {
      const imgvehiculos = document.querySelector("#img");
      const descripcion = document.querySelector("#description");
      switch (model) {
        //Toyota
        case "Corolla":
          var newSrc = "../../../../assets/img/Img_Vehicular/ToyotaCorolla.jpg";
          imgvehiculos.setAttribute("src", newSrc);
          eleccionData.preciominimo = 22730;
          eleccionData.preciomaximo = 23160;
          descripcion.innerHTML =
            "Toyota Corolla<br>Caja de cambios: Manual<br>Combustible: Gasolina<br>Potencia máxima: 97 cv<br>Volumen del maletero: 960 litros<br>Aceleración (0-100km/h): 11,8 segundos<br>Velocidad Máxima: 185 km/h<br>Consumo medio: 6,8 L / 100 km";
          break;
        case "Yaris":
          var newSrc = "../../../../assets/img/Img_Vehicular/ToyotaYaris.jpg";
          imgvehiculos.setAttribute("src", newSrc);
          eleccionData.preciominimo = 16490;
          eleccionData.preciomaximo = 17340;
          console.log(eleccionData.preciomaximo);
          descripcion.innerHTML =
            "Toyota Yaris<br>Caja de cambios: Automático<br>Combustible: Gasolina<br>Potencia máxima: 125 cv<br>Volumen del maletero: 270 litros<br>Aceleración (0-100km/h): 9,0 segundos<br>Velocidad Máxima: 180 km/h<br>Consumo combinado: 5 L / 100 km";
          break;

        //Nissan
        case "Versa":
          var newSrc = "../../../../assets/img/Img_Vehicular/NissanVersa.jpg";
          imgvehiculos.setAttribute("src", newSrc);
          eleccionData.preciominimo = 14199;
          eleccionData.preciomaximo = 16390;
          descripcion.innerHTML =
            "Nissan Versa<br>Caja de cambios: Automático<br>Combustible: Gasolina<br>Potencia máxima: 133 cv<br>Volumen del maletero: 535 litros<br>Aceleración (0-100km/h): 9.1 segundos<br>Velocidad Máxima: 170 km/h<br>Consumo combinado: 6.4 L / 100km";
          break;
        case "Sentra":
          var newSrc = "../../../../assets/img/Img_Vehicular/NissanSentra.jpg";
          imgvehiculos.setAttribute("src", newSrc);
          eleccionData.preciominimo = 16800;
          eleccionData.preciomaximo = 19995;
          descripcion.innerHTML =
            "Nissan Sentra<br>Caja de cambios: Automático<br>Combustible: Gasolina<br>Potencia máxima: 147 cv<br>Volumen del maletero: 482 litros<br>Aceleración (0-100km/h): 11.2 segundos<br>Velocidad Máxima: 163 km/h<br>Consumo medio: 5.8 l/100 km";
          break;

        //Kia
        case "CeedGT":
          var newSrc = "../../../../assets/img/Img_Vehicular/KiaCeedGt.jpg";
          imgvehiculos.setAttribute("src", newSrc);
          eleccionData.preciominimo = 35330.82;
          eleccionData.preciomaximo = 38892.68;
          descripcion.innerHTML =
            "Kia Ceed GT<br>Caja de cambios: Manual<br>Combustible: Gasolina<br>Potencia máxima: 101 cv<br>Volumen del maletero: 1298 litros<br>Aceleración (0-100km/h): 11.8 segundos<br>Velocidad Máxima: 183 km/h<br>Consumo medio: 5 L / 100 km";
          break;
        case "Optima":
          var newSrc = "../../../../assets/img/Img_Vehicular/KiaOptima.jpg";
          imgvehiculos.setAttribute("src", newSrc);
          eleccionData.preciominimo = 10000;
          eleccionData.preciomaximo = 11000;
          descripcion.innerHTML =
            "Kia Optima<br>Caja de cambios: Manual<br>Combustible: Gasóleo<br>Potencia máxima: 136 cv<br>Volumen del maletero: 505 litros<br>Aceleración (0-100km/h): 10.3 segundos<br>Velocidad Máxima: 202 km/h<br>Consumo combinado: 5.1 L / 100 km";
          break;

        //BMW
        case "M3":
          var newSrc = "../../../../assets/img/Img_Vehicular/BmwM3.jpg";
          imgvehiculos.setAttribute("src", newSrc);
          eleccionData.preciominimo = 162649.21;
          eleccionData.preciomaximo = 192929.41;
          descripcion.innerHTML =
            "BMW M3<br>Caja de cambios: Automático<br>Combustible: Gasolina<br>Potencia máxima: 510 cv<br>Volumen del maletero: 480 litros<br>Aceleración (0-100km/h): 3.9 segundos<br>Velocidad Máxima: 250 km/h<br>Consumo combinado: 9.8 L / 100 km";
          break;
        case "M8GranCoupe":
          var newSrc = "../../../../assets/img/Img_Vehicular/Bmw8GranCoupé.jpg";
          imgvehiculos.setAttribute("src", newSrc);
          eleccionData.preciominimo = 32000;
          eleccionData.preciomaximo = 32990;
          descripcion.innerHTML =
            "BMW M8 Gran Coupé<br>Caja de cambios: Automático<br>Combustible: Diésel<br>Potencia máxima: 333 cv<br>Volumen del maletero: 440 litros<br>Aceleración (0-100km/h): 5.4 segundos<br>Velocidad Máxima: 250 km/h<br>Consumo combinado: 8.4 L / 100 km";
          break;

        //Audi
        case "RS7Sportback":
          var newSrc =
            "../../../../assets/img/Img_Vehicular/AudiRS7Sportback.jpg";
          imgvehiculos.setAttribute("src", newSrc);
          eleccionData.preciominimo = 168813.9;
          eleccionData.preciomaximo = 187800.38;
          descripcion.innerHTML =
            "Audi RS7 Sportback<br>Caja de cambios: Automático<br>Combustible: Gasolina<br>Potencia máxima: 600 cv<br>Volumen del maletero: 1390 litros<br>Aceleración (0-100km/h): 3.6 segundos<br>Velocidad Máxima: 250 km/h<br>Consumo medio: 12.8 L / 100 km";
          break;
        case "A4Avant":
          var newSrc = "../../../../assets/img/Img_Vehicular/AudiA4Avant.jpg";
          imgvehiculos.setAttribute("src", newSrc);
          eleccionData.preciominimo = 110429.3;
          eleccionData.preciomaximo = 134531.26;
          descripcion.innerHTML =
            "AUDI A4 Avant<br>Caja de cambios: Manual<br>Combustible: Diésel<br>Potencia máxima: 150 cv<br>Volumen del maletero: 505 litros<br>Aceleración (0-100km/h): 9.2 segundos<br>Velocidad Máxima: 215 km/h<br>Consumo medio: 4 L / 100 km";
          break;

        //Chevrolet
        case "Camaro":
          var newSrc =
            "../../../../assets/img/Img_Vehicular/ChevroletCamaro.jpeg";
          imgvehiculos.setAttribute("src", newSrc);
          eleccionData.preciominimo = 59990;
          eleccionData.preciomaximo = 69600;
          descripcion.innerHTML =
            "Chevrolet Camaro<br>Caja de cambios: Manual<br>Combustible: Gasolina<br>Potencia máxima: 432 cv<br>Volumen del maletero: 364 litros<br>Aceleración (0-100km/h): 5.2 segundos<br>Velocidad Máxima: 250 km/h<br>Consumo medio: 14.1 L / 100 km";
          break;
        case "PrismaLTZ":
          var newSrc =
            "../../../../assets/img/Img_Vehicular/ChevroletPrisma.jpg";
          imgvehiculos.setAttribute("src", newSrc);
          eleccionData.preciominimo = 10990;
          eleccionData.preciomaximo = 12499;
          descripcion.innerHTML =
            "Chevrolet Prisma LTZ<br>Caja de cambios: Manual<br>Combustible: Nafta<br>Potencia máxima: 98 cv<br>Volumen del maletero: 480 litros<br>Aceleración (0-100km/h): 3.9 segundos<br>Velocidad Máxima: 230 km/h<br>Consumo combinado: 9.3 L / 100 km";
          break;

        default:
          var newSrc = "../../../../assets/img/Img_Vehicular/default-image.png";
          imgvehiculos.setAttribute("src", newSrc);
          descripcion.textContent = "";
          break;
      }
      break;
    }
  }
  precioformateominimo =
    "$" + eleccionData.preciominimo.toLocaleString("es-US");
  precioformateomaximo =
    "$" + eleccionData.preciomaximo.toLocaleString("es-US");
  price_min.value = precioformateominimo;
  price_max.value = precioformateomaximo;
}
// Cambio del precio S/ <-> $
boton.addEventListener("click", function () {
  if (boton.textContent === "Precio en Dolar") {
    boton.textContent = "Precio a Soles";
    //Cambio a Dolar
    eleccionData.preciominimo = eleccionData.preciominimo / 3.76;
    eleccionData.preciomaximo = eleccionData.preciomaximo / 3.76;
    precioformateominimo =
      "$" + eleccionData.preciominimo.toLocaleString("es-US");
    precioformateomaximo =
      "$" + eleccionData.preciomaximo.toLocaleString("es-US");
    price_min.value = precioformateominimo;
    price_max.value = precioformateomaximo;
  } else {
    boton.textContent = "Precio en Dolar";
    eleccionData.preciominimo = eleccionData.preciominimo * 3.76;
    eleccionData.preciomaximo = eleccionData.preciomaximo * 3.76;
    precioformateominimo =
      "S/" + eleccionData.preciominimo.toLocaleString("es-PE");
    precioformateomaximo =
      "S/" + eleccionData.preciomaximo.toLocaleString("es-PE");
    price_min.value = precioformateominimo;
    price_max.value = precioformateomaximo;
  }
});

// elección finalizada
submit.addEventListener("click", (e) => {
  e.preventDefault();
  const selectedBrand = brands.value;
  const selectedModel = models.value;
  const availableModels = Array.from(
    document.querySelectorAll(`option[data-brand="${selectedBrand}"]`)
  ).map((option) => option.value);

  if (availableModels.includes(selectedModel)) {
    eleccionData.brand = selectedBrand;
    eleccionData.optionModel = selectedModel;
    console.log(eleccionData);
    // Guardar datos en localStorage
    localStorage.setItem("eleccionData", JSON.stringify(eleccionData));
    window.location.href = "../calcularcosto.html";
  } else {
    alert("La marca y modelo no es válida.");
    window.location.reload();
  }
});

//Cierre de Sesión
logout.addEventListener("click", (e) => {
  signOut(auth)
    .then(() => {
      if (confirm("¿Desea cerrar la sesión?")) {
        window.location.href = "../../../../index.html";
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

/* 
---localStorage.setItem(key,value)---
localStorage.setItem("eleccionData", JSON.stringify(eleccionData));:

localStorage es un objeto en JavaScript que permite a las páginas web almacenar datos en el navegador web.
.setItem(key, value) es un método de localStorage que se utiliza para almacenar datos. Se proporciona una "clave" (key) y un "valor" (value) como argumentos.
En este caso, la clave es "eleccionData", y el valor es el objeto eleccionData convertido en una cadena JSON utilizando JSON.stringify().
Esto almacena los datos de eleccionData en el navegador bajo la clave "eleccionData".
const eleccionData = JSON.parse(localStorage.getItem("eleccionData"));:

---JSON.stringify()---
JSON.stringify() es una función en JavaScript que se utiliza para convertir un objeto JavaScript en una cadena JSON. JSON (JavaScript Object Notation) es un formato de intercambio de datos que se utiliza comúnmente para transmitir datos entre un servidor y un cliente, o para almacenar datos estructurados.

Cuando aplicas JSON.stringify(objeto), toma un objeto JavaScript, como un objeto literal, un array, o cualquier otro objeto válido en JavaScript, y lo convierte en una cadena JSON que representa la estructura y los valores del objeto. Esto facilita el intercambio y almacenamiento de datos, ya que la cadena JSON se puede transmitir a través de una red o almacenar en archivos.

Ejemplo de uso:
const persona = {
  nombre: "Juan",
  edad: 30,
  ciudad: "Ejemploville"
};

const personaJSON = JSON.stringify(persona);

console.log(personaJSON);
// Esto mostrará la cadena JSON: '{"nombre":"Juan","edad":30,"ciudad":"Ejemploville"}' 

Puedes utilizar JSON.stringify() para convertir objetos en cadenas JSON antes de enviarlos a un servidor web o almacenarlos en el almacenamiento local del navegador, y luego usar JSON.parse() para convertirlos nuevamente en objetos JavaScript cuando los necesites. Esto es útil para compartir datos estructurados en aplicaciones web.

*/
