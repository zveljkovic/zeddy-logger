import {LogData, LogOutput, LogTag} from '../logger-base';
import * as fs from 'fs';

export interface FileOutputOptions {
  transform?: (logData: LogData) => Promise<LogData>;
  filename: string;
}

export class FileOutput implements LogOutput {
  private readonly _fd!: number;

  constructor(private opts: FileOutputOptions) {
    this._fd = fs.openSync(opts.filename, 'a');
  }

  async log(logData: LogData) {
    let message = logData.message ?? '';
    if (logData.data) {
      if (message.length > 0) message += ' ';
      message += logData.data;
    }
    message += '\n';
    fs.appendFile(this._fd, message, {encoding: 'utf-8'}, (err: NodeJS.ErrnoException | null) => {
      if (err) throw err;
    });
  }

  async transform(logData: LogData) {
    if (this.opts.transform) return this.opts.transform(logData);
    if (logData.data) {
      return {
        ...logData,
        data: JSON.stringify(logData.data),
      };
    }
    return logData;
  }
}
