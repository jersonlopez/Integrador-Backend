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


module.exports = { // Exporta todos los metodos
  saveUser: saveUser
}
