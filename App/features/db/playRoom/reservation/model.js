let mongoose = require('mongoose')


let schemas = require('./schema')

let schema = mongoose.Schema

let reservationSchema = new schema(schemas.getReservationSchema())

let reservation = mongoose.model('ReservationPlayRoom', reservationSchema)

function getReservation() {
  return reservation
}

module.exports = {
  getReservation: getReservation
}
