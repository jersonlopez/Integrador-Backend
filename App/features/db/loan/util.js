let modelLoan = require('./model')
let modelDevolution = require('../devolution/model')
let modelRegister = require('../register/model')

devolution = modelDevolution.getDevolution()
loan = modelLoan.getLoan()
register = modelRegister.getRegister()

function getSanction(req, res) {  //localhost:3000/v1/getDevolution/?id=222   METODO get devuelve un json con la fecha del ultimo prestamo (implemento a devolver) tipo de implemento id.
  let sanctionTime;
  devolution.find({id: req.query.id}, '-_id -__v -attendant -typeImplement -observation', function(err, doc) {                                               
      if(doc.length > 0) {     
        if(parseInt(doc[doc.length - 1].timeSanction) > 0){
          sanctionTime = Math.floor((parseInt(doc[doc.length - 1].timeSanction)/86400000) +1);  //cambiar por horario de trabajo
          res.send("USUARIO SANCIONADO; aun tiene " + sanctionTime + " Dias de sancion");
          return;
        }                                                                                                                         
      }
      res.send("Usuario NO sancionado");
  });
};


function saveLoan(req, res) { 
  let oldLoan;
  let oldServiceRendered;
  let newLoan = new loan({
    id: req.body.id,name: req.body.name, typeImplement: req.body.typeImplement, faculty: req.body.faculty,
    phone: req.body.phone, serviceRendered : req.body.serviceRendered, attendant: req.body.attendant, loanDate: new Date().getTime()
  })
  newLoan.save(function () {
  })
  register.find({typeImplement: req.body.typeImplement}, '-_id -__v', function(err, doc){
    oldLoan = doc[0].quantityLoan;
    oldServiceRendered = doc[0].quantityServiceRendered;
    if(req.body.serviceRendered === 'Si'){
      oldServiceRendered = oldServiceRendered + 1
    }
    let newRegister = new register({
      typeImplement: req.body.typeImplement, quantityLoan: oldLoan + 1,
      quantityDevolution: doc[0].quantityDevolution, quantityServiceRendered: oldServiceRendered
    })
    newRegister.save(function () {
    })
    register.findOneAndRemove({typeImplement:req.body.typeImplement, quantityLoan: oldLoan}, function(err) {
    res.send("Prestamo efectuado exitosamente")
    });
  });
};

function getAllLoan(req, res) {
  loan.find({}, '-_id -__v', function (err, doc) {
    res.status(200).jsonp(doc)
  })
};

module.exports = {
    saveLoan : saveLoan,
    getSanction : getSanction,
    getAllLoan : getAllLoan

  }