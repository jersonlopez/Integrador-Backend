'use strict'

let admin = require('firebase-admin');

const serviceAccount = require('./certs_prestemosudea.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://prestemosudea2018.firebaseio.com/'
});

module.exports.verifyIdToken = (idToken, callback) =>{

    if (idToken.length == 0) {
        callback(true, "token vacio");
    } else {

        admin.auth().verifyIdToken(idToken, callback)
            .then(function (decodedToken) {
                let uid = decodedToken.uid;
                callback(false, uid);
            }).catch(function (error) {
                callback(true, error);

            });
    }

}

/* verifyIdToken(idToken, function(error, uid){
    if (!error) {
        //code
    } else {
        // handler firebase token error
        //return res.status(500).send({ message: "error: " + uid});
    }
}) */


// para mirar quien esta logueado
// let user = admin.auth().currentUser
// console.log(user)