//connnecting to the base
var admin = require("firebase-admin");
var db = admin.database();
var ref = db.ref("server/saving-data/fireblog");

const firebaseConfig = {
    apiKey: "AIzaSyDLUZfVNeDXaHOG4Z-HK1nd5sW3cIJUR6g",
    authDomain: "todolist-cesi.firebaseapp.com",
    databaseURL: "https://todolist-cesi.firebaseio.com",
    projectId: "todolist-cesi",
    storageBucket: "todolist-cesi.appspot.com",
    messagingSenderId: "1080445649079",
    appId: "1:1080445649079:web:13a2950bc3765df2c18d32",
    measurementId: "G-6YTHFXFXS1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();



//User

var userGet = db.users('firstname');
console.log(userGet);

//ToDo