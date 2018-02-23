let modelDevolution = require('./devolution/model')
let modelLoan = require ('./loan/model')
let modelRegister = require ('./model')
register = modelRegister.getRegister()
loan = modelLoan.getLoan()
devolution = modelDevolution.getDevolution()



function getAllRegister (req, res) {
  loan.find({}, '-_id -__v', function (err, doc) {
    let quantityLoan = doc.lenght
    res.status(200).jsonp(doc)
  })
};

module.exports = { // Exporta todos los metodos
  saveUser: saveUser
}
