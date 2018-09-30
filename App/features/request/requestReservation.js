'use strict'

const { getEvents, saveNewEvents } = require('../domain/services/serviceReservation')

let save = async (req, res) => {
    //let data = req.body
    res.send(await saveNewEvents())
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
    
    res.send(await getEvents())
}

module.exports = {
    save,
    get
}