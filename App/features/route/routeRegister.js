const Router = require('express').Router

const {get} = require('../request/requestRegister')

let router = new Router()

router.route('/sports/registers/:headquarters')
  .get((...args) => {
    get(...args)
})


module.exports = router
