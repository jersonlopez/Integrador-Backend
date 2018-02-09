const Router = require('express').Router

const utilImplement = require('./implement/util')
const utilUser = require('./user/util');

let router = new Router()

router.route('/saveImplements')
  .post((...args) => {
    utilImplement.saveImplements(...args)
  })

router.route('/saveUser')
  .post((...args) => {
    utilUser.saveUser(...args)
  })

router.route('/getAllImplements')
  .get((...args) => {
    utilImplement.getAllImplements(...args)
  })

module.exports = router
