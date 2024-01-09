import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, set, child, update, remove, push } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

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

// Obtener el la dirección del campo //
var sighUp = document.getElementById('sighUp');
var back = document.getElementById('back');

back.addEventListener('click', ()=>{
    window.location.href = '../../../index.html'
})

sighUp.addEventListener('click',(e)=>{
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var birthdate = document.getElementById('birthdate').value;

    // Autentificación
    if(firstname === "" || lastname === "" || username === "" || password === "" || email === "" || birthdate === ""){
        alert('Complete todos los campos')
    }else if(birthdate > "2005/12/31"){
        alert('Fecha inválida, debe ser mayor de edad') 
        document.getElementById('birthdate').value = "";
        birthdate = 0;
    }else{
        createUserWithEmailAndPassword(auth, email, password) //Aqui se guarda el password en el mismo autentificador
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            push(ref(db, 'users/' + user.uid),{
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                birthdate: birthdate
            })
            .then(()=>{
                alert('Registro exitoso');
                window.location.href = '../../../index.html'
            })
            .catch((error)=>{
                alert('Error al guardar los datos en la base de datos: ' + error.message);
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }
})
