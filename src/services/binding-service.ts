import { Constants } from '../constants';

export class BindingService {

  private static flaapTags: string[] = [Constants.FRAMEWORK_TAGS.ROUTER];

  public static identifyTemplateElements(htmlString: string): string {
    for(let tag of BindingService.flaapTags) {
      htmlString = htmlString.replace(`<${tag}>`, `<${tag} class="${tag}-template">`);
    }
    return htmlString;
  }

  public static removeTemplateIdentities(htmlString: string): string {
    for(let tag of BindingService.flaapTags) {
      htmlString = htmlString.replace(`<${tag} class="${tag}-template">`, `<${tag}>`);
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

  public static async bindClickEvents(element: HTMLElement, callback: any): Promise<any> {
    
    return true;
  }
}