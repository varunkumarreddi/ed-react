// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBRI41zq8-nnf5Srop_4jLfW2ZAI3M3JVM",
    authDomain: "ethereal-design-1998.firebaseapp.com",
    projectId: "ethereal-design-1998",
    storageBucket: "ethereal-design-1998.appspot.com",
    messagingSenderId: "828088271134",
    appId: "1:828088271134:web:711264ad4411ebb2e4c90f",
    measurementId: "G-9KFZZDCBDD"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

 
  export const auth = getAuth(app);