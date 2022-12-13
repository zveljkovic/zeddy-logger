import {Logger} from './logger';

const main = async () => {
  const logger = new Logger('logs.txt');
  logger.info('test message', {a: 1, b: 2});
};

main();
