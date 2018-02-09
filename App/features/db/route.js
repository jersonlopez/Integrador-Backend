const Router = require('express').Router

const util = require('./util')

let router = new Router()

router.route('/saveImplement')
    .post((req, res) => {
      util.saveImplements(req, res)
    })

router.route('/getAllImplements')
    .get((...args) => {
      util.getAllImplements(...args)
    })

module.exports = router
