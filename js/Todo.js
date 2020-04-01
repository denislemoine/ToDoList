class Todo {
    constructor(name, description, status) {
        this.name = name;
        this.description = description;
        this.status = status;
    }

    todoConverter = {
        toFirestore: function (todo) {
            return {
                name: todo.name,
                description: todo.description,
                status: todo.status
            }
        }, fromFirestore: function (snapshot, options) {
            const data = snapshot.data(options);
            return new Todo(data.name, data.description, data.status);
        }
    };

    getAll() {
        db.collection("todos").get().then(function (querySnapshot) {
            console.log(querySnapshot)
        })
    }

    getByStatus(id) {
        db.collection("todos").where("id", "==", id).get().then(function (querySnapshot) {
            console.log(querySnapshot)
        })
    }

    getOne(id) {
        db.collection("todos").doc(id).then(function (doc) {
            if (doc.exists) {
                console.log(doc.data)
            } else {
                console.log("No such document!")
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        })
    }

    setOne() {

    }
}