const consumptionmares = require('../../consumptionMares/consumptionMares')


consumptionmares.student(1037655392).then((data) => {
console.log(data.data[0].nombre);
})

consumptionmares.faculty(25).then((data) => {
    console.log(data.data[0].codigo);
}) 