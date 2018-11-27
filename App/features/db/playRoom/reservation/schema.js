/* jshint esversion: 6 */

let reservationSchemaJSON = { // estructura del esquema, en formato json, excelente para nodo porque json surge de js y node esta basado en js
    reservationDate: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    id: {
        type:String,
        required: true
    },
    typeConsole: {
        type: String,
        required: true
    },
    hourIn: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    controlQuantity: {
        type:Number,
        required: true
    },
    videoGame: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    until: {
        type: String,
        required: true
    }
    
}

  function getReservationSchema() {
    return reservationSchemaJSON
  }
  
  module.exports = { // Exporta todos los metodos
    getReservationSchema: getReservationSchema
  }
  