/* jshint esversion: 6 */

const Router = require('express').Router

let routeDevolution = require('./features/db/sportOffice/devolution/route')
let routeImplementSports= require('./features/db/sportOffice/implement/route')  
let routeLoan = require('./features/db/sportOffice/loan/route')  
let routeRegister = require('./features/db/sportOffice/register/route')  
let routeUser = require('./features/db/user/route')  
let routeImplementPlayRoom= require('./features/db/playRoom/implement/route')  
let routeLoanPlayRoom= require('./features/db/playRoom/loan/route')  
let routeDevolutionPlayRoom= require('./features/db/playRoom/devolution/route')
let routeReservationPlayRoom= require('./features/db/playRoom/reservation/route')   

let router = new Router()

router.use('/v1', routeDevolution)
router.use('/v1', routeImplementSports)
router.use('/v1', routeLoan)
router.use('/v1', routeRegister)
router.use('/v1', routeUser)
router.use('/v1', routeImplementPlayRoom)
router.use('/v1', routeLoanPlayRoom)
router.use('/v1', routeDevolutionPlayRoom)
router.use('/v1', routeReservationPlayRoom)

module.exports = router
