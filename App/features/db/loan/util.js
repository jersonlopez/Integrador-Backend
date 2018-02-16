let modelLoan = require('./model')
let modelDevolution = require('../devolution/model') //revisar ruta

devolution = modelDevolution.getDevolution()
loan = modelLoan.getLoan()

function getSanction(req, res) {  //localhost:3000/v1/getDevolution/?id=222   METODO get devuelve un json con la fecha del ultimo prestamo (implemento a devolver) tipo de implemento id.
  let sanctionTime;
  devolution.find({id: req.query.id}, '-_id -__v -attendant -typeImplement -observation', function(err, doc) {                                               
      if(doc.length > 0) {     
        if(parseInt(doc[doc.length - 1].timeSanction) > 0){
          sanctionTime = Math.floor((parseInt(doc[doc.length - 1].timeSanction)/86400000) +1);
          res.send("USUARIO SANCIONADO; aun tiene " + sanctionTime + " Dias de sancion");
          return;
        }                                                                                                                         
      }
      res.send("Usuario NO sancionado");
  });
};


function saveLoan(req, res) { 
  let newLoan = new loan({
    id: req.body.id,name: req.body.name, typeImplement: req.body.typeImplement, faculty: req.body.faculty,
    phone: req.body.phone, serviceRendered : req.body.serviceRendered, attendant: req.body.attendant, loanDate: new Date().getTime()
  })

  newLoan.save(function () {
    res.send("Prestamos efectuado exitosamente" /*+ newImplement*/)
  })
};

module.exports = {
    saveLoan : saveLoan,
    getSanction : getSanction
  }