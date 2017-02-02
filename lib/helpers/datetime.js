'use strict';
const timestamp = require('unix-timestamp');

const formats = [
  'MMM D, YYYY',
  'MMM DD, YYYY',
  'MMMM D, YYYY',
  'MMMM DD, YYYY',
  'D MMM, YYYY',
  'DD MMM, YYYY',
  'D MMMM, YYYY',
  'DD MMMM, YYYY',
  'MMM D YYYY',
  'MMM DD YYYY',
  'MMMM D YYYY',
  'MMMM DD YYYY',
  'D MMM YYYY',
  'DD MMM YYYY',
  'D MMMM YYYY',
  'DD MMMM YYYY'
];

function unixOrNatural(dateStr){
  //returns unix if str is all digits, else returns natural
  let allDigits = new RegExp ('^\\d{1,' + dateStr.length +'}$');
  return allDigits.test(dateStr) ? 'unix' : 'natural';
}

function unixToNatural(unixStr){
  let unixstamp = parseInt(unixStr);
  return String(timestamp.toDate(unixstamp));
}

//Weds, 01 Feb 2017 21:51:43 GMT
// want Feb 01, 2017
function formatNatural(dateStr){
  let d = dateStr.split(' ');
  let monthHash = {
    'Jan' : 'January',
    'Feb' : 'February',
    'Mar' : 'March',
    'Apr' : 'April',
    'Jun' : 'June',
    'Jul' : 'July',
    'Aug' : 'August',
    'Sep' : 'September',
    'Oct' : 'October',
    'Nov' : 'November',
    'Dec' : 'December'
  };

  let formattedDate = monthHash[d[1]] + ' ' + d[2] + ',' + ' ' + d[3];
  return formattedDate;
}
formatNatural(unixToNatural('1485989419'));

module.exports = {
  unixOrNatural : unixOrNatural,
  unixToNatural: unixToNatural,
  formatNatural : formatNatural,
  formats: formats
}