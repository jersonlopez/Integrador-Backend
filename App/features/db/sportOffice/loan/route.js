const Router = require('express').Router

const utilLoan = require('./util');

let router = new Router()

router.route('/loans')
  .post((...args) => {
    utilLoan.saveLoan(...args)
  })

router.route('/sanctions')
  .post((...args) => {
    utilLoan.getSanction(...args)
  })

router.route('/loans')
  .get((...args) => {
    utilLoan.getAllLoan(...args)
})


module.exports = router
