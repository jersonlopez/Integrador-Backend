const Router = require('express').Router

const utilDevolution = require('./util')

let router = new Router()


router.route('/devolution')
  .post((...args) => {
    utilDevolution.saveDevolution(...args)
  })


router.route('/getLoan')
  .get((...args) => {
    utilDevolution.getSanction(...args)
  })

 router.route('/devolutions')
  .get((...args) => {
    utilDevolution.getAllDevolution(...args)
})


module.exports = router
