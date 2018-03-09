const consumptionmares = require('../../consumptionMares/consumptionMares')


/* let answer = consumptionmares.student(1037655392).then((data) => {
console.log(data.data);

}) 
console.log(55)

let answer = consumptionmares.student(1037655392);
console.log(answer.body);*/

var http = require("http");

var options = {
  "method": "POST",
  "hostname": "172.21.0.131",
  "port": "3000",
  "path": "/prod/consultainformacionacademicamares",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
    "postman-token": "08a289f8-ed4c-6e68-a6d2-5e89d68c9a10"
  }
};

let req = http.request(options, function (res) {
  let chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    let body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ cedula: '1036657317' }));
req.end();
