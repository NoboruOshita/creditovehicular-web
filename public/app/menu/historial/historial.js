import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, set, child, update, remove, push, get } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { getAuth,signOut} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDm1H0XFl2gXIoM9vSeHfxz8sTx2baaFFQ",
    authDomain: "creditovehicularapp.firebaseapp.com",
    databaseURL: "https://creditovehicularapp-default-rtdb.firebaseio.com",
    projectId: "creditovehicularapp",
    storageBucket: "creditovehicularapp.appspot.com",
    messagingSenderId: "697634516145",
    appId: "1:697634516145:web:1453e1dc7fa3a37b9ac690",
    measurementId: "G-XP533G7VP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-button");
    const leftContent = document.getElementById("id-left-content");
    const menuTableContent = document.getElementById(
      "id-menu-table-content"
    );

    menuButton.addEventListener("click", function () {
      menuTableContent.classList.toggle("togle-menu-table-content");
      leftContent.classList.toggle("left-togle-menu-content");
    });
  });

// Referencia a la ubicación de los datos en la base de datos
const financiamientoRef = ref(db, 'Financiamiento');

// Obtener los datos
get(financiamientoRef).then((snapshot) => {
    if (snapshot.exists()) {
        // snapshot.val() contiene todos los datos bajo 'Financiamiento'
        const financiamientoData = snapshot.val();

        // Referencia a la tabla en tu HTML
        const table = document.querySelector(".table-resumen");

        // Iterar sobre los nodos hijos (cada usuario)
        Object.keys(financiamientoData).forEach((userId) => {
            const userData = financiamientoData[userId];

            // Crear una nueva fila para cada usuario
            const newRow = table.insertRow();

            // Iterar sobre los campos del usuario y agregar celdas dinámicamente
            Object.keys(userData).forEach((field, index) => {
                newRow.insertCell(index).textContent = userData[field];
            });
        });
    } else {
        // No se encontraron datos bajo 'Financiamiento'
        console.log("No se encontraron datos bajo 'Financiamiento'");
    }
}).catch((error) => {
    // Ocurrió un error al intentar obtener los datos
    console.error("Error al obtener datos:", error);
});

//Cierre de Sesión
var logout = document.getElementById("logout")
logout.addEventListener('click', (e)=>{
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