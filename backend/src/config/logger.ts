import 'winston-daily-rotate-file';
import { env } from './config';
import expressWinston from 'express-winston';
import winston from 'winston';

const CUSTOM_LEVELS = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    error: 'red',
    warn: 'italic yellow',
    info: 'bold blue',
    http: 'blue',
    debug: 'white',
  },
};

winston.addColors(CUSTOM_LEVELS.colors);

const formatToFile = winston.format.combine(
  winston.format.uncolorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.json()
);

const formatToConsole = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.prettyPrint(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.label({
    label: '[LOGGER]',
  }),
  winston.format.printf(
    (info) =>
      ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
  )
);

const DailyRotateFileForErrors = new winston.transports.DailyRotateFile({
  filename: 'logs/error/error-%DATE%.log',
  level: 'error',
});

const DailyRotateFileForInfo = new winston.transports.DailyRotateFile({
  filename: 'logs/activity/activity-%DATE%.log',
  level: 'info',
});

export const Logger = winston.createLogger({
  exitOnError: false,
  levels: CUSTOM_LEVELS.levels,
  level: env.NODE_ENV === 'development' ? 'debug' : 'warn',
  format: formatToConsole,
  transports: [new winston.transports.Console()],
});

export const LoggerToFile = winston.createLogger({
  exitOnError: false,
  levels: CUSTOM_LEVELS.levels,
  format: formatToFile,
  transports: [DailyRotateFileForErrors],
});

export const expressWinstonLogger = {
  info: expressWinston.logger({
    format: formatToFile,
    transports: [DailyRotateFileForInfo],
  }),
  error: expressWinston.logger({
    format: formatToFile,
    transports: [DailyRotateFileForErrors],
  }),
};
