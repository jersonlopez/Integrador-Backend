let modelImplement = require('./model')
let modelRegister = require('../register/model')

implement = modelImplement.getImplements()
register = modelRegister.getRegister()

function saveImplements(req, res) { // función para guardar implemento
  implement.find( {typeImplement: req.body.typeImplement}, '-_id -__v', function (err, doc) {
   
    //console.log(implement);
    
  
 /*  if(doc.length !== 0){
    let updateQuantity;
    let oldQuantity;
    oldQuantity = doc[0].quantity;
    updateQuantity = doc[0].quantity + req.body.quantity;
    let Implement = new implement({
      typeImplement : req.body.typeImplement, quantity : updateQuantity
    })
    Implement.save(function () {
      res.send({"message":"Actualizada cantidad de " + req.body.typeImplement})
    })
    implement.findOneAndRemove({typeImplement:req.body.typeImplement, quantity: oldQuantity}, function(err) {
    });
  }else{ */

    let Register = new register({
      typeImplement: req.body.typeImplement, quantityLoan: 0, quantityDevolution: 0, quantityServiceRendered: 0
    })
    Register.save(function () {
      res.send({"message":"Implemento guardado exitosamente"})
    })
    
    let Implement = new implement({
      typeImplement : req.body.typeImplement, quantity : req.body.quantity
    })
    //console.log(Implement);
    
    Implement.save(function (err) {
      console.log(err);
      
    })
//} 
  
  });
};

function getAllImplements (req, res) {
  implement.find({}, '-_id -__v', function (err, doc) {
    res.status(200).jsonp(doc)
  })
};


function deleteImplement(req, res){
  implement.findOneAndRemove({typeImplement:req.params.typeImplement}, function(err) {
    if(!err) {
        res.send({"message":"Implemento eliminado correctamente"});
    } 
  });
}

module.exports = { // Exporta todos los metodos
  saveImplements: saveImplements,
  getAllImplements: getAllImplements,
  deleteImplement: deleteImplement
}
