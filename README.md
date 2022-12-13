# Zeddy Logger
Zeddy Logger is a simple zero-dependency logging library that integrates well with NestJS
and allows great flexibility. 

This library closely follows suggestions written in my upcoming book 'Pragmatic Node.js development: Primer in NestJS'.


### Note
As this is only a library each app should create their own version of logger, but for simple projects provided
 ```StandardLogger``` is good base class to extend.

### Basic Usage
Simple example is provided below but more advanced usage for NestJS is in example repo https://github.com/zveljkovic/zeddy-logger-example
```typescript
// logger.ts
export class Logger extends StandardLogger {
    constructor(filename: string) {
        super([
            new ConsoleOutput({
                tagToConsoleFunctionMap: [
                    {tagName: 'log-level', tagValue: 'info', consoleFunction: 'info'},
                    {tagName: 'log-level', tagValue: 'debug', consoleFunction: 'debug'},
                ],
            }),
            new FileOutput({
                filename,
            }),
        ]);
    }
}

// some code file
const logger = new Logger('logs.txt');
logger.info('test message', {a: 1, b: 2});
```

### NestJS Request Based Logger
If you want to log some additional information from NestJS http request (for example some headers),
recommended way is to enrich the request object in interceptor.

```typescript
// app-request.ts
import {Request} from "express";

export type AppRequest = Request & { randomNumberFromInterceptor: number };
```
```typescript
// request.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppRequest } from './app-request';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<AppRequest>();
    request.randomNumberFromInterceptor = Math.random() * 42;
    return next.handle();
  }
}
```
With the above we can plug it in NestJS and each request will contain ```randomNumberFromInterceptor``` 
but that could also be any value available in request.

With that value in request now we can create request scoped logger that will add 
that value to any logs made with it.

```typescript
// request-based-logger.ts
import { Inject, Injectable, Scope } from '@nestjs/common';
import { AppRequest } from './app-request';
import { REQUEST } from '@nestjs/core';
import { StandardLogger } from 'zeddy-logger';
import { ConsoleOutput, FileOutput } from 'zeddy-logger/outputs';

@Injectable({ scope: Scope.REQUEST })
export class RequestBasedLogger extends StandardLogger {
  constructor(@Inject(REQUEST) private request: AppRequest) {
    const outputs = [
      new ConsoleOutput({
        transform: async (logData) => {
          return {
            message: logData.message,
            tags: logData.tags,
            data: {
              ...logData.data,
              randomNumberFromInterceptor: request.randomNumberFromInterceptor,
            },
          };
        },
        tagToConsoleFunctionMap: [
          { tagName: 'log-level', tagValue: 'info', consoleFunction: 'info' },
          { tagName: 'log-level', tagValue: 'debug', consoleFunction: 'debug' },
        ],
      }),
      new FileOutput({
        filename: 'logs.txt',
      }),
    ];
    super(outputs);
  }
}
```


### Example project
Example project can be found on [https://github.com/zveljkovic/zeddy-logger-example](https://github.com/zveljkovic/zeddy-logger-example).
It features even more advanced usage that allows not to react to "level" of the 
log message but also on "type". This is useful if you want to 
treat logs about outbound http requests differently from textual logs.