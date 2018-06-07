// interfaces
// local resources
import { Base } from '../../base';
import { Logger } from './../../services/logger';
import { Constants } from './../../constants';
import { IMessage } from '../../services/eventing';
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