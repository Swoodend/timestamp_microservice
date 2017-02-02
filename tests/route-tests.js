'use strict';
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../lib/server.js');
const dateTime = require('../lib/helpers/datetime.js');

describe('accessing the "/" route', function(){
  it('should respond with a 200', function(done){
    request(app)
      .get('/')
      .expect(200, done)
  });

  it('should send the landing page html file', function(done){
    request(app)
      .get('/')
      .expect('Content-Length', "712")
      .expect('Content-Type', /html/, done)
  });
});

describe('accessing the "/:date" route', function(){
  it('should respond with json string indicating unix/natural time given unix format', function(done){
     request(app)
      .get('/1646197200')
      .expect(200)
      .end(function(err, res){
        expect(res.text).to.eql('{"unix":"1646197200","natural":"March 02, 2022"}');
        done();
      })
  });

  it('should respond with json string indicating unix/natural time given natural format', function(done){
    request(app)
      .get('/march 02, 2022')
      .expect(200)
      .end(function(err, res){
        expect(res.text).to.eql('{"unix":"1646197200","natural":"March 02, 2022"}')
        done();
      })
  });

  it('should respond with null given bad user input', function(done){
    request(app)
      .get('/akjhfaklfjah23432')
      .expect(200)
      .end(function(err, res){
        expect(res.text).to.eql('{"unix":'+null+',"natural":'+null+'}');
      });

    request(app)
      .get('/february 31 2017')
      .expect(200)
      .end(function(err, res){
        expect(res.text).to.eql('{"unix":'+null+',"natural":'+null+'}');
      });

      request(app)
      .get('/jans 21, 2013')
      .expect(200)
      .end(function(err, res){
        expect(res.text).to.eql('{"unix":'+null+',"natural":'+null+'}');
      });

      request(app)
      .get('/jans 21 2013')
      .expect(200)
      .end(function(err, res){
        expect(res.text).to.eql('{"unix":'+null+',"natural":'+null+'}');
        done();
      });
  });
});