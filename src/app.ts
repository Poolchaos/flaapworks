import { Logger } from './services/logger';

const logger = new Logger('App');

export class App {
  constructor() {
    logger.debug('loading app');
  }
}
