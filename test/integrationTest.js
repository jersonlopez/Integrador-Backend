let assert = require('assert');
let server = require('../app');
let supertest = require('supertest');
let chai = require('chai');
let chaiHttp = require('chai-http');
// let request = supertest(server);
// let expect = chai.expect;

chai.use(chaiHttp);

// describe('GET /v1/sports/items/', function() {
//     it('1. should return code 200 from getAllImplements function', function(done) {
//         request.get('/v1/sports/items/')
//             .expect(200)
//             .end(function(err, res) {
//                 if (err) return done(err);
//                 done();
//             });
//     });
// });

/*
  * Test the /GET route
  */
 describe('/GET /v1/sports/items/', () => {
    it('it should GET all the books', (done) => {
      chai.request(server)
          .get('/v1/sports/items/ciudadela')
          .end((err, res) => {
            done();
          });
    });
});