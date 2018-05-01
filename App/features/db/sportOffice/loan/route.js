const Router = require('express').Router

const utilLoan = require('./util');

let router = new Router()

router.route('/sports/loans')
  .post((...args) => {
    utilLoan.saveLoan(...args)
  })

router.route('/sports/sanctions')
  .post((...args) => {
    utilLoan.getSanction(...args)
  })

router.route('/sports/loans')
  .get((...args) => {
    utilLoan.getAllLoan(...args)
})

router.route('/sports/activeLoans')
  .get((...args) => {
    utilLoan.getActualLoans(...args)
})




module.exports = router
