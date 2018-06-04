import { Logger } from './logger';
import { Constants } from '../constants';
import { IMessage } from '../interfaces/index';

const logger = new Logger('MessageService');

export class MessageService {

  private static handlers: any = {};

  public static subscribe(eventName: string, subscriber: string, callback: (event: IMessage) => void): void {
    logger.debug(' ::>> subscribing to  >>>> ', {
      eventName, subscriber, callback
    });
    try {
      MessageService.handlers[eventName] = MessageService.handlers[eventName] || {};
    } catch(e) {
      logger.error(` Error: Unable to add subscription to event '${eventName}' for subscriber '${subscriber}' with cause `, new Error(e));
    }
    MessageService.handlers[eventName][subscriber] = callback;
  }

  public static publish(event: any): void {
    const _message: IMessage = {
      pipe: Constants.EVENT.PIPE,
      event: event.eventName,
      originator: event.originator || 'unknown',
      payload: event.payload,
      timestamp: Date.now()
    };

    try {
      for(let subscriber in MessageService.handlers[event.eventName]) {
        if(MessageService.handlers[event.eventName].hasOwnProperty(subscriber)) {
          MessageService.handlers[event.eventName][subscriber](event);
        }
      }
    } catch(e) {
      logger.error(` Error: Failed to handle event with cause `, new Error(e));
    }
  }
}
