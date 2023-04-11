import winston from 'winston';

const createLogger = (serviceName: string) =>
  winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ level, message, service, timestamp }) => {
        return `[${timestamp}] [${level.toUpperCase()}] ${service}: ${message}`;
      }),
    ),
    defaultMeta: { service: serviceName },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

export const logger = createLogger('review-service');
