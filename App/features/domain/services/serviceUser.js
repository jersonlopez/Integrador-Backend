'use strict'

let {save, update, find, remove } = require('../repository/crud')
const { user } = require("../entities/User")

let saveUser = async (req) => {
    let newUser = new user({
        name: req.name,
        userName: req.userName,
        password: req.password,
        job: "Auxiliar",
        office: req.office
    })

    await save(newUser)
    return {
        "message": "Usuario registrado exitosamente"
    }
};

let signIn = async (req) => {
    let filter = {
        userName: req.userName,
        password: req.password
    }
    let projection = '-__v '
    let doc = await find(user, filter, projection)

    if (doc.length > 0) {
        let jobUser = doc[0].job;
        let officeUser = doc[0].office;
        let username = doc[0].userName;
        return ({
            "job": jobUser,
            "username": username,
            "office": officeUser
        })
    } else {
        return ({
            "message": "Usuario o contraseña incorrecta"
        })
    }
}

let getAllSportsUsers = async (req, res) => {

    let filter = {}
    let projection = '-_id -__v '
    let doc = await find(user, filter, projection)

    let i;
    let sportsUser = [];
    for (i = 0; i < doc.length; i++) {
        if (doc[i].office === "ImplementosDeportivos") {
            sportsUser.push(doc[i])
        }
    }
    return sportsUser
}

let getAllPlayRoomUsers = async (req, res) => {

    let filter = {}
    let projection = '-_id -__v '
    let doc = await find(user, filter, projection)

    let i;
    let sportsUser = [];
    for (i = 0; i < doc.length; i++) {
        if (doc[i].office === "Ludoteca") {
            sportsUser.push(doc[i])
        }
    }
    return sportsUser
}

let deleteUser = async (req, res) => {

    let filter = { userName: req.userName }
    await remove(user, filter)
    return { "message": "usuario eliminado correctamente" }
};

module.exports = { 
    saveUser,
    signIn,
    getAllSportsUsers,
    getAllPlayRoomUsers,
    deleteUser

}


/************************ fragcion html de firebase *******************************
 
<script src="https://www.gstatic.com/firebasejs/4.13.0/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAR-B_9GPdrtoJtcnfa3LUKCb4mXLfKMNI",
    authDomain: "prestemosudea2018.firebaseapp.com",
    databaseURL: "https://prestemosudea2018.firebaseio.com",
    projectId: "prestemosudea2018",
    storageBucket: "",
    messagingSenderId: "946068017568"
  };
  firebase.initializeApp(config);
</script>
  
************************************/