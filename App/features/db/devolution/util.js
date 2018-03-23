let modelDevolution = require('./model')
let modelLoan = require('../loan/model')
let modelRegister = require('../register/model')

let devolution = modelDevolution.getDevolution()
let loan = modelLoan.getLoan()
let register = modelRegister.getRegister()

const workTime = 32400000
const millieconsOfOneDay = 86400000
const ruleOfSantion = 3

function getSanction(id) {
  return loan.find({ id: id }, '-_id -__v -id -name -faculty -phone -serviceRendered -attendant')
  .exec().then((data)=>{
    return data
  }).catch((err) => {
    return {err : err}
  })
};

async function saveDevolution(req, res) {   //metodo post 
  let oldDevolution;
  let loanDate = await getSanction(req.body.id)
  loanDate = loanDate[loanDate.length -1].loanDate
  let returnDate = (new Date()).getTime(); 
  let sanction
  if ((returnDate - loanDate) > workTime) {
    sanction = Math.ceil((returnDate - loanDate) / millieconsOfOneDay) * ruleOfSantion
    console.log(sanction);
  } else {
    sanction = 0;
  }
  let newDevolution = new devolution({
    id: req.body.id, typeImplement: req.body.typeImplement, observation: req.body.observation, attendant: req.body.attendant,
    loanDate: loanDate ,timeSanction: sanction, devolutionDate: returnDate
  })
  /* register.find({ typeImplement: req.body.typeImplement }, '-_id -__v', function (err, doc) {
    oldDevolution = doc[0].quantityDevolution;
    let newRegister = new register({
      typeImplement: req.body.typeImplement, quantityLoan: doc[0].quantityLoan,
      quantityDevolution: oldDevolution + 1, quantityServiceRendered: doc[0].quantityServiceRendered
    })
    newRegister.save(function () {
    })
    register.findOneAndRemove({ typeImplement: req.body.typeImplement, quantityDevolution: oldDevolution }, function (err) {
    });
  }); */

  if (sanction > 0) {
    newDevolution.save(function () {
      res.send({ "message": "Devolucion efectuada exitosamente, SANCION DE: " + sanction + " dias."/*+ newImplement*/ });
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