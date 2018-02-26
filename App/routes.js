/* jshint esversion: 6 */

const Router = require('express').Router

let routeDevolution = require('./features/db/devolution/route')
let routeImplement= require('./features/db/implement/route')  
let routeLoan = require('./features/db/loan/route')  
let routeRegister = require('./features/db/register/route')  
let routeUser = require('./features/db/user/route')  


let router = new Router()

router.use('/v1', routeDevolution)
router.use('/v1', routeImplement)
router.use('/v1', routeLoan)
router.use('/v1', routeRegister)
router.use('/v1', routeUser)

module.exports = router
