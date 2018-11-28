const Router = require('express').Router

const { save, get} = require('../request/requestReservation')

const {saveSpace } = require('../domain/services/try')

let router = new Router()

router.route('/reservationsByDayBySpace/')
  .post((...args) => {
    get(...args)
  })

router.route('/reservations/saveSpace/')
  .get((...args) => {
    saveSpace(...args)
  })

// router.route('/login')
// .post((...args) => {
//   login(...args)
// })


router.route('/reservations/')
.post((...args) => {
  save(...args)
})

// router.route('/user/:userName')
//   .delete((...args) => {
//     remove(...args)
//  })

module.exports = router