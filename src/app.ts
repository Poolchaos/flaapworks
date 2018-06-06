import { Logger } from './services/logger';
import { Base } from './base';

const logger = new Logger('App');

export class App extends Base {

  public test: any = 'says hello';

  constructor() {
    super();
    logger.debug('loading app');
  }
}
