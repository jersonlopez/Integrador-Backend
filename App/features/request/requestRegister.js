'use strict'
let { getAllRegister } = require('../domain/services/serviceRegister')

let get = async (req, res) => {
    let data = req.params
    res.send(await getAllRegister(data))
}

module.exports = {
    get
}