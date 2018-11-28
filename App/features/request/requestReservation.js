'use strict'

const { saveReservation, getReservationByDayBySpace } = require('../domain/services/serviceReservation')

// let save = async (req, res) => {
//     const data = req.body
//     console.log(data)
//     res.send(await saveNewEvents(data))
// }

let save = async (req, res) => {
    const data = req.body
    res.send(await saveReservation(data))
}

// let remove = async (req, res) => {
//     let data = req.params
//     res.send(await deleteUser(data))
// }

// let login = async (req, res) => {
//     let data = req.body
//     res.send(await signIn(data))
// }

let get = async (req, res) => {
    const data = req.body
    res.send(await getReservationByDayBySpace(data))
}

module.exports = {
    save,
    get
}