<script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
    import {
      getAuth,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      onAuthStateChanged,
      signOut,
    } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

    // Your Firebase config
    const firebaseConfig = {
      apiKey: "AIzaSyAvqUEeadXULepbEuo77TxqEv8EmoZR0Z0",
      authDomain: "smartcart-c1c20.firebaseapp.com",
      projectId: "smartcart-c1c20",
      storageBucket: "smartcart-c1c20.firebasestorage.app",
      messagingSenderId: "703850020571",
      appId: "1:703850020571:web:4e7793246bd720e5d116fe",
      measurementId: "G-ZW53LF1Y19",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
