const modelLoan = require('./model')
const modelDevolution = require('../devolution/model')
const modelRegister = require('../register/model')
const { studentInformation, facultyInformation } = require('../../consumptionMares/consumptionMares')

devolution = modelDevolution.getDevolution()
loan = modelLoan.getLoan()
register = modelRegister.getRegister()
let studentData



async function getSanction(req, res) {  //localhost:3000/v1/getDevolution   METODO get devuelve un json con la fecha del ultimo prestamo (implemento a devolver) tipo de implemento id.
  let sanctionTime;

  await studentInformation(req.body.id).then((data) => {
    studentData = {
      id : req.body.id,
      name: data.data[0].nombre + " " + data.data[0].apellidos,
      phone: data.data[0].telefono,
      email: data.data[0].emailInstitucional
    }
  })

  await facultyInformation(req.body.id).then((data) => {
    studentData.faculty = data.data[0].facultad
  })

  devolution.find({ id: req.body.id }, '-_id -__v -attendant -typeImplement -observation', function (err, doc) {
    if (doc.length > 0) {
      if (parseInt(doc[doc.length - 1].timeSanction) > 0) {
        sanctionTime = Math.ceil((parseInt(doc[doc.length - 1].timeSanction) / 86400000));  //cambiar por horario de trabajo
        res.send({ "message": "USUARIO SANCIONADO; aun tiene " + sanctionTime + " Dias de sancion" });
        return;
      }
    }
    res.send(studentData);
  });

};


function saveLoan(req, res) {
  let oldLoan;
  let oldServiceRendered;
  let newLoan = new loan({
    id: studentData.id, name: studentData.name, typeImplement: req.body.typeImplement, faculty: studentData.faculty,
    phone: studentData.phone, serviceRendered: req.body.serviceRendered, attendant: req.body.attendant, 
    email: studentData.email, loanDate: new Date().getTime()
  })
  newLoan.save(function () {
  })
  register.find({ typeImplement: req.body.typeImplement }, '-_id -__v', function (err, doc) {
    oldLoan = doc[0].quantityLoan;
    oldServiceRendered = doc[0].quantityServiceRendered;
    if (req.body.serviceRendered === 'Si') {
      oldServiceRendered = oldServiceRendered + 1
    }
    let newRegister = new register({
      typeImplement: req.body.typeImplement, quantityLoan: oldLoan + 1,
      quantityDevolution: doc[0].quantityDevolution, quantityServiceRendered: oldServiceRendered
    })
    newRegister.save(function () {
    })
    register.findOneAndRemove({ typeImplement: req.body.typeImplement, quantityLoan: oldLoan }, function (err) {
      res.send({ "message": "Prestamo efectuado exitosamente" })
    });
  });
};

function getAllLoan(req, res) {
  loan.find({}, '-_id -__v', function (err, doc) {
    res.status(200).jsonp(doc)
  })
};



module.exports = {
  saveLoan: saveLoan,
  getSanction: getSanction,
  getAllLoan: getAllLoan

}