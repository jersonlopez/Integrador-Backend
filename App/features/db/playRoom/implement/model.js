let schemas = require('./schema')
let mongoose = require('mongoose')  
let schema = mongoose.Schema   

let implementSchema = new schema(schemas.getImplementsSchema())  // Creacion del esquema como tal
let implement = mongoose.model('ImplementPlayRoom', implementSchema)  // creacion del modelo, este es que conecta con la bd, se le pasa el esquema de la tabla a//Creacion del esquema como tal

function getImplements () {
  return implement
}

module.exports = { // Exporta todos los modelos
  getImplements: getImplements
}
