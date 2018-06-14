import { Logger } from './logger';
import { Constants } from './../constants';
import { ActionsService } from './actions-service';

const logger = new Logger('AttributesService');

export class AttributesService {
  
  private static flaapAttributes: string[] = [
    Constants.FRAMEWORK_ACTIONS.DRAG_START,
    Constants.FRAMEWORK_ACTIONS.DRAG_OVER, 
    Constants.FRAMEWORK_ACTIONS.DRAG_DROP, 
    Constants.FRAMEWORK_ACTIONS.CLICK_TEMPLATE, 
    Constants.FRAMEWORK_ACTIONS.DRAG
  ];

  public static async bindAttributes(viewModel: any): Promise<any> {
    for(let attr of AttributesService.flaapAttributes) {
      let els: any = document.querySelectorAll(`[${attr}]`);
      try {
        for(let el of els) {
          let action = el.getAttribute(`${attr}`);
          await ActionsService.matchActions(action, viewModel, el, attr);
        }
      } catch(e) {
        logger.error('Failed to render bindables due to cause:', e);
      }
    }
    return true;
  }
}