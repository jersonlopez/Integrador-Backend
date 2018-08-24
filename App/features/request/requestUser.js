'use strict'

const { saveUser, signIn, getAllSportsUsers, deleteUser } = require('../domain/services/serviceUser')

let save = async (req, res) => {
    let data = req.body
    res.send(await saveUser(data))
}

let remove = async (req, res) => {
    let data = req.params
    res.send(await deleteUser(data))
}

let login = async (req, res) => {
    let data = req.body
    res.send(await signIn(data))
}

let get = async (req, res) => {
    res.send(await getAllSportsUsers())
}

module.exports = {
    save,
    remove,
    login,
    get
}