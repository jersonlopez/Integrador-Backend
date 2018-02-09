let model = require('./model')

user = model.getUser()


function saveUser (req, res) { // función para guardar implemento
  let newUser = new user({
    name: "felipe", password: "1234", job: "Administrador"
  })

  newUser.save(function () {
    res.send("Usuario registrado exitosamente")
  })
};


function getAllImplements (req, res) {
  implement.find({}, '-_id -__v', function (err, doc) {
    res.status(200).jsonp(doc)
  })
};

module.exports = { // Exporta todos los metodos
  saveUser: saveUser
}
