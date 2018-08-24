const Router = require('express').Router

const { save, get, remove, login} = require('../request/requestUser')

let router = new Router()

router.route('/user')
  .post((...args) => {
    save(...args)
  })


router.route('/login')
.post((...args) => {
  login(...args)
})


router.route('/sports/users')
.get((...args) => {
  get(...args)
})

router.route('/user/:userName')
  .delete((...args) => {
    remove(...args)
 })

module.exports = router