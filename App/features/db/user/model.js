let schemas = require('./schema')
let mongoose = require('mongoose')  // mongoose es algo que nos permite facilidad a la hora de manejar esquemas y hacer consultar
let schema = mongoose.Schema    // se defina una variable Schema

let userSchema = new schema(schemas.getUserSchema())
let user = mongoose.model('User', userSchema)

function getUser () {
  return user
}

module.exports = { // Exporta todos los modelos
  getUser: getUser
}