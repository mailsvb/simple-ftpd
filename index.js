'use strict'

const { createServer } = require('net')

const FTPSession = require('./lib/session')

function ftpd (opts, sessionCb) {
  if (typeof opts === 'string') {
    const [ host, port ] = opts.split(':')
    opts = { host: host, port: parseInt(port, 10) }
  }

  opts = Object.assign({
    host: '0.0.0.',
    port: 21,
    root: '/data',
    maxConnections: 10,
    readOnly: true
  }, opts)

  const ftpServer = createServer()
  ftpServer.maxConnections = opts.maxConnections

  if (sessionCb) {
    ftpServer.on('connection', (socket) => {
      const session = new FTPSession(socket, {
        root: opts.root, host: opts.host, readOnly: opts.readOnly
      })
      session.accept(opts.greet).then(() => {
        sessionCb(session)
      })
    })

    ftpServer.listen(opts.port, opts.host)
  }

  return ftpServer
}

module.exports = ftpd
