'use strict'

let { resource } = require('../entities/Resource')
let { loan } = require('../entities/Loan')
let { register } = require('../entities/Register')
let { devolution } = require('../entities/Devolution')
let { save, update, find, remove } = require('../repository/crud')
const { studentInformation, facultyInformation } = require('../../consumptionMares/consumptionMares')

const workTime = 32400000
const millieconsOfOneDay = 86400000
const ruleOfSantion = 3

let getSanction = async (id) => {
  let filter ={ id: id }
  let projection = '-_id -__v -id -name -faculty -phone -serviceRendered -attendant'
  return(await find(loan, filter, projection))
    .then((data) => {
      return data
    }).catch((err) => {
      return { err: err }
    })
};

  

let saveDevolution = async (req) => {
  bandera = false;
  let filter = { typeResource: req.typeResource, state: "Activo", id: req.id }
  let projection = '-__v'
  let doc = await find(loan, filter, projection)
    if (doc.length === 0) {
      bandera = true
      return({ "message": "Por favor ingresa una cédula valida" })
    } else {
        let set = { $set: { state: "Inactivo" }}
        let filter2 = { _id: doc[doc.length - 1]._id }
        await update(loan, filter2, set)
    }
    let filter3 = { typeResource: req.typeResource }
    let projection2 = '-_id -__v'
    let doc2 = await find(resource, filter3, projection2)
    let set2 = { $set: { quantity: doc2[0].quantity + req.quantity } }
    await update(resource, filter2, set)
  if(bandera){return}
  let oldDevolution;
  let loanDate = await getSanction(req.id)
  loanDate = loanDate[loanDate.length - 1].loanDate
  let returnDate = (new Date()).getTime();
  let sanction
  if ((returnDate - loanDate) > workTime) {
    sanction = Math.ceil((returnDate - loanDate) / millieconsOfOneDay) * ruleOfSantion
    console.log(sanction);
  } else {
        sanction = 0;
    }
    let newDevolution = new devolution({
        id: req.id, typeResource: req.typeResource, attendant: req.attendant,
        loanDate: loanDate, timeSanction: sanction, devolutionDate: returnDate, quantity: req.quantity
    })

    let doc3 = await find(register, filter3, projection)
    let filter4 = { _id: doc3[0]._id }
    let set3 = { $set: { quantityDevolution: doc3[0].quantityDevolution + 1 } }
    await update(register, filter4, set3)
    if (sanction > 0) {
        await save(newDevolution)
        return ({ "message": "Devolucion efectuada exitosamente, SANCION DE: " + sanction + " dias." });
    } else {
        await save(newDevolution)
        return ({ "message": "Devolucion efectuada exitosamente" })
    }
};

let getAllDevolution = async () => {
    let filter = {}
    let projection = '-_id -__v'
    let result = await find(devolution, filter, projection)
    return(result)
}

module.exports = {
  getSanction,
  saveDevolution,
  getAllDevolution
}