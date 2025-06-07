export type LogTag = {
  name: string;
  value: string;
};

export type LogData = {
  message: string;
  data: any;
  tags: LogTag[];
};

export type LogOutput = {
  log: (logData: LogData) => Promise<void>;
  transform?: (logData: LogData) => Promise<LogData | null>;
};

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
