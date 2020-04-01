//Class User
var userClass = class {
    constructor(firstname, lastname, todos) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.todos = todos;
    }

    userConverter = {
        toFirestore: function (users) {
            return {
                firstname: users.firstname,
                lastname: users.lastname,
                todos: users.todos
            }
        }, fromFirestore: function (snapshot, options) {
            const data = snapshot.data(options);
            return new userClass(data.firstname, data.lastname, data.todos);
        }
    };


    getAll() {
        let userArray = [];
        return db.collection("users").withConverter(this.userConverter).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                
                let mydata = doc.data();
                mydata.id = doc.id;
                userArray.push(mydata);
            });
            return userArray;
        });
    }

    getOne() {

    }

    setAdd (){
       /* db.collection("users").add({
            firstname: "data.firstname",
            lastname: "data.lastname",
            todos: "data.todos"
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
         })
         .catch(function(error) {
             console.error("Error adding document: ", error);
     });*/
    }

    setModify () {
        
    }

    deleteUser () {

    }

    

}


var getUser = new userClass();
getUser.getAll().then(function (userArray){
    console.log(userArray);
}); 