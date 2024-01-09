import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, set, child, update, remove, push, get } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { getAuth, onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

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

// Manejador para detectar el cambio en el estado de autenticación del usuario
auth.onAuthStateChanged((user) => {
    if (user) {
        // El usuario ha iniciado sesión, obtenemos su ID
        const userId = user.uid;
        obtenerYMostrarDatosDeUsuario(userId);
    } else {
        // El usuario no ha iniciado sesión, puedes manejarlo aquí
        console.log('El usuario no ha iniciado sesión.');
    }
 });

 function obtenerYMostrarDatosDeUsuario(userId) {
    const dbref = ref(db);
    const userRef = child(dbref, `users/${userId}`);

    get(userRef)
        .then((snapshot) => {
                if (snapshot.exists()) {
                    //Obtenemos los datos especificos del usuario como objeto
                    const userData = snapshot.val();
                    // Buscar el campo "username" dentro del subdocumento del usuario
                    let username = null;
                    // Recorrido del subdocumento
                    for (const subdocumentId in userData) {
                        if (userData[subdocumentId].username) {
                            username = userData[subdocumentId].username;
                            break;
                        }
                    }
                    if (username) {
                        // Inserta los valores en la etiqueta HTML <p>
                        const bienvenidoP = document.querySelector(".v13_4 p");
                        bienvenidoP.textContent = `Bienvenido ${username}`;
                    } else {
                        const bienvenidoP = document.querySelector(".v13_4 p");
                        bienvenidoP.textContent = `Bienvenido`;
                    }
                } else {
                    console.log('No se encontraron datos del usuario.');
                }
            })
        .catch((error) => {
            console.error('Error para obtener los datos:', error);
        });
}

//Cierre de Sesión
var logout = document.getElementById("logout")
logout.addEventListener('click', (e)=>{
    e.defaultPrevented()
    signOut(auth).then(() => {
        if (confirm("¿Desea cerrar la sesión?")) {
            window.location.href = "../../index.html"   
        }
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage  = error.message;
        alert(errorMessage);
    });
})