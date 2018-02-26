const Router = require('express').Router

const utilUser = require('./util')

let router = new Router()

router.route('/saveUser')
  .post((...args) => {
    utilUser.saveUser(...args)
  })

module.exports = router
