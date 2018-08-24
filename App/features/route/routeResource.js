const Router = require('express').Router

const {save, get, update, remove} = require('../request/requestResource')

let router = new Router()

router.route('/sports/items/')
  .post((...args) => {
    save(...args)
})

router.route('/sports/items/')
  .get((...args) => {
    get(...args)
})

router.route('/sports/items/')
  .put((...args) => {
    update(...args)
})

router.route('/sports/items/')
  .delete((...args) => {
    remove(...args)
})


module.exports = router
