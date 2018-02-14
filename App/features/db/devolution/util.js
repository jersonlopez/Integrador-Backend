let modelDevolution = require('./model')
let modelLoan = require('../loan/model')

devolution = modelDevolution.getDevolution()
loan = modelLoan.getLoan()

function getSanction(req, res) {  //getLoan/?id=123456   METODO get devuelve un json con la fecha del ultimo prestamo (implemento a devolver) tipo de implemento id.
 loan.find({id: req.query.id}, '-_id -__v -name -faculty -phone -serviceRendered -attendant', function(err, doc) {                                                                
      if(doc.length > 0) {    
        res.status(200).send(doc[doc.length - 1]);                                                                                    
      }else{
        res.send("Este usuario no tiene pendiente ningun prestamo");    
      }
	});
}; 
/*devuelve Lo cual se mete en el schema de devolution para calcular la sancion
{
    "id": "1234",
    "typeImplement": "bicicleta",
    "loanDate": 1519620089224"
}*/

function saveDevolution(req, res) {   //metodo post 
  let loanDate = req.body.loanDate;
  let returnDate = (new Date()).getTime();
  let sanction, sanctionTime;
  if((returnDate - loanDate) > 86400000){ //milisegundo en un dia  CAMBIAAAA
    sanction = (returnDate - loanDate) * 5;
  }else{
    sanction = 0;
  }
  let newDevolution = new devolution({
    id: req.body.id, typeImplement: req.body.typeImplement, observation: req.body.observation, attendant: req.body.attendant,
    timeSanction: sanction
  })
  if (sanction > 0){
    sanctionTime = Math.floor((sanction/86400000) +1);
    newDevolution.save(function () {
      res.send("Devolucion efectuada exitosamente, SANCION DE: " + sanctionTime + " dias."/*+ newImplement*/)
    })
  }else{
    newDevolution.save(function () {
      res.send("Devolucion efectuada exitosamente" /*+ newImplement*/)
    })
  }
};

module.exports = {
    getSanction : getSanction,
    saveDevolution : saveDevolution
  }