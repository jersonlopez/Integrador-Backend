const Router = require('express').Router

const {getSan, save, getAll, getAllActive, getLatest} = require('../request/requestLoan')

let router = new Router()

router.route('/sports/sanctions')
  .post((...args) => {
    getSan(...args)
})

router.route('/sports/loans')
  .post((...args) => {
    save(...args)
})

router.route('/sports/loans')
  .get((...args) => {
    getAll(...args)
})

router.route('/sports/activeLoans')
  .get((...args) => {
    getAllActive(...args)
})


router.route('/sports/latestLoans')
  .get((...args) => {
    getLatest(...args)
})

module.exports = router
