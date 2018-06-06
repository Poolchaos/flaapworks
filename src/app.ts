import { Logger } from './services/logger';
import { Base } from './base';

const logger = new Logger('App');

export class App extends Base {

  // public test = 'says hello';
  private _some: string = 'says hello';

  constructor() {
    super();
    logger.debug('loading app');
  }

  public get test(): string {
    console.log(' ::>> this >>>> ', this);
    return this._some;
  }

  public set test(some) {
    this._some = some;
  }
}
