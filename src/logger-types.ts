export type MaybePromise<T> = T | Promise<T>;

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
  log: (logData: LogData) => MaybePromise<void>;
  transform?: (logData: LogData) => MaybePromise<LogData | null>;
};