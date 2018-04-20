const Router = require('express').Router

const utilImplement = require('./util')

let router = new Router()

router.route('/sports/items')
  .post((...args) => {
    utilImplement.saveImplements(...args)
})

router.route('/sports/items')
  .get((...args) => {
    utilImplement.getAllImplements(...args)
})

router.route('/sports/items/:typeImplement')
  .delete((...args) => {
    utilImplement.deleteImplement(...args)
 })


module.exports = router