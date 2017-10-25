var moment = require('moment');

// Jan 1st 1970 00:00:00 am

// var date = new Date();
// console.log(date.getMonth())

// var date = moment();
// date.add(100,'year').subtract(9,'months');
// console.log(date.format('MMM Do, YYYY'))

// 10:35
//6:01 am
// var date = moment();
// console.log(date.format('h:mm a'))


var someTimestamp =  moment().valueOf();
console.log(someTimestamp);

var createdAt = someTimestamp;
var date = moment(createdAt);
console.log(date.format('MMM Do, YYYY h:mm a'))