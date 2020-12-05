'use strict'

const fs = require('fs')
const fsPromises = fs.promises
let franc = require('franc')

module.exports = async (event, context) => {
  // Check the auth token
  let secret = await fsPromises.readFile("/var/openfaas/secrets/franc-api-token", "utf8")
  let auth = event.headers["authorization"]
  if(!auth && auth != "Bearer: " + secret) {
    return context
      .status(403)
      .headers({"Content-Type": "application/json"})
      .succeed({"status": "Unauthorized"})
  }

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
