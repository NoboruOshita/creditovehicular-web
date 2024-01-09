// CONFIGURACIÓN DE FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";

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
  const analytics = getAnalytics(app);