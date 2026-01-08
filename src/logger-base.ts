import type {LogData, LogOutput} from './logger-types';

export class LoggerBase {
  constructor(private logOutputs: LogOutput[]) {}

  async log(logData: LogData) {
    for (const logOutput of this.logOutputs) {
      if (!logOutput.transform) {
        // no transform function, just log
        await logOutput.log(logData);
        continue;
      }
      // There is a transformation function
      // This might return null to prevent sending
      const transformedLogData = await logOutput.transform(logData);
      if (transformedLogData)
        await logOutput.log(transformedLogData);
    }
  }
}
