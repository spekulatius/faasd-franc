'use strict'

let franc = require('franc')

module.exports = async (event, context) => {
  let response = {}

  if (event.query.query == undefined || event.query.query.length == 0) {
    response.status = 'Error'
    response.message = 'No query string provided'
  } else {
    response.status = 'Success'
    response.result = franc.all(event.query.query)
  }

  return context
    .status(200)
    .headers({"Content-Type": "application/json"})
    .succeed(response)
}
