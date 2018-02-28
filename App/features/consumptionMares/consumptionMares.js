
const axios = require('axios')

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


function studentInformation(req){
  let options = { method: 'POST',
  url: 'http://172.21.0.131:3000/test/consultapersonamares',
  headers: 
   { 'content-type': 'application/json' },
  body: { cedula: req },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body)
  
});
}

let data = '' 




async function studentInformation(req){
  let respuesta =  axios.post('http://172.21.0.131:3000/test/consultapersonamares', {
    cedula: req
  })

  return respuesta
}



async function call2(data){

    let response = await studentInformation(data)
    //console.log(response.data)
    return response.data
    
} 

module.exports = {
  faculty : facultyInformation,
  student : call2
}
