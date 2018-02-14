let modelDevolution = require('./model')
let modelLoan = require('../features/db/loan/model') //revisar ruta
let json;

devolution = modelDevolution.getDevolution()
loan = modelLoan.getLoan()

function getSanction(req, res) {  //getloan?&&id=123456   METODO get devuelve un json con la fecha del ultimo prestamo (implemento a devolver) tipo de implemento id.
 loan.find({id: req.query.id}, '-_id -__v -name -faculty -phone -serviceRendered -attendant', function(err, doc) {                                                                
      let sizeDoc = doc.length;
      if(sizeDoc !== 0) {        
        json = doc[sizeDoc];                                     
        return;                                                                                               
      }
      res.status(200).send(json);
	});
};


function saveDevolution(req, res) {   //metodo post 
  let loanDate = (new Date(req.body.loanDate)).getTime();
  let returnDate = (new Date()).getTime()
  if((returnDate - loanDate) > 86400000){
  	let sanction = (returnDate - loanDate) * 5;
  } 
  let newDevolution = new devolution({
    id: req.body.id, typeImplement: req.body.typeImplement, observation: req.body.observation, attendant: req.body.attendant,
    timeSanction: sanction
  })

  newSanction.save(function () {
    res.send("Devolucion efectuada exitosamente" /*+ newImplement*/)
  })
};

module.exports = {
    getSanction : getSanction,
    saveDevolution : saveDevolution

  }





_____

  function getAll(req, res){ // función para obtener todas las habitaciones

  Room.find({}, '-_id -__v', function(err, doc) {
      res.status(200).jsonp(doc);
  });

};