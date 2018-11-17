// Jan 1st 1970 00:00:01 -> 1000
// new Date().getTime() -> return timestamp in milliseconds

const moment = require('moment')

// let date = new Date()
// console.log(date.getMonth())

// let date = moment()
// date.add(1, 'year').subtract(9, 'month')
// console.log(date.format('MMM Do, YYYY'))

let timestamp = moment().valueOf()
console.log(timestamp)

const createdAt = 100000
let date = moment(createdAt)
console.log(date.format('h:mm a'))