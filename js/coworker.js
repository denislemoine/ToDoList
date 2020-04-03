//Class User
class Coworker {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }

    coworkerConverter = {
        toFirestore: function (users) {
            return {
                firstname: users.firstname,
                lastname: users.lastname,
            }
        }, fromFirestore: function (snapshot, options) {
            const data = snapshot.data(options);
            return new Coworker(data.firstname, data.lastname);
        }
    };


    getAll() {
        let userArray = [];
        return db.collection("users").withConverter(this.coworkerConverter).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                let mydata = doc.data();
                mydata.id = doc.id;
                userArray.push(mydata);
            });
            return userArray;
        });
    }

    getOne(id) {
        return db.collection("users").doc(id).withConverter(this.coworkerConverter).get().then(function (doc) {
            if (doc.exists) {
                let coworkerData = doc.data();
                coworkerData.id = id;
                return coworkerData;
            } else {
                console.log("This coworker does not exist")
            }
        }).catch(function (error) {
            console.log("Error getting coworker:", error);
        })
    }

    add() {
         db.collection("users").withConverter(this.coworkerConverter).add(this).then(function (docRef) {
            console.log("Coworker written with ID: ", docRef.id);
        }).catch(function (error) {
            console.error("Error adding coworker: ", error);
        });
    }

    delete(id) {
        db.collection("users").doc(id).delete().then(function () {
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

    updateFirstName(id, value) {
        db.collection("users").doc(id).update({firstname: value}).then(function () {
            console.log("firstname successfully updated to " + value);
        }).catch(function (error) {
            console.log("Error updating firstname: ", error);
        });
    }

    updateLastName(id, value) {
        db.collection("users").doc(id).update({lastname: value}).then(function () {
            console.log("lastname successfully updated to " + value);
        }).catch(function (error) {
            console.log("Error updating firstname: ", error);
        });
    }

}

