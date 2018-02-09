/* jshint esversion: 6 */

let userSchemasJSON = {
    name: String,
    password: String,
    job: String
  }
  
  function getUserSchema () {
    return userSchemasJSON
  }
  
  
  module.exports = { // Exporta todos los metodos
    getUserSchema: getUserSchema
  }
  