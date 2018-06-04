// interfaces
import { IMessage } from './../interfaces/index';
// local resources
import { Base } from '../base';
import { Logger } from './../services/logger';
import { Constants } from './../constants';
// constants
const logger = new Logger('PageOne');

export class PageOne extends Base {
  constructor() {
    super();

    super.subscribe(Constants.UPDATED.TEST, (data: IMessage) => {
      logger.debug(' ::>> handling message >>>>> ', data);
    });
  }
}