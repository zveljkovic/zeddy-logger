import {LoggerBase} from './logger-base';
import type {LogOutput} from './logger-types';

const numericLogLevel = {
  debug: 0,
  info: 1,
  warning: 2,
  error: 3,
};

export const LogLevel = {
  info: {name: 'log-level', value: 'info'},
  debug: {name: 'log-level', value: 'debug'},
  warning: {name: 'log-level', value: 'warning'},
  error: {name: 'log-level', value: 'error'},
};

export class StandardLogger extends LoggerBase {
  private minLogNumeric: number = 1;
  constructor(logOutputs: LogOutput[], minLogLevel?: keyof typeof LogLevel) {
    super(logOutputs);
    if (minLogLevel) {
      this.minLogNumeric = numericLogLevel[minLogLevel];
    }
  }


  public info(message: string, data?: any) {
    if (this.minLogNumeric > 1) return;
    void this.baseLog({tags: [LogLevel.info], data, message});
  }

  public debug(message: string, data?: any) {
    if (this.minLogNumeric > 0) return;
    void this.baseLog({tags: [LogLevel.debug], data, message});
  }

  public warning(message: string, data?: any) {
    if (this.minLogNumeric > 2) return;
    void this.baseLog({tags: [LogLevel.warning], data, message});
  }

  public error(message: string, data?: any) {
    if (this.minLogNumeric > 3) return;
    void this.baseLog({tags: [LogLevel.error], data, message});
  }
}
