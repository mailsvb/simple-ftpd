'use strict'
/*
---
QUIT:
  rfc: 'https://tools.ietf.org/html/rfc2389'
  help: QUIT (Server closes all connections)
  auth: true
  data: false
*/

function QUIT () {
  this.emit('close')
  return this.respond(221, 'Goodbye!')
}

exports.auth = true
exports.handler = QUIT
exports.help = 'QUIT (Goodbye!)'