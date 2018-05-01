/* jshint esversion: 6 */

let loanSchemaJSON = {
  id: { 
    type: String, 
    required: true
  },
  state: { 
    type: String, 
    required: true
  },
  name: { 
    type: String, 
    required: true 
  },
  typeImplement: { 
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
  }
}

function getLoanSchema() {
  return loanSchemaJSON
}

module.exports = { // Exporta todos los metodos
  getLoanSchema: getLoanSchema
}
