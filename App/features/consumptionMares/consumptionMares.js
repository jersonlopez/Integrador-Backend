
const axios = require('axios')
const request = require('request');



async function facultyInformation(req) {
  try {
    return await axios.post('http://172.21.0.131:3000/prod/consultainformacionacademicamares', {
      cedula: req
    })
  } catch (error) {
    console.log(error);

  }
}

async function studentInformation(req) {
  try {
    return await axios.post('http://172.21.0.131:3000/test/consultapersonamares', {
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
