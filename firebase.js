
// npm install firebase@8.3.1 --save
import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCjxalmzYhJJEa2Ovs2sE_8mK5EzWyULRc",
    authDomain: "otpverificationlogin.firebaseapp.com",
    projectId: "otpverificationlogin",
    storageBucket: "otpverificationlogin.appspot.com",
    messagingSenderId: "898898756171",
    appId: "1:898898756171:web:e48f2da68153ff8cb203ce",
    measurementId: "G-LDF99HE7X6"
};
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export { auth, firebase };