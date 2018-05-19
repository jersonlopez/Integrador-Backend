const Router = require('express').Router

const { saveReservation, getAllReservation, getReservationByDayByConsole, getReservationByDay } = require('./util');

let router = new Router()

router.route('/playRoom/reservations')
    .post((...args) => {
        saveReservation(...args)
    })

router.route('/playRoom/reservations')
    .get((...args) => {
        getAllReservation(...args)
    })

router.route('/playRoom/reservationsByDayByConsole')
    .post((...args) => {
        getReservationByDayByConsole(...args)
    })

router.route('/playRoom/reservationsByDay')
    .post((...args) => {
        getReservationByDay(...args)
    })

module.exports = router