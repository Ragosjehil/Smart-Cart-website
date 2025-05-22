// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvqUEeadXULepbEuo77TxqEv8EmoZR0Z0",
  authDomain: "smartcart-c1c20.firebaseapp.com",
  projectId: "smartcart-c1c20",
  storageBucket: "smartcart-c1c20.firebasestorage.app",
  messagingSenderId: "703850020571",
  appId: "1:703850020571:web:4e7793246bd720e5d116fe",
  measurementId: "G-ZW53LF1Y19"
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