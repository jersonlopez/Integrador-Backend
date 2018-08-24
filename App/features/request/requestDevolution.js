'use strict'
let {saveDevolution, getAllDevolution} = require('../domain/services/serviceDevolution')


let save = async (req, res) => {
    let data = req.body
    res.send(await saveDevolution(data))
}

let getAll = async(req, res) => {
    res.send(await getAllDevolution())
}

module.exports = {
    save,
    getAll
}