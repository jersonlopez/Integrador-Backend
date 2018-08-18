'use strict'
let {getSanction, saveLoan, getAllLoan, getActualLoans, getLatestLoans} = require('../domain/services/serviceLoan')

let getSan = async (req, res) => {
    let data = req.body
    res.send(await getSanction(data))
}

let save = async (req, res) => {
    let data = req.body
    res.send(await saveLoan(data))
}

let getAll = async(req, res) => {
    res.send(await getAllLoan())
}


let getAllActive = async(req, res) => {
    res.send(await getActualLoans())

}

let getLatest = async(req, res) => {
    res.send(await getLatestLoans())

}
module.exports = {
    getSan, 
    save,
    getAll,
    getAllActive,
    getLatest
}