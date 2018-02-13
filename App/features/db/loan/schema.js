/* jshint esversion: 6 */

let loanSchemaJSON = { 
    id: String,
    name: String,
    typeImplement: String,
    faculty: String,
    phone: String,
    serviceRendered : String,
    attendant: String,
    sanction: String,
    state: String,
    loanDate: String,
    returnDate: String
  }
  
  function getLoanSchema () {
    return loanSchemaJSON
  }
  
  module.exports = { // Exporta todos los metodos
    getLoanSchema: getLoanSchema
  }
  