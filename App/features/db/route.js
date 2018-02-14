const Router = require('express').Router

const utilImplement = require('./implement/util')
const utilUser = require('./user/util');
const utilLoan = require('./loan/util');
const utilDevolution = require('./devolution/util')

let router = new Router()

router.route('/saveImplements')
  .post((...args) => {
    utilImplement.saveImplements(...args)
  })

router.route('/saveDevolution')
  .post((...args) => {
    utilDevolution.saveDevolution(...args)
  })


router.route('/saveLoan')
  .post((...args) => {
    utilLoan.saveLoan(...args)
  })

router.route('/saveUser')
  .post((...args) => {
    utilUser.saveUser(...args)
  })

router.route('/getAllImplements')
  .get((...args) => {
    utilImplement.getAllImplements(...args)
  })

router.route('/getLoan')
  .get((...args) => {
    utilDevolution.getSanction(...args)
  })

router.route('/getDevolution')
  .get((...args) => {
    utilLoan.getSanction(...args)
  })


module.exports = router
