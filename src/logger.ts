import { createLogger, format, transports, Logger, level } from 'winston';
import { LoggerService } from '@nestjs/common';

export class HockeyLogger implements LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.json(),
      transports: [
        new transports.Console({
          format: format.simple(),
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.log('debug', message);
  }
  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }
  warn(message: string) {
    this.logger.warn(message);
  }
  debug(message: string) {
    this.logger.debug(message);
  }
  verbose(message: string) {
    this.logger.verbose(message);
  }
}
