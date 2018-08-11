'use strict'
let {saveResource, getAllResouces} = require('../domain/services/serviceResource')

let save = async (req, res) => {
    let data = req.body
    console.log("\nentre al save!!!!!!!!!!!!!!!!!!!!!!!!\n")
    console.log('"""""""get """""""""\n')
    console.log(await saveResource(data),'\n')
    console.log('""""""""""""""""\n')   
    res.send(await saveResource(data))
}

let get = async (req, res) => {
    res.send(await getAllResouces())
}

module.exports = {
    save,
    get
}