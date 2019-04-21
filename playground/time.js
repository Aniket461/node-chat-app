var moment = require('moment');

var date = moment();


date.add(100, 'year');

console.log(date.format('Do MMM YYYY'));

console.log(date.format('LT'))