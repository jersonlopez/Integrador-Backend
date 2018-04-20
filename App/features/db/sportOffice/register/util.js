let modelRegister = require ('./model')

register = modelRegister.getRegister()  



function getAllRegister (req, res) {
    register.find({}, '-_id -__v ', function (err, doc) {
      res.status(200).jsonp(doc)
  });
}

module.exports = { 
  getAllRegister : getAllRegister
}


