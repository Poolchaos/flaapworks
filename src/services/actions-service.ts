import { DraggableService } from './draggable-service';
import { Logger } from './logger';
import { Constants } from '../constants';
import { BindingService } from './binding-service';
import { ValueService } from './value-service';

const logger = new Logger('ActionsService');

export class ActionsService {

  public static async matchActions(action: any, viewModel: any, el: any, attr: string): Promise<any> {
    try {
      let actionFound = false;
      for(let prop in viewModel) {
        let value = viewModel[prop];
        if(!action && action !== '') {
          return;
        }
        switch(attr) {
          case Constants.FRAMEWORK.ATTRIBUTES.DRAG_START:
            el.setAttribute('draggable', 'true');
            let dragStartCallback = (event: Event) => {
              try {
                // if(value && typeof value === 'function') value(event);
                DraggableService.dragstartHandler(event);
              } catch(e) {
                logger.error(`Failed to call "DragStart"'s callback due to cause:`, e);
              }
            };
            ActionsService.tryAddCallbackEvent('dragstart', '()', '', el, dragStartCallback, attr);
            break;
          case Constants.FRAMEWORK.ATTRIBUTES.DRAG_OVER:
            let dragOverCallback = (event: Event) => {
              try {
                // if(value && typeof value === 'function') value(event);
                DraggableService.dragoverHandler(event);
              } catch(e) {
                logger.error(`Failed to call "DragOver"'s callback due to cause:`, e);
              }
            };
            ActionsService.tryAddCallbackEvent('dragover', '()', '', el, dragOverCallback, attr);
            break;
          case Constants.FRAMEWORK.ATTRIBUTES.DRAG_DROP:
            let dragDropCallback = (event: Event) => {
              try {
                // if(value && typeof value === 'function') value(event);
                DraggableService.dropHandler(event);
              } catch(e) {
                logger.error(`Failed to call "DragDrop"'s callback due to cause:`, e);
              }
            };
            ActionsService.tryAddCallbackEvent('drop', '()', '', el, dragDropCallback, attr);
            break;
          case Constants.FRAMEWORK.ATTRIBUTES.CLICK:
            ActionsService.tryAddCallbackEvent('click', action, prop, el, value, attr);
            break;
        }
      }
      return true;
    } catch(e) {
      logger.error('failed with cause', e);
    }
  }

  public static async tryAddCallbackEvent(eventType: string, action: string, prop: string, el: HTMLElement, value: any, attr: string): Promise<any> {
    if(action.includes('(') && action.includes(')') && prop === action.replace('()', '')) {
      el.addEventListener(eventType, (event: Event) => {
        try {
          value(event);
        } catch(e) {
          logger.error(`Failed to bind callback to ${action} due to cause:`, e);
        }
      });
      return true;
    }
    return false;
  }
}