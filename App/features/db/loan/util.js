let modelLoan = require('./model')
let modelDevolution = require('../features/db/devolution/model') //revisar ruta
let json;

devolution = modelDevolution.getDevolution()
loan = modelLoan.getLoan()

function getSanction(req, res) {  //getDevolution?&&id=123456   METODO get devuelve un json con la fecha del ultimo prestamo (implemento a devolver) tipo de implemento id.
 devolution.find({id: req.query.id}, '-_id -__v -attendant -typeImplement -observation', function(err, doc) {                                                                
      let sizeDoc = doc.length;
      if(sizeDoc !== 0) {        
        json = doc[sizeDoc];  
        if(json.timeSanction > 0){
          res.send("USUARIO SANCIONADO");
        }else{
           return;
        }                                                                                                                            
      }
      res.send("Usuario NO sancionado");
  });
};


function saveLoan(req, res) { 
  let newLoan = new loan({
    id: req.body.id,name: req.body.name, typeImplement: req.body.typeImplement, faculty: req.body.faculty,
    phone: req.body.phone, serviceRendered : req.body.serviceRendered, attendant: req.body.attendant, loanDate: new Date()
  })

  newLoan.save(function () {
    res.send("Prestamos efectuado exitosamente" /*+ newImplement*/)
  })
};

module.exports = {
    saveLoan : saveLoan,
    getSanction : getSanction
  }