const mongoose = require('mongoose')

let url = 'mongodb://system:root@ds229458.mlab.com:29458/prestemosudea'

mongoose.connection.on('error', (err) => {
  if (err) {
    console.log('ERROR:', err)
  } else {
    console.log('Mongoose default connection open')
  }
})

/* mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open');
}); 
  
// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
}); */

let moon = mongoose.connect(url)

exports = moon