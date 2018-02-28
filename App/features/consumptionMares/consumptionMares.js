
const request = require("request");

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

  return body
  console.log(body);
});
}

module.exports = {
  faculty : facultyInformation,
  student : studentInformation
}