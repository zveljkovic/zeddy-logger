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

  public info(message: string, data?: any) {
    void this.log({tags: [LogLevel.info], data, message});
  }

  public debug(message: string, data?: any) {
    void this.log({tags: [LogLevel.debug], data, message});
  }

  public warning(message: string, data?: any) {
    void this.log({tags: [LogLevel.warning], data, message});
  }

  public error(message: string, data?: any) {
    void this.log({tags: [LogLevel.error], data, message});
  }
}
