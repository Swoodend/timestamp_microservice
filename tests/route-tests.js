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
      .expect('Content-Length', "518")
      .expect('Content-Type', /html/, done)
  });
});

describe('test the unixOrNatural function', function(){
  it ('should correctly identify if date is unix or natural', function(done){
    let date1 = '1234567812';
    let date2 = 'December%2020,%202015';
    let result1 = dateTime.unixOrNatural(date1);
    let result2 = dateTime.unixOrNatural(date2);
    expect(result1).to.eql('unix');
    expect(result2).to.eql('natural');
    done();
  });
});