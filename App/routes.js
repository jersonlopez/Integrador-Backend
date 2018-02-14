/* jshint esversion: 6 */

const Router = require('express').Router

let db = require('./features/db/route')  // Se requiere el el modulo queries que esta dentro del proyecto

let router = new Router()

router.use('/v1', db)

module.exports = router
