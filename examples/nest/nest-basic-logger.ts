import {Injectable, LoggerService, LogLevel} from '@nestjs/common';
import {LoggerBase, LogOutput} from 'zeddy-logger';
import {ConsoleOutput, JsonOutput} from 'zeddy-logger/outputs';
import {config} from '../config';

export const LogLevelTag = {
  verbose: {name: 'log-level', value: 'verbose'},
  debug: {name: 'log-level', value: 'debug'},
  info: {name: 'log-level', value: 'info'},
  warning: {name: 'log-level', value: 'warning'},
  error: {name: 'log-level', value: 'error'},
  fatal: {name: 'log-level', value: 'fatal'},
};

@Injectable()
export class NestBasicLogger extends LoggerBase implements LoggerService {
  constructor() {
    const outputs: LogOutput[] = [];
    if (config.env === 'development') {
      outputs.push(
        new ConsoleOutput({
          transform: (logData) => {
            if (logData.data) {
              logData.message = `${new Date().toISOString()} [${logData.data['0']}] ${logData.message}`;
              delete logData.data['0'];
              // logData.data['@timestamp'] = new Date().toISOString();
              delete logData.data;
            }
            return logData;
          },
        }),
      );
    } else {
      outputs.push(
        new JsonOutput({
          transform: (logData) => {
            logData.message = `[${logData.data['0']}] ${logData.message}`;
            delete logData.data['0'];
            logData.data['@timestamp'] = new Date().toISOString();
            return logData;
          },
        }),
      );
    }
    super(outputs);
  }
  error(message: any, ...optionalParams: any[]) {
    void this.baseLog({
      tags: [LogLevelTag.error],
      data: optionalParams,
      message,
    });
  }
  debug?(message: any, ...optionalParams: any[]) {
    void this.baseLog({
      tags: [LogLevelTag.debug],
      data: optionalParams,
      message,
    });
  }
  log(message: any, ...optionalParams: any[]) {
    void this.baseLog({
      tags: [LogLevelTag.info],
      data: optionalParams,
      message,
    });
  }
  warn(message: any, ...optionalParams: any[]) {
    void this.baseLog({
      tags: [LogLevelTag.warning],
      data: optionalParams,
      message,
    });
  }
  verbose?(message: any, ...optionalParams: any[]) {
    void this.baseLog({
      tags: [LogLevelTag.verbose],
      data: optionalParams,
      message,
    });
  }
  fatal?(message: any, ...optionalParams: any[]) {
    void this.baseLog({
      tags: [LogLevelTag.fatal],
      data: optionalParams,
      message,
    });
  }
  setLogLevels?(levels: LogLevel[]) {
    void levels;
  }
}
