import {LoggerBase, LogOutput} from './logger-base';

export const LogLevel = {
  info: {name: 'log-level', value: 'info'},
  debug: {name: 'log-level', value: 'debug'},
  warning: {name: 'log-level', value: 'warning'},
  error: {name: 'log-level', value: 'debug'},
};

export class StandardLogger extends LoggerBase {
  constructor(logOutputs: LogOutput[]) {
    super(logOutputs);
  }

  info(message: string, data?: any) {
    this.log({tags: [LogLevel.info], data, message});
  }

  debug(message: string, data?: any) {
    this.log({tags: [LogLevel.debug], data, message});
  }

  warning(message: string, data?: any) {
    this.log({tags: [LogLevel.warning], data, message});
  }

  error(message: string, data?: any) {
    this.log({tags: [LogLevel.error], data, message});
  }
}
