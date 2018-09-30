const Router = require('express').Router

const { save, get} = require('../request/requestReservation')

let router = new Router()

router.route('/reservations')
  .get((...args) => {
    get(...args)
  })


// router.route('/login')
// .post((...args) => {
//   login(...args)
// })


router.route('/reservations/save')
.get((...args) => {
  save(...args)
})

// router.route('/user/:userName')
//   .delete((...args) => {
//     remove(...args)
//  })

module.exports = router