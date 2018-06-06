import { Logger } from './services/logger';
import { Base } from './base';
import { Flaapworks } from './services/flaapworks';

const logger = new Logger('App');

export class App extends Base {

  public test: any = 'says hello';
  private router = Flaapworks.router.configure([
    { route: [''], module: '', uri: '' }
  ]);

  constructor() {
    super();
    logger.debug('loading app');
  }
}
