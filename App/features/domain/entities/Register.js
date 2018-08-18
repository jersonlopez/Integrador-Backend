/* jshint esversion: 6 */
  
let mongoose = require('mongoose')  // mongoose es algo que nos permite facilidad a la hora de manejar esquemas y hacer consultar
let schema = mongoose.Schema    // se defina una variable Schema

let registerSchemaJSON = { 
    resource: String,
    quantityLoan: Number,
    quantityDevolution: Number
  }

  let registerSchema = new schema(registerSchemaJSON)  // Creacion del esquema como tal
  let register = mongoose.model('Register', registerSchema)  // creacion del modelo, este es que conecta con la bd, se le pasa el esquema de la tabla a//Creacion del esquema como tal
   
  
  module.exports = { // Exporta todos los modelos
      register
  }
  

  