'use strict'

let { resource } = require('../entities/Resource')
let { loan } = require('../entities/Loan')
let { register } = require('../entities/Register')
let { devolution } = require('../entities/Devolution')
let { save, update, find, remove } = require('../repository/crud')
const { studentInformation, facultyInformation } = require('../../consumptionMares/consumptionMares')
let studentData

let getSanction = async (req) => {
  let sanctionTime;
  await studentInformation(req.id).then((data) => {
    if (data.data.length == 0) {
      return ({ "message": "Por favor ingrese una cedula valida" })
    } else {
      studentData = {
        id: req.id,
        name: data.data[0].nombre + " " + data.data[0].apellidos,
        phone: data.data[0].telefono,
        email: data.data[0].emailInstitucional
      }
    }
  })
  await facultyInformation(req.id).then((data) => {
    studentData.faculty = data.data[0].facultad
  })
  let filter = { id: req.id }
  let projection = '-_id -__v -attendant -typeImplement -observation'
  let doc = await find(resource, filter, projection)
  if (doc.length > 0) {
    let timeSanction = doc[doc.length - 1].timeSanction
    if (parseInt(timeSanction) > 0) {
      return ({ "message": "USUARIO SANCIONADO; aun tiene " + timeSanction + " Dias de sancion" });
    }
  }
  if (err) {
    console.log(err);
  }
  return (studentData);
};


let saveLoan = async (req) => {
  let oldLoan;
  let oldServiceRendered, oldQuantityDevolution;
  let filter = { name: req.name }
  let projection = '-__v'
  let doc1 = await find(resource, filter, projection)
  if (doc1[0].quantity < req.body.quantity) {
    return ({ "message": "No hay implementos disponibles en este momento" })
  } else {
    let set = { $set: { quantity: doc1[0].quantity - req.body.quantity } }
    await update(resource, filter, set)
    let newLoan = new loan({
      id: studentData.id,
      state: "Activo",
      name: studentData.name,
      typeResource: req.typeImplement,
      faculty: studentData.faculty,
      phone: studentData.phone,
      attendant: req.attendant,
      email: studentData.email,
      loanDate: new Date().getTime(),
      quantity: req.quantity
    })
    let keep = await save(newLoan)
    let doc = await find(register, filter, projection)
    let filter1 = { _id: doc[doc.length - 1]._id }
    let set1 = { $set: { quantityLoan: doc[0].quantityLoan + 1 } }
    await update(register, filter1, set1)
    return ({ "message": "Prestamo efectuado exitosamente" })
  }
};



let getAllLoan = async ()=> {
  let filter = {}
  let projection = '-_id -__v'
  let result = await find(loan, filter, projection)
  return result
};


let getActualLoans = async() => {
  let filter = { state: "Activo" }
  let projection = '-_id -__v'
  let result = await find(loan, filter, projection)
  return result
};

let getLatestLoans = async() => {
  let filter = {}
  let projection = '-_id -__v'
  let doc = await find(loan, filter, projection)
    let tam
    let i, j, k;
    if (doc.length > 10) {
      i = doc.length - 10
    } else {
      i = 0
    }
    let ti;
    let quantityImplement = 0;
    let registerRecord = [];
    while (i < doc.length) {
      j = i;
      while (j < doc.length) {
        if (doc.length == 0) {
          return(registerRecord)
        } else if (doc[i].typeImplement === doc[j].typeImplement) {
          quantityImplement = quantityImplement + 1;
        }
        j = j + 1;
      }
      let ban = true;
      k = 0;
      while (k < registerRecord.length) {
        if (registerRecord[k].typeImplement === doc[i].typeImplement) {
          ban = false;
        }
        k = k + 1;
      }
      if (ban) {
        registerRecord.push({ typeImplement: doc[i].typeImplement, quantity: quantityImplement })
      }
      quantityImplement = 0;
      i = i + 1;
    }
    return(registerRecord)
};



module.exports = {
  saveLoan,
  getSanction,
  getAllLoan,
  getActualLoans,
  getLatestLoans

}