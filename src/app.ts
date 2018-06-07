import { Logger } from './services/logger';
import { Base } from './base';
import { Flaapworks } from './services/flaapworks';

const logger = new Logger('App');

export class App extends Base {

  public test: any = 'says hello';

  constructor() {
    super();
  }

  protected attached(): void {
    Flaapworks.router.configure([
      { route: ['', 'page-one'], module: 'views/pageone/page-one', uri: 'one' },
      { route: 'page-two', module: 'views/pagetwo/page-two', uri: 'two' }
    ])
  }

  private pageOne(event: Event): void {
    Flaapworks.router.navigate('page-one');
  }

  private pageTwo(event: Event): void {
    Flaapworks.router.navigate('page-two');
  }
}
