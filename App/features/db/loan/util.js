let model = require('./model')

loan = model.getLoan()

function saveLoan(req, res) { 
  let newLoan = new loan({
    id: req.body.ir,name: req.body.name, typeImplement: req.body.typeImplement, faculty: req.body.faculty,
    phone: req.body.phone, serviceRendered : req.body.serviceRendered, attendant: req.body.attendant,
    sanction: req.body.sanction, state: req.body.state, loanDate: new Date(), returnDate:req.body.returnDate
  })

  newLoan.save(function () {
    res.send("Prestamos efectuado exitosamente" /*+ newImplement*/)
  })
};

module.exports = {
    saveLoan : saveLoan
  }