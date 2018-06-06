import { Logger } from './services/logger';
import { Base } from './base';
import { Flaapworks } from './services/flaapworks';

const logger = new Logger('App');

export class App extends Base {

  public test: any = 'says hello';
  private router = Flaapworks.router.configure([
    { route: ['', 'page-one'], module: 'views/page-one', uri: 'one' }
  ]);

  constructor() {
    super();
    logger.debug('loading app');
  }

  protected activate(): void {
    logger.debug('overwritten activate');
  }
}
