import {LoggerBase} from './logger-base';
import type {LogOutput} from './logger-types';

export const LogLevel = {
  info: {name: 'log-level', value: 'info'},
  debug: {name: 'log-level', value: 'debug'},
  warning: {name: 'log-level', value: 'warning'},
  error: {name: 'log-level', value: 'error'},
};

export class StandardLogger extends LoggerBase {
  constructor(logOutputs: LogOutput[]) {
    super(logOutputs);
  }

  public info(message: string, data?: any) {
    void this.baseLog({tags: [LogLevel.info], data, message});
  }

  public debug(message: string, data?: any) {
    void this.baseLog({tags: [LogLevel.debug], data, message});
  }

  public warning(message: string, data?: any) {
    void this.baseLog({tags: [LogLevel.warning], data, message});
  }

  public error(message: string, data?: any) {
    void this.baseLog({tags: [LogLevel.error], data, message});
  }
}
