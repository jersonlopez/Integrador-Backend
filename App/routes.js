/* jshint esversion: 6 */

const Router = require('express').Router

let util = require('./features/DB/util')  // Se requiere el el modulo queries que esta dentro del proyecto

let router = new Router()

router.post('/v1/saveImplement', util.saveImplements)

router.get('/v1/getAllImplements', util.getAllImplements)

// router.use('/user', util);

module.exports = router
