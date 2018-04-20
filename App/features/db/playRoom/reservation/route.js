const Router = require('express').Router

const { saveReservation, getAllReservation } = require('./util');

let router = new Router()

router.route('/playRoom/reservations')
    .post((...args) => {
        saveReservation(...args)
    })

router.route('/playRoom/reservations')
    .get((...args) => {
        getAllReservation(...args)
    })


module.exports = router