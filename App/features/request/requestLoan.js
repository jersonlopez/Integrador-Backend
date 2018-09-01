'use strict'
let {getSanction, saveLoan, getAllLoan, getActualLoans, getLatestLoans} = require('../domain/services/serviceLoan')

let getSan = async (req, res) => {
    let data = req.body
    console.log(data)
    let result = await getSanction(data)
    console.log(result)
    res.send(result)
}

let save = async (req, res) => {
    let data = req.body
    res.send(await saveLoan(data))
}

let getAll = async(req, res) => {
    let data = req.params
    res.send(await getAllLoan(data))
}


let getAllActive = async(req, res) => {
    let data = req.params
    res.send(await getActualLoans(data))

}

let getLatest = async(req, res) => {
    let data = req.params
    res.send(await getLatestLoans(data))

}
module.exports = {
    getSan, 
    save,
    getAll,
    getAllActive,
    getLatest
}