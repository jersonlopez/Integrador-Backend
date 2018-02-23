let modelDevolution = require('./devolution/model')
let modelLoan = require ('./loan/model')
let modelRegister = require ('./model')
let modelImplement = require('.implement/model')
let jsonLoan, jsonDevolutions;

register = modelRegister.getRegister()
loan = modelLoan.getLoan()
devolution = modelDevolution.getDevolution()
implement = modelImplement.getImplements()



function getAllRegister (req, res) {
  loan.find({}, '-_id -__v -id -name -faculty -phone -attendant -longDate', function (err, doc) {
    let quantityLoans = doc.lenght;
    let serviceRendered;
    jsonLoan = doc;
    devolution.find({}, '-_id -__v -observation -attendant -loanDate -timeSanction', function (err, doc) {
      let quantityDevolutions = doc.lenght;
      jsonDevolutions = doc;
      implement.find({}, '-_v - __id', function (err, doc) {
        let j, i, k;
        let quantityImplementes = doc.lenght
        let quantityLoansByImplement = 0;
        let quantityDevolutionsByImplement = 0;
        let quantityServiceRendered1 = 0;
        for (j = 0; j < quantityImplementes; i++) {
          for (i = 0; i < quantityLoans; i++) {
            if (doc[j].typeImplement == jsonLoan[i].typeImplement) {
              quantityLoansByImplement = quantityLoansByImplement + 1;
              if (jsonLoan[i].serviceRendered == 'Si') {
                quantityServiceRendered1 = quantityServiceRendered1 + 1;
              }
            }
           
          }
          for (k = 0; k < quantityDevolutions; k++) {
            if (doc[j].typeImplement == jsonDevolutions[k].typeImplement) {
              quantityDevolutionsByImplement = quantityDevolutionsByImplement + 1;
            }
          }
          let newRegister = new register({
            typeImplement: doc[j].typeImplement, quantityLoan: quantityLoansByImplement,
            quantityDevolution: quantityDevolutionsByImplement, 
            quantityServiceRendered: quantityServiceRendered1
          })
          newRegister.save(function () {
            res.send("Resgitro guardado" /*+ newImplement*/)
          })

        }
      });
    })    
  })
  register.find({}, '-_id -__v', function (err, doc) {
    res.status(200).jsonp(doc)
  })
};

module.exports = { // Exporta todos los metodos
  saveUser: saveUser,
  getAllRegister : getAllRegister
}


