/* jshint esversion: 6 */
  
let mongoose = require('mongoose')  // mongoose es algo que nos permite facilidad a la hora de manejar esquemas y hacer consultar
let schema = mongoose.Schema    // se defina una variable Schema

let loanSchemaJSON = {
    id: { 
      type: String, 
      required: true
    },
    headquarters :{
      type:String,
      require,
    },
    state: { 
      type: String, 
      required: true
    },
    name: { 
      type: String, 
      required: true 
    },
    typeResource: { 
      type: String, 
      required: true 
    },
    faculty: { 
      type: String, 
      required: true 
    },
    phone: { 
      type: String, 
      required: true 
    },
    attendant: { 
      type: String, 
      required: true 
    },
    loanDate: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true 
    }
  }

  
  let loanSchema = new schema(loanSchemaJSON)  // Creacion del esquema como tal
  let loan = mongoose.model('Loan', loanSchema)  // creacion del modelo, este es que conecta con la bd, se le pasa el esquema de la tabla a//Creacion del esquema como tal
    
  module.exports = { // Exporta todos los modelos
      loan
  }
  
 