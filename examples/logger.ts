import {StandardLogger} from '../src';
import {ConsoleOutput} from '../src/outputs/outputs';
import {FileOutput} from '../src/outputs/outputs';

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
