class Todo {
    constructor(name, description, status, coworker) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.coworker = coworker;
    }

    todoConverter = {
        toFirestore: function (todo) {
            return {
                name: todo.name,
                description: todo.description,
                status: todo.status,
                coworker: todo.coworker
            }
        }, fromFirestore: function (snapshot, options) {
            const data = snapshot.data(options);
            return new Todo(data.name, data.description, data.status, data.coworker);
        }
    };

    getAll() {
        let todoArray = [];
        return db.collection("todos").withConverter(this.todoConverter).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (doc.id !== "default") {
                    let todo = doc.data();
                    todo.id = doc.id;
                    todoArray.push(todo);
                }
            });
            return todoArray;
        })
    }

    getByStatus(status) {
        let todoArray = [];
        return db.collection("todos").where("status", "==", status).withConverter(this.todoConverter).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let todo = doc.data();
                todo.id = doc.id;
                todoArray.push(todo);
            });
            return todoArray;
        })
    }

    getByCoworker(coworker_id) {
        let todoArray = [];
        return db.collection("todos").where("coworker", "==", coworker_id).withConverter(this.todoConverter).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let todo = doc.data();
                todo.id = doc.id;
                todoArray.push(todo);
            });
            return todoArray;
        })
    };

    getOne(id) {
        return db.collection("todos").doc(id).withConverter(this.todoConverter).get().then(function (doc) {
            if (doc.exists) {
                let todo = doc.data();
                todo.id = id;
                return todo;
            } else {
                console.log("No such document!")
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        })
    }

    add() {
        db.collection("todos").withConverter(this.todoConverter).add(this).then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        }).catch(function (error) {
            console.error("Error adding document: ", error);
        });
    }

    delete(id) {
        db.collection("todos").doc(id).delete().then(function () {
            console.log("Document successfully deleted");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    }

    updateStatus(id, value) {
        db.collection("todos").doc(id).update({status: value}).then(function () {
            console.log("Status successfully updated to " + value);
        }).catch(function (error) {
            console.log("Error updating document: ", error);
        });
    }

    updateCoworker(id, coworker_id) {
        db.collection("todos").doc(id).update({coworker: coworker_id}).then(function () {
            console.log("Status successfully updated to " + value);
        }).catch(function (error) {
            console.log("Error updating document: ", error);
        });
    }
}

