let schemas = require('./schema')
let mongoose = require('mongoose')  // mongoose es algo que nos permite facilidad a la hora de manejar esquemas y hacer consultar
let schema = mongoose.Schema    // se defina una variable Schema

let devolutionSchema = new schema(schemas.getDevolutionSchema())  // Creacion del esquema como tal

let devolution = mongoose.model('DevolutionSport', devolutionSchema)  // creacion del modelo, este es que conecta con la bd, se le pasa el esquema de la tabla a//Creacion del esquema como tal

function getDevolution () {
  return devolution
}

module.exports = { // Exporta todos los modelos
  getDevolution: getDevolution
}
