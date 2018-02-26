const Router = require('express').Router

const utilLoan = require('./util');

let router = new Router()

router.route('/saveLoan')
  .post((...args) => {
    utilLoan.saveLoan(...args)
  })

router.route('/getDevolution')
  .get((...args) => {
    utilLoan.getSanction(...args)
  })

router.route('/getAllLoans')
  .get((...args) => {
    utilLoan.getAllLoan(...args)
})


module.exports = router
