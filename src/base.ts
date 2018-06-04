import { Logger } from './services/logger';
import { MessageService } from './services/message-service';
import { IMessage } from './interfaces/index';

let logger: Logger;

export class Base {
  constructor() {
    logger = new Logger(this.constructor.name);
  }

  protected activate() {
    logger.debug(' Activate has not been implemented. Call super.activate(); to overwrite. ');
  }

  protected subscribe(eventName: string, callback: (event: IMessage) => void): void {
    MessageService.subscribe(eventName, this.constructor.name, callback);
  }
}