const axios = require('axios');

const facultyInformation = async req =>
  await axios
    .post('http://lis.udea.edu.co/api/prod/consultainformacionacademicamares', {
      cedula: req
    })
    .catch(error => {
      console.log('ha ocurrido un error en la conexion a mares: \n' + error);
    });

const studentInformation = async req =>
  await axios
    .post('http://lis.udea.edu.co/api/test/consultapersonamares', {
      cedula: req
    })
    .catch(error => {
      console.log('ha ocurrido un error en la conexion a mares: \n' + error);
    });

const authentication = async (user, password) =>
  await axios
    .post('http://lis.udea.edu.co/api/prod/validarusuariooidxcn', {
      usuario: user,
      clave: password
    })
    .catch(error => {
      console.log('ha ocurrido un error en la conexion a mares: \n' + error);
    });

module.exports = {
  facultyInformation,
  studentInformation,
  authentication
};
