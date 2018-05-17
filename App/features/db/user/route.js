const Router = require('express').Router

const utilUser = require('./util')

let router = new Router()

router.route('/user')
  .post((...args) => {
    utilUser.saveUser(...args)
  })


router.route('/login')
.post((...args) => {
  utilUser.signIn(...args)
})


router.route('/sports/users')
.get((...args) => {
  utilUser.getAllSportsUsers(...args)
})


router.route('/playRoom/users')
.get((...args) => {
  utilUser.getAllPlayRoomUsers(...args)
})

router.route('/user/:userName')
  .delete((...args) => {
    utilUser.deleteUser(...args)
 })

module.exports = router
