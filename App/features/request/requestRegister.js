'use strict'
let { getAllRegister } = require('../domain/services/serviceRegister')

let get = async (req, res) => {
    res.send(await getAllRegister())
}

module.exports = {
    get
}