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

let sanctionSchema = new schema(schemas.getSanctionSchema())  // Creacion del esquema como tal

let sanction = mongoose.model('Sanction', sanctionSchema)  // creacion del modelo, este es que conecta con la bd, se le pasa el esquema de la tabla a//Creacion del esquema como tal

function getSanction () {
  return sanction
}

module.exports = { // Exporta todos los modelos
  getSanction: getSanction,
  close: close
}
