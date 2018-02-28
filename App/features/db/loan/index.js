let axios = require('axios')
let data = '' 




async function callResponse(){
  let respuesta =  axios.post('http://172.21.0.131:3000/test/consultapersonamares', {
    cedula: 1020474862
  })

  return respuesta
}



async function call2(){

    let response = await callResponse()
    console.log(response.data);
    
} 

call2()
