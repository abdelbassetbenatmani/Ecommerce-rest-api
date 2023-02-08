const winston = require('winston');

require('winston-mongodb');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [

    new winston.transports.File({ filename: 'error.log', level: 'error' ,format:winston.format.combine(winston.format.timestamp(),winston.format.json())}),
    new winston.transports.MongoDB({ level: 'error' ,db:process.env.DB_URL,options:{useUnifiedTopology:true},format:winston.format.combine(winston.format.timestamp(),winston.format.json())}),
  ],
});

module.exports = logger;