// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyDLUZfVNeDXaHOG4Z-HK1nd5sW3cIJUR6g',
    authDomain: 'todolist-cesi.firebaseapp.com',
    projectId: 'todolist-cesi'
  });
  
  var db = firebase.firestore();
  console.log(db);

//Ad data to user
 db.collection("users").add({
    firstname: "Ada",
    lastname: "Lovelace",
    todos : "2"
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

