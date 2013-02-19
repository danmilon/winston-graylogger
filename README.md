```javascript
var winston = require('winston')

require('winston-graylogger')

var log = new (winston.Logger)({
  levels:     winston.config.syslog.levels,
  transports: [],
})

log.add(winston.transports.Graylog2, {
  host:     'localhost',
  facility: 'whatever'
})

log.error('OH MA GOD')
```
