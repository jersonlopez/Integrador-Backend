let modelDevolution = require('./model')
let modelLoan = require('../loan/model')
let modelRegister = require('../register/model')
let modelImplement = require('../implement/model')

let devolution = modelDevolution.getDevolution()
let loan = modelLoan.getLoan()
let register = modelRegister.getRegister()
let implementSports = modelImplement.getImplements()

const workTime = 32400000
const millieconsOfOneDay = 86400000
const ruleOfSantion = 3

function getSanction(id) {
  return loan.find({ id: id }, '-_id -__v -id -name -faculty -phone -serviceRendered -attendant')
    .exec().then((data) => {
      return data
    }).catch((err) => {
      return { err: err }
    })
};

async function saveDevolution(req, res) {
  bandera = false;
  await loan.find({ typeImplement: req.body.typeImplement, state: "Activo", id: req.body.id }, '-__v', function (err, doc) {
    if (doc.length === 0) {
      this.bandera = true;
      res.send({ "message": "Por favor ingresa una cédula valida" })
    } else {
      loan.findOneAndUpdate({ _id: doc[doc.length - 1]._id }, { $set: { state: "Inactivo" } }, function (err) {
      });
    }
    implementSports.find({ typeImplement: req.body.typeImplement }, '-_id -__v', function (err, doc) {
      implementSports.findOneAndUpdate({ typeImplement: req.body.typeImplement }, { $set: { quantity: doc[0].quantity + req.body.quantity } }, function (err) {
      })
    });
  });
  if(bandera){return}
  let oldDevolution;
  let loanDate = await getSanction(req.body.id)
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
    id: req.body.id, typeImplement: req.body.typeImplement, attendant: req.body.attendant,
    loanDate: loanDate, timeSanction: sanction, devolutionDate: returnDate, quantity: req.body.quantity
  })
  register.find({ typeImplement: req.body.typeImplement }, '-__v', function (err, doc) {
    register.findOneAndUpdate({ _id: doc[0]._id }, { $set: { quantityDevolution: doc[0].quantityDevolution + 1 } }, function (err) {
    });
  });
  if (sanction > 0) {
    newDevolution.save(function () {
      res.send({ "message": "Devolucion efectuada exitosamente, SANCION DE: " + sanction + " dias." });
    })
  } else {
    newDevolution.save(function () {
      res.send({ "message": "Devolucion efectuada exitosamente" })
    })
  }
};

function getAllDevolution(req, res) {
  devolution.find({}, '-_id -__v', function (err, doc) {
    res.status(200).jsonp(doc)
  })
}

module.exports = {
  getSanction: getSanction,
  saveDevolution: saveDevolution,
  getAllDevolution: getAllDevolution
}