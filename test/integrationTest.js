

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let mongoose = require("mongoose");
// let request = supertest(server);
let expect = chai.expect;

let server = require('../app');
let { resource } = require('../App/features/domain/entities/Resource')
let { save, find } = require('../App/features/domain/repository/crud')

chai.use(chaiHttp);

//Our parent block
describe.skip('Resources', () => {
  beforeEach((done) => { //Before each test we empty the database
      resource.remove({}, (err) => { 
         done();           
      });        
  });
});  

/*
 * Test the /GET route
 */
describe('/GET /v1/sports/items/', () => {
  it.skip('it should GET all the books', (done) => {
    chai.request(server)
      .get('/v1/sports/items/ciudadela')
      .end((err, res) => {
        done();
      });
  });
});

describe('/GET /v1/sports/items/:headquarters items', () => {
  it('it should GET books by headquarters', async () => {

    let resources = new resource({ headquarters: "robledo", name: "balon", quantity: 5 })

    await save(resources)

    let filter = { name: "balon", headquarters: "robledo" }
    let projection = '-__v'
    let doc = await find(resource ,filter, projection)

    if (doc.length !== 0) {
      chai.request(server)
      .get('/v1/sports/items/'+ doc.headquarters)
      .send(doc)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('headquarters');
        res.body.should.have.property('name');
        res.body.should.have.property('quantity');
        res.body.should.have.property('_id').eql(doc.id);
      });
    }  
  });
});



describe('/POST /sports/items/ items', () => {
  it.skip('it should POST a resource', async () => {

    let resources = new resource({ headquarters: "robledo", name: "balon", quantity: 5 })

    let result = await save(resources)
    expect(result.body).to.deep.equal({});
    
    // const users = await result.json();
    // expect(users).to.be.an('Array');
    // expect(users.length).to.be.equal(1);
  });
});