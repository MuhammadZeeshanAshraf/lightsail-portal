import path from 'path';

import { migratorFilesPath } from '../constants';
const winston = require('winston');

const logsPath = path.join(migratorFilesPath, 'logs');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  // defaultMeta: { service: 'FBDI Mapping Service' },
  transports: [
    new winston.transports.File({
      filename: logsPath + '/error.json',
      level: 'error',
      options: { flags: 'w' }
    }),
    new winston.transports.File({
      filename: logsPath + '/warn.json',
      level: 'warn',
      options: { flags: 'w' }
    }),
    new winston.transports.File({
      filename: logsPath + '/info.json',
      level: 'info',
      options: { flags: 'w' }
    }),
    new winston.transports.File({ filename: logsPath + '/combined.json', options: { flags: 'w' } })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;
