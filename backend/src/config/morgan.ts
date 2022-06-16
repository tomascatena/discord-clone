import { Logger } from './logger';
import { Response } from 'express';
import morgan from 'morgan';

class LoggerStream {
  static write(text: string) {
    Logger.http(text.replace(/\n$/, ''));
  }
}

morgan.token('statusColor', (req, res: Response) => {
  const status = res.headersSent ? res.statusCode : 200;

  let color = 0; // no color
  if (status >= 500) {
    color = 31; // red
  } else if (status >= 400) {
    color = 33; // yellow
  } else if (status >= 300) {
    color = 36; // cyan
  } else if (status >= 200) {
    color = 32; // green
  }

  return `\x1b[${color}m${status}\x1b[0m`;
});

export const morganHttpLogger = morgan(
  `\x1b[33m:method\x1b[0m \x1b[36m:url\x1b[0m :statusColor :response-time ms - length|:res[content-length]`,
  { stream: LoggerStream }
);
