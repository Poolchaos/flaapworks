import { Logger } from './logger';
import { IRouter } from './../interfaces/index';

const logger = new Logger('Routing');

export class Routing {

  public static routes: IRouter;

  constructor() {
    logger.debug(' ::>> initialising routing >>>> ');
  }
}