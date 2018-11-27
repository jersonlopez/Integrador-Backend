/* jshint esversion: 6 */

const mongoose = require('mongoose'),  
schema = mongoose.Schema;

const headquarterSchemaJSON = { // estructura del esquema, en formato json, excelente para nodo porque json surge de js y node esta basado en js
    direction: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    }
  }

  
  const schemaHeadquarter = new schema(headquarterSchemaJSON)  // Creacion del esquema como tal
  const headquarter = mongoose.model('Headquarter', schemaHeadquarter)  // creacion del modelo, este es que conecta con la bd, se le pasa el esquema de la tabla a//Creacion del esquema como tal
  
    
  module.exports = {
      headquarter
  }
  
 
  