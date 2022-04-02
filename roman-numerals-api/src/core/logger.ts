import winston, { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

class Logger {

  private logger: winston.Logger;

  constructor() {
    const opts = {
      dirname: `${ process.env.APP_LOGS_DIR }/`,
      datePattern: 'YYYY-MM-DD-HH', // A string representing the moment.js date format to be used for rotating.
      maxSize: '20m', // Maximum size of the file after which it will rotate.
      maxFiles: '14d' // Maximum number of logs to keep.
    };

    this.logger = createLogger({
      level: 'info',
      format: format.json(),
      transports: [
        // - Write all logs error to 'error.log'.
        // - Write all logs with level 'info' and below to 'combined.log'
        new DailyRotateFile({
          level: 'error',
          filename: 'server-error-%DATE%.log',
          ...opts
        }),
        new DailyRotateFile({
          filename: 'server-combined-%DATE%.log',
          ...opts
        })
      ]
    });

    // If we're not in production then log to the 'console' with the format:
    // '${info.level}: ${info.message} JSON.stringify({ ...rest })'
    if (process.env.APP_ENV === 'local') {
      this.logger.add(new transports.Console({ format: format.simple() }));
    }
  }

  log(level = 'info', message: string, obj: Record<string, unknown> = null) {
    this.logger.log(level, message, obj);
  }

}

export default new Logger();
