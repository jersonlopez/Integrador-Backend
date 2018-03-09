
const axios = require('axios')
const request = require('request');

function facultyInformation(req) {
  let options = {
    method: 'POST',
    url: 'http://172.21.0.131:3000/prod/consultainformacionacademicamares',
    headers:
      { 'content-type': 'application/json' },
    body: { cedula: req },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    return body
    console.log(body);
  });
}


async function studentInformation1(req) {
  let options = {
    method: 'POST',
    url: 'http://172.21.0.131:3000/test/consultapersonamares',
    headers:
      { 'content-type': 'application/json' },
    body: { cedula: req },
    json: true
  };

  await request(options, function (error, response, body) {
    if (error) throw new Error(error);
    //console.log(body)

  });
   console.log(request.Request);
   
}

//studentInformation1(1037655392)




async function studentInformation(req) {
  try {
    await axios.post('http://172.21.0.131:3000/test/consultapersonamares', {
      cedula: req
    })
    return respuesta
  } catch (error) {
    console.log(error);

  }
}



async function call2(data) {

  let response = await studentInformation1(data)
  //console.log(response.data)
  //return response.data

}

call2(1037655392)

module.exports = {
  faculty: facultyInformation,
  student: studentInformation1
}
