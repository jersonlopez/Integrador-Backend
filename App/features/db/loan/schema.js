/* jshint esversion: 6 */

let loanSchemaJSON = { 
    id: String,
    name: String,
    typeImplement: String,
    faculty: String,
    phone: String,
    serviceRendered : String,
    attendant: String,
    loanDate: String,
    email: String
  }
  
  function getLoanSchema () {
    return loanSchemaJSON
  }
  
  module.exports = { // Exporta todos los metodos
    getLoanSchema: getLoanSchema
  }
  