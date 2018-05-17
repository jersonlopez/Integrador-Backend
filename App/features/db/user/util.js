const generateToken = require('../generateToken'); 
let model = require('./model')


user = model.getUser()


function saveUser (req, res) { // función para guardar implemento
  let newUser = new user({
     name: req.body.user, userName: req.body.userName, password: req.body.password, job: "Auxiliar", office : req.body.office 
  })

  newUser.save(function () {
    res.send("Usuario registrado exitosamente")
  })
};

function signIn (req, res){
  user.find({userName: req.body.userName, password:req.body.password}, '-__v ', function (err, doc) {
      if(doc.length > 0){
          let jobUser = doc[0].job; 
          let username = doc[0].userName;
          let token = generateToken.createToken(doc)
          console.log(token)
          res.send({"job" : jobUser, "username": username})
      }else{
          res.send({"message" : "Usuario o contraseña incorrecta"})
      }
      
  });
}


module.exports = { // Exporta todos los metodos
  saveUser: saveUser, 
  signIn : signIn
}


function getReservations(req, res){
  let idToken = req.headers.authorization;
  console.log(idToken)
  if(idToken){
    admin.auth().verifyIdToken(idToken)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
      admin.auth().getUser(uid)
        .then(function(userRecord) {
          console.log("Successfully fetched user data:");
          reservationHelper(req,res,userRecord.toJSON());
        })
        .catch(function(error) {
          console.log("Error fetching user data:", error);
        });
    }).catch(function(error) {
      res.status(400).send({"message": "Token invalido... "+error});
    });
  }else{
    res.status(401).jsonp({"message":"Token invalido..."})
  }
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

