const Router = require('express').Router

const utilImplement = require('./util')

let router = new Router()

router.route('/saveImplements')
  .post((...args) => {
    utilImplement.saveImplements(...args)
})

router.route('/getAllImplements')
  .get((...args) => {
    utilImplement.getAllImplements(...args)
})

router.route('/deleteImplement')
  .delete((...args) => {
    utilImplement.deleteImplement(...args)
 })


module.exports = router
