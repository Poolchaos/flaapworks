import { Constants } from '../constants';
import { Logger } from './logger';

const logger = new Logger('BindingService');

export class BindingService {

  private static flaapTags: string[] = [Constants.FRAMEWORK_TAGS.ROUTER];
  private static flaapActions: string[] = [Constants.FRAMEWORK_ACTIONS.CLICK];
  private static flaapAttributes: string[] = [Constants.FRAMEWORK_ACTIONS.DRAG_START, Constants.FRAMEWORK_ACTIONS.DRAG_OVER, Constants.FRAMEWORK_ACTIONS.DRAG_DROP, Constants.FRAMEWORK_ACTIONS.CLICK_TEMPLATE, Constants.FRAMEWORK_ACTIONS.DRAG];

  public static async identifyTemplateElements(htmlString: string): Promise<any> {
    htmlString = await BindingService.identifyTags(htmlString);
    htmlString = await BindingService.identifyActions(htmlString);
    return htmlString;
  }

  private static async identifyTags(htmlString: string): Promise<any> {
    for(let tag of BindingService.flaapTags) {
      htmlString = htmlString.replace(`<${tag}>`, `<${tag} ${tag}-template>`);
    }
    return htmlString;
  }

  private static async identifyActions(htmlString: string): Promise<any> {
    for(let action of BindingService.flaapActions) {
      let replaceActionExpression = new RegExp(action, 'g');
      htmlString = htmlString.replace(replaceActionExpression, Constants.FRAMEWORK_ACTIONS.CLICK_TEMPLATE);
    }
    return htmlString;
  }

  public static removeTemplateIdentities(htmlString: string): string {
    for(let tag of BindingService.flaapTags) {
      htmlString = htmlString.replace(new RegExp(tag + '-template', 'g'), ``);
    }
    return htmlString;
  }

  public static async bindBindableValues(htmlString: string, viewModel: any): Promise<any> {
    for(let prop in viewModel) {
      if(viewModel.hasOwnProperty(prop) && typeof viewModel[prop] !== 'function') {
        let bindableExpressionBraces = new RegExp('\\${' + prop + '}', 'g');
        let bindableExpressionString = new RegExp('"' + prop + '"', 'g');
        if(htmlString.match(bindableExpressionBraces)) {
          htmlString = htmlString.replace(bindableExpressionBraces, viewModel[prop]);
        }
      }
    }
    return htmlString;
  }

  public static async bindBindables(viewModel: any): Promise<any> {
    for(let attr of BindingService.flaapAttributes) {
      let els: any = document.querySelectorAll(`[${attr}]`);
      try {
        for(let el of els) {
          let action = el.getAttribute(`${attr}`);
          await BindingService.matchActions(action, viewModel, el, attr);
        }
      } catch(e) {
        logger.error('Failed to render bindables due to cause:', e);
      }
    }
    return true;
  }

  public static async templateRepeatableItems(viewModel: any): Promise<any> {
    let attr = Constants.FRAMEWORK_ACTIONS.REPEAT;
    let el: HTMLElement = document.querySelector(`[${attr}]`);
    if(!el) return true;
    try {
      let action = el.getAttribute(`${attr}`);
      let matched = await BindingService.matchActions(action, viewModel, el, attr);
      let value = el.getAttribute(attr);
      el.removeAttribute(attr);
      el.setAttribute(Constants.FRAMEWORK_ACTIONS.REPEAT_TEMPLATE, value);
      if(matched) {
        await BindingService.templateRepeatableItems(viewModel);
        return BindingService.renderRepeatableItems();
      }
    } catch(e) {
      logger.error('Failed to render repeaters due to cause:', e);
    }
  }

  public static async renderRepeatableItems(): Promise<any> {
    try {
      let els: any = document.querySelectorAll(`[${Constants.FRAMEWORK_ACTIONS.REPEAT_TEMPLATE}]`);
      for(let el of els) {
        let repeatValue = parseInt(el.getAttribute(`${Constants.FRAMEWORK_ACTIONS.REPEAT_TEMPLATE}`)) - 1;
        for(var index = 0; index < repeatValue; index++) {
          await el.removeAttribute(`${Constants.FRAMEWORK_ACTIONS.REPEAT_TEMPLATE}`);
          let clone = el.cloneNode(true);
          await el.parentNode.insertBefore(clone, el);
        }
      }
      return true;
    } catch(e) {
      logger.error('Failed to find draggable elements', e);
    }
  }

  private static async matchActions(action: any, viewModel: any, el: any, attr: string): Promise<any> {
    try {
      let actionFound = false;
      for(let prop in viewModel) {
        let value = viewModel[prop];
        if(!action) {
          return;
        }
        if(attr.includes('click')) {
          actionFound = await BindingService.tryAddCallbackEvent('click', action, prop, el, value, attr);
        } else if(attr.includes('drag-start')) {
          el.setAttribute('draggable', 'true');
          actionFound = await BindingService.tryAddCallbackEvent('dragstart', action, prop, el, value, attr);
        } else if(attr.includes('drag-over')) {
          actionFound = await BindingService.tryAddCallbackEvent('dragover', action, prop, el, value, attr);
        } else if(attr.includes('drag-drop')) {
          actionFound = await BindingService.tryAddCallbackEvent('drop', action, prop, el, value, attr);
        } else {
          actionFound = await BindingService.tryAddValueBinding(action, prop, el, value, attr);
        }
      }
      return true;
    } catch(e) {
      logger.error('failed with cause', e);
    }
  }

  private static async tryAddCallbackEvent(eventType: string, action: string, prop: string, el: HTMLElement, value: any, attr: string): Promise<any> {
    if(action.includes('(') && action.includes(')') && prop === action.replace('()', '')) {
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

  private static async tryAddValueBinding(action: string, prop: string, el: HTMLElement, value: any, attr: string): Promise<any> {
    try {
      if(action.includes('(') && action.includes(')')) {
        return false;
      }
      if(prop === action) {
        el.setAttribute(attr, value);
        return true;
      }
      return false;
    } catch(e) {}
  }
}
