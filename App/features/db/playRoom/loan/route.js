const Router = require('express').Router

const utilLoan = require('./util');

let router = new Router()

router.route('/playRoom/loans')
  .post((...args) => {
    utilLoan.saveLoan(...args)
  })

router.route('/playRoom/sanctions')
  .post((...args) => {
    utilLoan.getSanction(...args)
  })

router.route('/playRoom/loans')
  .get((...args) => {
    utilLoan.getAllLoan(...args)
})


module.exports = router