let schemas = require('./schema')
let mongoose = require('mongoose')  // mongoose es algo que nos permite facilidad a la hora de manejar esquemas y hacer consultar
let schema = mongoose.Schema    // se defina una variable Schema

let loanSchema = new schema(schemas.getLoanSchema())  // Creacion del esquema como tal

let loan = mongoose.model('LoanSport', loanSchema)  // creacion del modelo, este es que conecta con la bd, se le pasa el esquema de la tabla a//Creacion del esquema como tal

function getLoan() {
  return loan
}

module.exports = { // Exporta todos los modelos
    getLoan: getLoan
}
