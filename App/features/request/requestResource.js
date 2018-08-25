'use strict'
let {saveResource, decreaseImplement, getAllResouces, deleteImplement} = require('../domain/services/serviceResource')

let save = async (req, res) => {
    let data = req.body
    res.send(await saveResource(data))
}

let get = async (req, res) => {
    let data = req.params
    res.send(await getAllResouces(data))
}

let update = async (req, res) => {
    let data = req.body
    res.send(await decreaseImplement(data))
}

let remove = async (req, res) => {
    let data = req.body    
    res.send(await deleteImplement(data))
}
module.exports = {
    save,
    get,
    update,
    remove
}