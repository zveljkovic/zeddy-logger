
import * as process from 'process';
import type {LogData, LogOutput, MaybePromise} from '../logger-types';

export interface JsonOutputOptions {
  transform?: (logData: LogData) => MaybePromise<LogData>;
}
export class JsonOutput implements LogOutput {
  constructor(protected opts: JsonOutputOptions) {}

  async log(logData: LogData) {
    const log = {
      message: logData.message,
      level: logData.tags.filter(x => x.name === 'log-level')[0].value,
      ...logData.data,
    }
    process.stdout.write(JSON.stringify(log) + '\n');
  }

  async transform(logData: LogData) {
    if (this.opts.transform) return this.opts.transform(logData);
    return logData;
  }
}
