import { Logger } from './logger';
import { Constants } from '../constants';
import { BindingService } from './binding-service';
import { ValueService } from './value-service';

const logger = new Logger('ActionsService');

export class ActionsService {
  
  private static flaapActions: string[] = [Constants.FRAMEWORK_ACTIONS.CLICK];

  public static async identifyActions(htmlString: string): Promise<any> {
    for(let action of ActionsService.flaapActions) {
      let replaceActionExpression = new RegExp(action, 'g');
      htmlString = htmlString.replace(replaceActionExpression, Constants.FRAMEWORK_ACTIONS.CLICK_TEMPLATE);
    }
    return htmlString;
  }

  public static async matchActions(action: any, viewModel: any, el: any, attr: string): Promise<any> {
    try {
      let actionFound = false;
      for(let prop in viewModel) {
        let value = viewModel[prop];
        if(!action) {
          return;
        }
        if(attr.includes('click')) {
          actionFound = await ActionsService.tryAddCallbackEvent('click', action, prop, el, value, attr);
        } else if(attr.includes('drag-start')) {
          el.setAttribute('draggable', 'true');
          actionFound = await ActionsService.tryAddCallbackEvent('dragstart', action, prop, el, value, attr);
        } else if(attr.includes('drag-over')) {
          actionFound = await ActionsService.tryAddCallbackEvent('dragover', action, prop, el, value, attr);
        } else if(attr.includes('drag-drop')) {
          actionFound = await ActionsService.tryAddCallbackEvent('drop', action, prop, el, value, attr);
        } else {
          actionFound = await ValueService.tryAddValueBinding(action, prop, el, value, attr); // todo: find better implementation
        }
      }
      return true;
    } catch(e) {
      logger.error('failed with cause', e);
    }
  }

  public static async tryAddCallbackEvent(eventType: string, action: string, prop: string, el: HTMLElement, value: any, attr: string): Promise<any> {
    if(action.includes('(') && action.includes(')') && prop === action.replace('()', '')) {
      el.removeAttribute(attr);
      el.addEventListener(eventType, (event: Event) => {
        try {
          value(event);
        } catch(e) {
          logger.error(`Variable ${action} failed to run due to cause:`, e);
        }
      });
      return true;
    }
    return false;
  }
}