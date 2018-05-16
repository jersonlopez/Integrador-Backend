let modelDevolution = require('./model')
let modelLoan = require('../loan/model')
let modelImplement = require('../implement/model')
let modelRegister = require('../register/model')

let devolution_play = modelDevolution.getDevolution()
let loan_play = modelLoan.getLoan()
let implement_play = modelImplement.getImplements()
let register_play = modelRegister.getRegister()


const workTime = 32400000
const millieconsOfOneDay = 86400000
const ruleOfSantion = 3


function getSanction(id) {
  return loan_play.find({ id: id }, '-_id -__v -id -name -faculty -phone -serviceRendered -attendant')
    .exec().then((data) => {
      return data
    }).catch((err) => {
      return { err: err }
    })
};

async function saveDevolution(req, res) {
  sbandera = false;
  await loan_play.find({ typeImplement: req.body.typeImplement, state: "Activo", id: req.body.id }, '-__v', function (err, doc) {
    if (doc.length === 0) {
      this.bandera = true;
      res.send({ "message": "Por favor ingresa una cedula valida" })
    } else {
      loan_play.findOneAndUpdate({ _id: doc[doc.length - 1]._id }, { $set: { state: "Inactivo" } }, function (err) {
      });
    }
    implement_play.find({ typeImplement: req.body.typeImplement }, '-_id -__v', function (err, doc) {
      implement_play.findOneAndUpdate({ typeImplement: req.body.typeImplement }, { $set: { quantity: doc[0].quantity + req.body.quantity } }, function (err) {
      })
    });
  });
  if(bandera){return}
  let loanDate = await getSanction(req.body.id)
  loanDate = loanDate[loanDate.length - 1].loanDate
  let returnDate = (new Date()).getTime();
  let sanction
  if ((returnDate - loanDate) > workTime) {
    sanction = Math.ceil((returnDate - loanDate) / millieconsOfOneDay) * ruleOfSantion
  } else {
    sanction = 0;
  }
  let newDevolution = new devolution_play({
    id: req.body.id, typeImplement: req.body.typeImplement, attendant: req.body.attendant,
    loanDate: loanDate, timeSanction: sanction, devolutionDate: returnDate, quantity: req.body.quantity,
    hourOut: (new Date).getHours() + ":" + (new Date).getMinutes() + ":" + (new Date).getSeconds()
  })
  register_play.find({ typeImplement: req.body.typeImplement }, '-__v', function (err, doc) {
    register_play.findOneAndUpdate({ _id: doc[0]._id }, { $set: { quantityDevolution: doc[0].quantityDevolution + 1 } }, function (err) {
    });
  });
  if (sanction > 0) {
    newDevolution.save(function () {
      res.send({ "message": "Devolucion efectuada exitosamente, SANCION DE: " + sanction + " dias." });
    })
  } else {
    newDevolution.save(function () {
      res.send({ "message": "Devolucion efectuada exitosamente" });
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