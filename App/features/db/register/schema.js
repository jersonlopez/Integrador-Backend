/* jshint esversion: 6 */

let registerSchemaJSON = { 
    typeImplement: String,
    quantityLoan: Number,
    quantityDevolution: Number,
    quantityServiceRendered: Number
  }
  
  function getRegisterSchema () {
    return registerSchemaJSON
  }
  
  module.exports = { // Exporta todos los metodos
    getRegisterSchema: getRegisterSchema
  }
  