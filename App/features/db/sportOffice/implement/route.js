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

router.route('/sports/item')
  .post((...args) => {
    utilImplement.getByImplement(...args)
})

router.route('/sports/items/:typeImplement')
  .delete((...args) => {
    utilImplement.deleteImplement(...args)
 })

 router.route('/sports/decreaseItems')
  .post((...args) => {
    utilImplement.decreaseImplement(...args)
 })


module.exports = router
