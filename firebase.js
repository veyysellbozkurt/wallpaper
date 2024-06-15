// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXFBwfRFUNVMYYGNK71qKeuDhlv5U0zeI",
  authDomain: "graduatewallpaperproject.firebaseapp.com",
  projectId: "graduatewallpaperproject",
  storageBucket: "graduatewallpaperproject.appspot.com",
  messagingSenderId: "1027951620860",
  appId: "1:1027951620860:web:160527a44a260462df5d79",
  measurementId: "G-1ZRLMMPTTZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

