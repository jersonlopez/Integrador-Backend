const generateToken = require('../generateToken'); 
let model = require('./model')


user = model.getUser()


function saveUser (req, res) { // función para guardar implemento
  let newUser = new user({
     name: "felipe", userName: "pipe10", password: "1234", job: "Administrador"
  })

  newUser.save(function () {
    res.send("Usuario registrado exitosamente")
  })
};

function singIn (req, res){
  user.find({userName: req.body.userName, password:req.body.password}, '-__v ', function (err, doc) {
      if(doc.length > 0){
          let jobUser = doc[0].job; 
          let username = doc[0].userName; 

          let token = generateToken.createToken(doc)
          console.log(token)
          res.send({"job" : jobUser, "username" : username})
      }else{
          res.send({"message" : "Usuario o contraseña incorrecta"})
      }
      
  });
}


module.exports = { // Exporta todos los metodos
  saveUser: saveUser, 
  singIn : singIn
}
