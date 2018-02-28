let schemas = require('./schema')
let mongoose = require('mongoose')  // mongoose es algo que nos permite facilidad a la hora de manejar esquemas y hacer consultar
let schema = mongoose.Schema    // se defina una variable Schema

let url = 'mongodb://system:root@ds229458.mlab.com:29458/prestemosudea'
let moon = mongoose.connect(url, {
  useMongoClient: true
})

function close () {
  moon.close()
}

let registerSchema = new schema(schemas.getRegisterSchema())  // Creacion del esquema como tal

let register = mongoose.model('Register', registerSchema)  // creacion del modelo, este es que conecta con la bd, se le pasa el esquema de la tabla a//Creacion del esquema como tal

function getRegister() {
  return register
}

module.exports = { // Exporta todos los modelos
    getRegister: getRegister,
    close: close
}