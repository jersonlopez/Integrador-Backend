/* jshint esversion: 6 */

let registerSchemaJSON = { 
    typeImplement: String,
    quantityLoan: Number,
    quantityDevolution: Number
  }
  
  function getRegisterSchema () {
    return registerSchemaJSON
  }
  
  module.exports = { // Exporta todos los metodos
    getRegisterSchema: getRegisterSchema
  }
  