/* jshint esversion: 6 */

const mongoose = require('mongoose'),  
schema = mongoose.Schema;

const { headquarter } = require('./Headquarter');

const resourceSchemaJSON = { // estructura del esquema, en formato json, excelente para nodo porque json surge de js y node esta basado en js
    headquarters: {
      type: String,
      required: true
    },
    name:{
        type:String,
        required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }

  
  const schemaResource = new schema(resourceSchemaJSON)  // Creacion del esquema como tal
  const resource = mongoose.model('Resource', schemaResource)  // creacion del modelo, este es que conecta con la bd, se le pasa el esquema de la tabla a//Creacion del esquema como tal
  
    
  module.exports = {
      resource
  }
  
 
  