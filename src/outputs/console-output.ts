import {LogData, LogOutput, LogTag} from '../logger-base';

export type ConsoleLogFunctions = 'info' | 'error' | 'debug' | 'log';
export type ConsoleFunctionMap = {
  tagName: LogTag['name'];
  tagValue: LogTag['value'];
  consoleFunction: ConsoleLogFunctions;
};
export interface ConsoleOutputOptions {
  transform?: (logData: LogData) => Promise<LogData>;
  tagToConsoleFunctionMap?: ConsoleFunctionMap[];
}
export class ConsoleOutput implements LogOutput {
  constructor(protected opts: ConsoleOutputOptions) {}

  async log(logData: LogData) {
    let logFunction = 'log';
    if (this.opts.tagToConsoleFunctionMap) {
      for (const tag of logData.tags) {
        const consoleFunctionMap = this.opts.tagToConsoleFunctionMap.filter(
          (x) => x.tagName === tag.name && x.tagValue === tag.value,
        );
        if (consoleFunctionMap.length > 0) {
          logFunction = consoleFunctionMap[0].consoleFunction;
        }
      }
    }
    if (logData.data) return console[logFunction as ConsoleLogFunctions](logData.message, logData.data);
    return console[logFunction as ConsoleLogFunctions](logData.message);
  }

  async transform(logData: LogData) {
    if (this.opts.transform) return this.opts.transform(logData);
    return logData;
  }
}
