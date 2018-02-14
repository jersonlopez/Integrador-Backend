/* jshint esversion: 6 */

let devolutionSchemaJSON = { 
    id: String,
    typeImplement: String,
    observation: String,
    attendant: String,
    loanDate: String,
    timeSanction: String
  }
  
  function getDevolutionSchema () {
    return devolutionSchemaJSON
  }
  
  module.exports = { // Exporta todos los metodos
    getDevolutionSchema: getDevolutionSchema
  }
  