const Router = require('express').Router

const utilRegister = require('./util')

let router = new Router()

router.route('/sports/registerss')
  .get((...args) => {
    utilRegister.getAllRegister(...args)
})

module.exports = router