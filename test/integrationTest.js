let assert = require('assert');
let app = require('../server.js');
let supertest = require('supertest');
let	chai = require('chai');
let chaiHttp = require('chai-http');
var model = require('./App/features/db/model.js');

var request = supertest(app);
var expect = chai.expect;

chai.use(chaiHttp);

describe('GET /v1/getAllImplements', function() {   
    it('1. should return code 200 from getAllImplements function', function(done) {
        request.get('/v1/getAllImplements')
            .expect(200)
            .end(function(err, res){
  		    		if (err) return done(err);
  					  done();
  			    });
    });
});
