/* jshint esversion: 6 */
let mongoose = require('mongoose')  // mongoose es algo que nos permite facilidad a la hora de manejar esquemas y hacer consultar
let schema = mongoose.Schema    // se defina una variable Schema

let devolutionSchemaJSON = { 
    id: { 
      type: String, 
      required: true
    },
    typeResource: { 
      type: String, 
      required: true 
    },
    attendant: { 
      type: String, 
      required: true 
    },
    loanDate: { 
      type: Number, 
      required: true 
    },
    timeSanction: { 
      type: Number, 
      required: true 
    },
    devolutionDate: { 
      type: Number, 
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true 
    }
  }
  

let devolutionSchema = new schema(devolutionSchemaJSON)  // Creacion del esquema como tal
let devolution = mongoose.model('Devolution', devolutionSchema)  // creacion del modelo, este es que conecta con la bd, se le pasa el esquema de la tabla a//Creacion del esquema como tal

  module.exports = { // Exporta todos los metodos
    devolution
  }
  