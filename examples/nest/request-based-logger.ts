import {Inject, Injectable, Scope} from '@nestjs/common';
import type {AppRequest} from './app-request';
import {REQUEST} from '@nestjs/core';
import {LogOutput, StandardLogger} from 'zeddy-logger';
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

@Injectable({scope: Scope.REQUEST})
export class RequestBasedLogger extends StandardLogger {
  constructor(@Inject(REQUEST) request: AppRequest) {
    const outputs: LogOutput[] = [];
    if (config.env === 'development') {
      outputs.push(
        new ConsoleOutput({
          transform: (logData) => {
            if (logData.data) {
              logData.message +=
                '\n' +
                JSON.stringify(
                  {
                    ...logData.data,
                    requestId: request.requestId,
                  },
                  null,
                  2,
                ) +
                '\n';
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
            logData.data = {
              ...logData.data,
              requestId: request.requestId,
            };
            return logData;
          },
        }),
      );
    }
    super(outputs);
  }
}
