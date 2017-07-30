const os = require('os')
const _ = require('lodash')
const winston = require('winston')
const WinstonCloudWatch = require('winston-cloudwatch')
const env = require('./env')
const config = require('config')
// const awsConfig = config.get('aws')

require('winston-daily-rotate-file')

let rotateLogFile = new winston.transports.DailyRotateFile({
  filename: `logs/${env}.log`,
  datePattern: 'yyyy-MM-dd.',
  prepend: true,
  level: env === 'development' ? 'debug' : 'info'
})

// let cloudWatch = new WinstonCloudWatch({
//   logGroupName: awsConfig.logGroupName,
//   logStreamName: `${env}-${os.hostname()}-${process.pid}`,
//   awsAccessKeyId: awsConfig.accessKeyId,
//   awsSecretKey: awsConfig.secretAccessKey,
//   awsRegion: awsConfig.region
// })

let transports = [
  rotateLogFile
]

if (env !== 'test') {
  transports.push(new (winston.transports.Console)({
    colorize: true
  }))
  // transports.push(cloudWatch)
}

let logger = new (winston.Logger)({
  transports: transports
})

logger.stream = {
  write: function (message, encoding) {
    if (!_.isEmpty(message)) {
      message = _.trim(message)
      logger.info(message)
    }
  }
}

module.exports = logger
