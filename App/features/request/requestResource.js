'use strict'
let {saveResource, getAllResouces} = require('../domain/services/serviceResource')

let save = (req, res) => {
    let data = req.body
    console.log("\nentre al save!!!!!!!!!!!!!!!!!!!!!!!!\n")    
    res.send(saveResource(data))
}

let get = (req, res) => {
    res.send(getAllResouces())
}

module.exports = {
    save,
    get
}