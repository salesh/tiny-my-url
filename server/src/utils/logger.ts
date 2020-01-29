import winston from 'winston';
import * as dotenv from 'dotenv';
dotenv.config();

const myFormat = winston.format.printf(({ timestamp, level, message, meta }) => (
    `${new Date(timestamp).toLocaleDateString()} ${new Date(timestamp).toLocaleTimeString()} - ${level}: ${message} ${meta ? JSON.stringify(meta) : ''}`
));

const options: winston.LoggerOptions = {
    format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.splat(), myFormat),
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
            handleExceptions: true
        }),
        new winston.transports.File({ filename: 'debug.log', level: 'debug' })
    ]
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== 'production') {
    logger.debug('Logging initialized at debug level');
}

export default logger;