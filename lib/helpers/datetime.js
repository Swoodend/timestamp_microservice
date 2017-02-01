'use strict';

function unixOrNatural(dateStr){
  //returns unix if str is all digits, else returns natural
  let allDigits = new RegExp ('^\\d{1,' + dateStr.length +'}$');
  return allDigits.test(dateStr) ? 'unix' : 'natural';
}

module.exports = {
  unixOrNatural : unixOrNatural
}