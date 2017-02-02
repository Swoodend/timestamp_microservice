'use strict';
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../lib/server.js');
const dateTime = require('../lib/helpers/datetime.js');
const timestamp = require('unix-timestamp');
const moment = require('moment');

//some of these tests do not apply anymore as I found out about the moment.js library
//halfway through the project, good practice either way...

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

describe('test the unixOrNatural function', function(){
  it ('should correctly identify if date is unix or natural', function(){
    let date1 = '1234567812';
    let date2 = 'December%2020,%202015';
    let result1 = dateTime.unixOrNatural(date1);
    let result2 = dateTime.unixOrNatural(date2);
    expect(result1).to.eql('unix');
    expect(result2).to.eql('natural');
  });
});

describe('test the unixToNatural() function', function(){
  it('converts unix timestamp, returning natural date string', function(){
    let unix = '1485985903';
    let natural = String(dateTime.unixToNatural(unix));
    expect(natural).to.eql("Wed Feb 01 2017 16:51:43 GMT-0500 (EST)");
    expect(typeof natural).to.eql('string');
  });
});

describe('test the formatNatural() function', function(){
  it('converts a natural date string to the desired output', function(){
    let dateStr1 = 'Wed Feb 01 2017 17:50:19 GMT-0500 (EST)';
    let converted1 = dateTime.formatNatural(dateStr1);
    let dateStr2 = 'Thu Aug 06 2026 03:11:43 GMT-0500 (PST)'
    let converted2 = dateTime.formatNatural(dateStr2)

    expect(converted1).to.eql('February 01, 2017');
    expect(converted2).to.eql('August 06, 2026');
  });
});

