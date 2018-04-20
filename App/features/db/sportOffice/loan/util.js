const modelLoan = require('./model')
const modelDevolution = require('../devolution/model')
const modelRegister = require('../register/model')
const { studentInformation, facultyInformation } = require('../../../consumptionMares/consumptionMares')

let devolution = modelDevolution.getDevolution()
let loan = modelLoan.getLoan()
let register = modelRegister.getRegister()
let studentData



async function getSanction(req, res) {  //localhost:3000/v1/getDevolution   METODO get devuelve un json con la fecha del ultimo prestamo (implemento a devolver) tipo de implemento id.
  let sanctionTime;

  await studentInformation(req.body.id).then((data) => {

    if (data.data.length == 0) {
      res.send({ "message": "Por favor ingrese una cedula valida" })
    } else {
      studentData = {
        id: req.body.id,
        name: data.data[0].nombre + " " + data.data[0].apellidos,
        phone: data.data[0].telefono,
        email: data.data[0].emailInstitucional
      }
    }
  })

  await facultyInformation(req.body.id).then((data) => {
    studentData.faculty = data.data[0].facultad
  })

  devolution.find({ id: req.body.id }, '-_id -__v -attendant -typeImplement -observation', function (err, doc) {
    if (doc.length > 0) {
      let timeSanction = doc[doc.length - 1].timeSanction
      if (parseInt(timeSanction) > 0) {
        res.send({ "message": "USUARIO SANCIONADO; aun tiene " + timeSanction + " Dias de sancion" });
        return
      }
    }
    if (err) {
      console.log(err);
    }
    res.send(studentData);
  });

};


function saveLoan(req, res) {
  let oldLoan;
  let oldServiceRendered, oldQuantityDevolution;
  let newLoan = new loan({
    id: studentData.id, state : "Activo", name: studentData.name, typeImplement: req.body.typeImplement, faculty: studentData.faculty,
    phone: studentData.phone, attendant: req.body.attendant,email: studentData.email, loanDate: new Date().getTime()
  })
  newLoan.save(function (err, success) {
    console.log(err);
  })
  register.find({ typeImplement: req.body.typeImplement }, '-__v', function (err, doc) {


    register.findOneAndUpdate({ _id: doc[0]._id }, { $set: { quantityLoan: doc[0].quantityLoan + 1 } }, function (err) {
      res.send({ "message": "Prestamo efectuado exitosamente" })
    });

  });
};



function getAllLoan(req, res) {
  loan.find({}, '-_id -__v', function (err, doc) {
    res.status(200).jsonp(doc)
  })
};

function getActualLoans(req, res) {
  loan.find({state: "Activo"}, '-_id -__v', function (err, doc) {
    res.status(200).jsonp(doc)
  })
};



module.exports = {
  saveLoan: saveLoan,
  getSanction: getSanction,
  getAllLoan: getAllLoan,
  getActualLoans : getActualLoans

}