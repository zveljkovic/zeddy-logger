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
      let finalLogData = logData;
      if (logOutput.transform) {
        // This might return null to prevent sending
        finalLogData = await logOutput.transform(logData);
      }
      if (finalLogData) await logOutput.log(finalLogData);
    }
  }
}
