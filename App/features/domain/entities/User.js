/* jshint esversion: 6 */

let mongoose = require('mongoose')  
let schema = mongoose.Schema   

let userSchemasJSON = {
    name: {
        type: String,
        required: true
      },
    userName : {
        type: String,
        required: true
      },
    password: {
        type: String,
        required: true
      },
    job: {
        type: String,
        required: true
      },
    office : {
        type: String,
        required: true
      }
  }
  
  let schemaUser = new schema(userSchemasJSON)  // Creacion del esquema como tal
  let user = mongoose.model('User', schemaUser)  // creacion del modelo, este es que conecta con la bd, se le pasa el esquema de la tabla a//Creacion del esquema como tal
  
    
  module.exports = {
      user
  }
  