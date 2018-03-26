const Router = require('express').Router

const utilDevolution = require('./util')

let router = new Router()


router.route('/playRoom/devolutions')
  .post((...args) => {
    utilDevolution.saveDevolution(...args)
  })

 router.route('/playRoom/devolutions')
  .get((...args) => {
    utilDevolution.getAllDevolution(...args)
})


module.exports = router
