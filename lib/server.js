const express = require('express');
const app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(8080, function(){
  console.log('app listening on port 8080');
});

module.exports = app; //for testing