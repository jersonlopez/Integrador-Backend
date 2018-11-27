/* jshint esversion: 6 */

const mongoose = require('mongoose'),  
schema = mongoose.Schema;

const spaceSchemaJSON = { // estructura del esquema, en formato json, excelente para nodo porque json surge de js y node esta basado en js
    headquarter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Headquarter'
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

  
  const schemaSpace = new schema(spaceSchemaJSON)  // Creacion del esquema como tal
  const space = mongoose.model('Space', schemaSpace)  // creacion del modelo, este es que conecta con la bd, se le pasa el esquema de la tabla a//Creacion del esquema como tal
  
    
  module.exports = {
      space
  }