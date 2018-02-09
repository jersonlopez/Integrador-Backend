/* jshint esversion: 6 */

const Router = require('express').Router

let util = require('./features/db/route')  // Se requiere el el modulo queries que esta dentro del proyecto

let router = new Router()

//router.post('/v1/saveImplement', util.saveImplements)

// router.get('/v1/getAllImplements', util.getAllImplements)

router.use('/v1', util)

module.exports = router
