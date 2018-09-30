/* jshint esversion: 6 */

const Router = require('express').Router,
router = new Router(),

routeImplementPlayRoom= require('./features/db/playRoom/implement/route'),  
routeLoanPlayRoom= require('./features/db/playRoom/loan/route'),  
routeDevolutionPlayRoom= require('./features/db/playRoom/devolution/route'),
routeReservationPlayRoom= require('./features/db/playRoom/reservation/route'),   
routeRegisterPlayRoom = require('./features/db/playRoom/register/route'),


//Refactor
routeResourcesSports= require('./features/route/routeResource'),
routeReservation = require('./features/route/routeReservation'),
routeRegister = require('./features/route/routeRegister'), 
routeLoan = require('./features/route/routeLoan'),  
routeDevolution = require('./features/route/routeDevolution'),
routeUser = require('./features/route/routeUser');

router.use('/v1', routeImplementPlayRoom)
router.use('/v1', routeLoanPlayRoom)
router.use('/v1', routeDevolutionPlayRoom)
router.use('/v1', routeReservationPlayRoom)
router.use('/v1', routeRegisterPlayRoom)

//Refactor
router.use('/v1', routeResourcesSports)
router.use('/v1', routeReservation)
router.use('/v1', routeRegister)
router.use('/v1', routeLoan)
router.use('/v1', routeDevolution)
router.use('/v1', routeUser)

module.exports = router
