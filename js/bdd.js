// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyDLUZfVNeDXaHOG4Z-HK1nd5sW3cIJUR6g',
    authDomain: 'todolist-cesi.firebaseapp.com',
    projectId: 'todolist-cesi'
  });
  
  var db = firebase.firestore();