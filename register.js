// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDjUixl72E6Q_ikZndW3q9NtFzIZDi8kuc",
    authDomain: "smart-cart-67577.firebaseapp.com",
    projectId: "smart-cart-67577",
    storageBucket: "smart-cart-67577.firebasestorage.app",
    messagingSenderId: "53620435226",
    appId: "1:53620435226:web:691c0cf81fdb995ac5e4a3",
    measurementId: "G-0E8W96SM3Z"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//submit button 

const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
  event.preventDefault()

  //inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert("Creating account...")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
})
