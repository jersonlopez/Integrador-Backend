const Router = require('express').Router

const utilImplement = require('./util')

let router = new Router()

router.route('/playRoom/items')
  .post((...args) => {
    utilImplement.saveImplements(...args)
})

router.route('/playRoom/items')
  .get((...args) => {
    utilImplement.getAllImplements(...args)
})

router.route('/playRoom/items/')
  .delete((...args) => {
    utilImplement.deleteImplement(...args)
 })


module.exports = router
