const Router = require('express').Router

const {save, get} = require('../request/requestResource')

let router = new Router()

router.route('/sports/items')
  .post((...args) => {
    save(...args)
})

router.route('/sports/items')
  .get((...args) => {
    get(...args)
})

/* router.route('/sports/item')
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
 }) */


module.exports = router
