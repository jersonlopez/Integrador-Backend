/* jshint esversion: 6 */

const mongoose = require('mongoose'),  
schema = mongoose.Schema;

const reservationSchemaJSON = { // estructura del esquema, en formato json, excelente para nodo porque json surge de js y node esta basado en js
    id: {
        type:String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    reservationDate: {
        type: String,
        required: true
    },
    hourStart: {
        type:String,
        required: true
    },
    hourEnd: {
        type:String,
        required: true
    },
    headquarter: {
        type:String,
        required: true
    },
    space: {
        type:String,
        required: true
    },
    until: {
        type: String,
        required: true
    },
    event: []
  }

  
  const schemaReservation = new schema(reservationSchemaJSON)  // Creacion del esquema como tal
  const reservation = mongoose.model('Reservation', schemaReservation)  // creacion del modelo, este es que conecta con la bd, se le pasa el esquema de la tabla a//Creacion del esquema como tal
  
    
  module.exports = {
      reservation
  }