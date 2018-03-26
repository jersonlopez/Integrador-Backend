/* jshint esversion: 6 */

let devolutionSchemaJSON = { 
    id: { 
      type: String, 
      required: true
    },
    typeImplement: { 
      type: String, 
      required: true 
    },
    observation: { 
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
    hourOut: { 
        type: String, 
        required: true 
      }
  }
  
  function getDevolutionSchema () {
    return devolutionSchemaJSON
  }
  
  module.exports = { // Exporta todos los metodos
    getDevolutionSchema: getDevolutionSchema
  }
  