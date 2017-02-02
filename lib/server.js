'use strict';
const express = require('express');
const app = express();
const dateTime = require('./helpers/datetime.js');
const timestamp = require('unix-timestamp');


app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/:date', function(req, res){
  let date = req.params.date;
  let dateFormat = dateTime.unixOrNatural(date);

  if (dateFormat === 'unix'){
    let naturalDate = dateTime.formatNatural(dateTime.unixToNatural(date));
    res.send(JSON.stringify({ unix: date, natural : naturalDate }));
  } else {
    //natural string logic
  }

});

app.listen(8080, function(){
  console.log('app listening on port 8080');
});

module.exports = app; //for testing