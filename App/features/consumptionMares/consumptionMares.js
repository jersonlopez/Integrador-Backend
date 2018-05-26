
const axios = require('axios')
const request = require('request');



async function facultyInformation(req) {
  try {
    return await axios.post('http://lis.udea.edu.co/api/prod/consultainformacionacademicamares', {
      cedula: req
    })
  } catch (error) {
    console.log('ha ocurrido un error en la conexion a mares: \n' + error);

  }
}

async function studentInformation(req) {
  try {
    return await axios.post('http://lis.udea.edu.co/api/test/consultapersonamares', {
      cedula: req
    })
  } catch (error) {
    console.log('ha ocurrido un error en la conexion a mares: \n' + error);

  }
}

async function authenticacion(user, password) {
  try {
    return await axios.post('http://lis.udea.edu.co/api/prod/validarusuariooidxcn', {
      usuario: user,
      clave: password
    })
  } catch (error) {
    console.log('ha ocurrido un error en la conexion a mares: \n' + error);

  }
}

//let test = auth("sergioa.castrillon", "4350224225043").then((data)=>{console.log(data.data);})

module.exports = {
  facultyInformation,
  studentInformation,
  authenticacion
}
