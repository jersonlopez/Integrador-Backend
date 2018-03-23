const Router = require('express').Router

const utilImplement = require('./util')

let router = new Router()

router.route('/items')
  .post((...args) => {
    utilImplement.saveImplements(...args)
})

router.route('/items')
  .get((...args) => {
    utilImplement.getAllImplements(...args)
})

router.route('/items/:typeImplement')
  .delete((...args) => {
    utilImplement.deleteImplement(...args)
 })


module.exports = router
