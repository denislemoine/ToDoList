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

    getOne(id) {
        return db.collection("users").doc(id).withConverter(this.userConverter).get().then(function (doc) {
            if (doc.exists) {
                let coworker = doc.data();
                coworker.id = id;
                return coworker;
            } else {
                console.log("This coworker does not exist")
            }
        }).catch(function (error) {
            console.log("Error getting coworker:", error);
        })
    }

    add() {
      /*  db.collection("users").add({
             firstname: this.firstname,
             lastname: this.lastname
            // todos: this.todos
         })
         .then(function(docRef) {
             console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
      });*/

        db.collection("users").withConverter(this.userConverter).add(this).then(function (docRef) {
            console.log("Coworker written with ID: ", docRef.id);
        }).catch(function (error) {
            console.error("Error adding coworker: ", error);
        });
    }

    delete() {
        db.collection("users").doc(this.id).delete().then(function () {
            console.log("Coworker successfully deleted");
        }).catch(function (error) {
            console.error("Error removing coworker: ", error);
        });
    }

    update(field, value) {
        db.collection("users").doc(this.id).update({field: value}).then(function () {
            console.log("Coworker successfully updated");
        }).catch(function (error) {
            console.log("Error updating Coworker: ", error);
        });
    }

    getByTodos(todos) {
        let todosArray = [];
        return db.collection("todos").where("todos", "==", todos).withConverter(this.todoConverter).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let todo = doc.data();
                todo.id = doc.id;
                todosArray.push(todo);
            });
            return todosArray;
        })
    }
}