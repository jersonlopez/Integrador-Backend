/* jshint esversion: 6 */

const Router = require('express').Router
let router = new Router()

 
let routeUser = require('./features/db/user/route')  
let routeImplementPlayRoom= require('./features/db/playRoom/implement/route')  
let routeLoanPlayRoom= require('./features/db/playRoom/loan/route')  
let routeDevolutionPlayRoom= require('./features/db/playRoom/devolution/route')
let routeReservationPlayRoom= require('./features/db/playRoom/reservation/route')   
let routeRegisterPlayRoom = require('./features/db/playRoom/register/route') 



//Refactor
let routeResourcesSports= require('./features/route/routeResource')
let routeRegister = require('./features/route/routeRegister') 
let routeLoan = require('./features/route/routeLoan')  
let routeDevolution = require('./features/route/routeDevolution')


router.use('/v1', routeUser)
router.use('/v1', routeImplementPlayRoom)
router.use('/v1', routeLoanPlayRoom)
router.use('/v1', routeDevolutionPlayRoom)
router.use('/v1', routeReservationPlayRoom)
router.use('/v1', routeRegisterPlayRoom)

//Refactor
router.use('/v1', routeResourcesSports)
router.use('/v1', routeRegister)
router.use('/v1', routeLoan)
router.use('/v1', routeDevolution)




module.exports = router
