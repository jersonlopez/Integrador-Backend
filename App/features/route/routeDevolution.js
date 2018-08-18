const Router = require('express').Router

const {save, getAll} = require('../request/requestDevolution')

let router = new Router()

router.route('/sports/devolutions')
  .post((...args) => {
    save(...args)
})

router.route('/sports/devolutions')
  .get((...args) => {
    getAll(...args)
})


module.exports = router
