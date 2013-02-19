var winston   = require('winston')
  , inherits  = require('util').inherits
  , graygelf  = require('graygelf')
  , Transport = winston.Transport

function GraylogTransport(options) {
  Transport.call(this, options)

  this.name = 'graylog2'

  this.client = graygelf.createClient({
    host:     options.host || 'localhost',
    port:     options.port || 12201,
    facility: options.facility
  })

  this.client.on('error', this.emit.bind('error'))
}

inherits(GraylogTransport, Transport)

GraylogTransport.prototype.log = function (level, msg, meta, cb) {
  this.client.log(level, msg, meta)

  // meh
  this.emit('logged')

  cb(null, true)
}

if (winston.transports.Graylog2) {
  throw new Error('Graylog2 transport already exists')
}

Object.defineProperty(winston.transports, 'Graylog2', {
  get: function () {
    return GraylogTransport
  },
  set: function (other) {
    throw new Error('Y U TRY TO REPLACE ME?')
  }
})

module.exports = GraylogTransport
