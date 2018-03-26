
const axios = require('axios')
const request = require('request');



async function facultyInformation(req) {
  try {
    return await axios.post('http://lis.udea.edu.co/api/prod/consultainformacionacademicamares', {
      cedula: req
    })
  } catch (error) {
    console.log(error);

  }
}

async function studentInformation(req) {
  try {
    return await axios.post('http://lis.udea.edu.co/api/test/consultapersonamares', {
      cedula: req
    })
  } catch (error) {
    console.log(error);

  }
}

module.exports = {
  facultyInformation,
  studentInformation
}
