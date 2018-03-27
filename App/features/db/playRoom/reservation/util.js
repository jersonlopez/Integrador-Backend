const { authenticacion, studentInformation } = require('../../../consumptionMares/consumptionMares')
const modelReservation = require('./model')


let reservation = modelReservation.getReservation()
let studentData

async function saveReservation(req, res) {
    let i = 0;
    await authenticacion(req.body.usuario, req.body.clave).then((data) => {
        studentData = {
            id: data.data
        }
    })

    await studentInformation(req.body.id).then((data) => {
        studentData.name = data.data[0].nombre + " " + data.data[0].apellidos
        studentData.phone = data.data[0].telefono
        studentData.email = data.data[0].emailInstitucional
    })

    let newReservation = new reservation({
        id: studentData.id, name: studentData.name, resevationDate: req.body.resevationDate, typeConsole: req.body.typeConsole,
        phone: studentData.phone, hourIn: req.body.hourIn, controlQuantity: req.body.controlQuantity,
        email: studentData.email, videoGame: req.body.videoGame, role : "Responsable"
    })
    newReservation.save(function (err, success) {
        //console.log(err)
    })

    while (i < req.body.companion.length) {

        await studentInformation(req.body.companion[i].id).then((data) => {
            studentData.name = data.data[0].nombre + " " + data.data[0].apellidos
            studentData.phone = data.data[0].telefono
            studentData.email = data.data[0].emailInstitucional
        })
        let newReservation = new reservation({
            id: req.body.companion[i].id, name: studentData.name, resevationDate: req.body.resevationDate, typeConsole: req.body.typeConsole,
            phone: studentData.phone, hourIn: req.body.hourIn, controlQuantity: req.body.controlQuantity,
            email: studentData.email, videoGame: req.body.videoGame, role : "Acompañante"
        })
        newReservation.save(function () { })
        i++
    }
    res.send({ "message": "RESERVACION GUARDADA" })
};



function getAllReservation(req, res) {
    loan.find({}, '-_id -__v', function (err, doc) {
        res.status(200).jsonp(doc)
    })
};



module.exports = {
    saveReservation,
    getAllReservation
}