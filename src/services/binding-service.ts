import { Constants } from '../constants';
import { Logger } from './logger';

const logger = new Logger('BindingService');

export class BindingService {

  private static flaapTags: string[] = [Constants.FRAMEWORK_TAGS.ROUTER];
  private static flaapActions: string[] = [Constants.FRAMEWORK_ACTIONS.CLICK];

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
      htmlString = htmlString.replace(replaceActionExpression, Constants.FRAMEWORK_ACTIONS.TEMPLATE);
    }
    return htmlString;
  }

  public static removeTemplateIdentities(htmlString: string): string {
    for(let tag of BindingService.flaapTags) {
      htmlString = htmlString.replace(new RegExp(tag + '-template', 'g'), ``);
    }
    return htmlString;
  }

  public static async bindBindableValues(templateHtml: string, viewModel: any): Promise<any> {
    for(let prop in viewModel) {
      if(viewModel.hasOwnProperty(prop) && typeof viewModel[prop] !== 'function') {
        let bindableExpression = new RegExp('\\${' + prop + '}', 'g');
        templateHtml = templateHtml.replace(bindableExpression, viewModel[prop]);
      }
    }
    return templateHtml;
  }

  public static async bindClickEvents(viewModel: any): Promise<any> {
    let els: any = document.querySelectorAll(`button[${Constants.FRAMEWORK_ACTIONS.TEMPLATE}]`); // 

    try {
      for(let el of els) {
        let action = el.getAttribute(`${Constants.FRAMEWORK_ACTIONS.TEMPLATE}`);
        action = action.replace('()', '');
        await BindingService.matchActions(action, viewModel, el);
      }
    } catch(e) {}
    return true;
  }

  private static async matchActions(action: any, viewModel: any, el: any): Promise<any> {
    try {
      let actionFound = false;
      for(let prop in viewModel) {
        let callback = viewModel[prop];
        if(!action) {
          return;
        }
        if(prop === action) {
          actionFound = true;
          el.addEventListener('click', (event: Event) => {
            try {
              callback(event);
            } catch(e) {
              logger.error(`Variable ${action} failed to run due to cause:`, e);
            }
          });
        }
        el.removeAttribute(`${Constants.FRAMEWORK_ACTIONS.TEMPLATE}`);
      }
      if(!actionFound) {
        throw new Error(`Variable ${action} not found in viewModel.`);
      }
      return true;
    } catch(e) {
      logger.error('failed with cause', e);
    }
  }
}
