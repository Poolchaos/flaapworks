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
      { route: ['', 'desktop'], module: 'views/desktop/desktop', uri: 'Flaapworks' },
      { route: 'page-two', module: 'views/pagetwo/page-two', uri: 'two' }
    ])
  }

  private desktop(event: Event): void {
    Flaapworks.router.navigate('desktop');
  }

  private pageTwo(event: Event): void {
    Flaapworks.router.navigate('page-two');
  }
}
