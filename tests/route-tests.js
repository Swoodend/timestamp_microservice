'use strict';
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../lib/server.js');



describe('access "/" route', function(){
  it('should respond with a 200', function(done){
    request(app)
      .get('/')
      .expect(200, done)
  });

  it('should send the landing page html file', function(done){
    request(app)
      .get('/')
      .expect('Content-Length', "518")
      .expect('Content-Type', /html/, done)
  });
});