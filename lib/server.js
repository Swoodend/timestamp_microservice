'use strict';
const express = require('express');
const app = express();
const dateTime = require('./helpers/datetime.js');
const timestamp = require('unix-timestamp');
const moment = require('moment');


app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/:date', function(req, res){
  let date = req.params.date;
  let dateFormat = dateTime.unixOrNatural(date);

  if (dateFormat === 'unix'){
    if (moment(date, 'X', true).isValid()){
      let naturalDate = dateTime.formatNatural(dateTime.unixToNatural(date));
      res.send(JSON.stringify({ unix: date, natural : naturalDate }));
    } else {
      res.send(JSON.stringify({ unix: null, natural: null}));
    }
  } else {
    //natural string logic
    if (moment(date, dateTime.formats, true).isValid()){
      let naturalDate = moment(date).format('MMMM DD, YYYY');
      let unixDate = moment(date).format('X');
      res.send(JSON.stringify({ unix: unixDate, natural: naturalDate}));
    } else {
      res.send(JSON.stringify({ unix: null, natural: null}));
    }
  }

});

app.listen(8080, function(){
  console.log('app listening on port 8080');
});

module.exports = app; //for testing