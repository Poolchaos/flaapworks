import { Logger } from './logger';
import { Constants } from '../constants';
import { BindingService } from './binding-service';

const logger = new Logger('ModuleLoader');

export class ModuleLoader {
  private static templates: any = {};

  public static async initialise(): Promise<any> {
    try {
      let container: HTMLElement = document.querySelector('body[flaap-app]');
      let entry: string = container.getAttribute('flaap-app');
      await this.loadModule(entry, container);
      return true;
    } catch (e) {
      logger.error('Failed to initialise app due to cause:', e);
    }
  }

  public static async loadModule(moduleName: string, container: HTMLElement): Promise<any> {
    logger.info('initialising module `' + moduleName + '`');
    try {
      let templateId = await ModuleLoader.loadTemplate(moduleName, container);
      return true;
    } catch (e) {
      logger.error('Failed to load module due to cause:', e);
    }
  }

  private static async loadTemplate(moduleName: string, container: HTMLElement): Promise<any> {
    try {
      let templateId: string = `flaap-template-${moduleName}`;
      if(ModuleLoader.templates[templateId]) {
        ModuleLoader.rerenderModule(templateId, container);
        return;
      }
      let template: HTMLElement = await ModuleLoader.parseXml(moduleName, templateId);
      let viewModel: any = await ModuleLoader.bindViewModel(moduleName, template);
      await ModuleLoader.renderTemplate(template, container);
      await ModuleLoader.renderModule(templateId, viewModel);
      return true;
    } catch (e) {
      logger.error('Failed to load template due to cause:', e);
    }
  }

  private static async rerenderModule(templateId: string, container: HTMLElement): Promise<any> {
    await ModuleLoader.renderTemplate(ModuleLoader.templates[templateId].template, container);
    ModuleLoader.renderModule(templateId, ModuleLoader.templates[templateId].viewModel);
  }

  private static async parseXml(moduleName: string, templateId: string): Promise<any> {
    try {
      const parser = new DOMParser();
      let htmlString = await ModuleLoader.fetch(moduleName).asHtml();
      htmlString = BindingService.identifyTemplateElements(htmlString);
      let doc: any = parser.parseFromString(htmlString, 'text/html');
      let script = document.createElement('script');
      script.id = templateId;
      script.type = 'text/template';
      script.appendChild(doc.head.firstChild.content);
      return script;
    } catch (e) {
      logger.error(`Failed to parse module '${moduleName}' due to cause:`, e);
    }
  }

  private static bindViewModel(moduleName: string, template: HTMLElement): void {
    let ts = ModuleLoader.fetch(moduleName).asTs();
    try {
      for(let _class in ts) {
        if(ts.hasOwnProperty(_class) && typeof ts[_class] === 'function') {
          return module = ts[_class];
        }
      }
    } catch(e) {
      logger.error('Failed to initialise class due to ', e);
    }
  }

  private static storeTemplate(templateId: string, template: string, viewModel: any): boolean {
    try {
      if(ModuleLoader.templates[templateId]) {
        throw new Error(`Duplicate module '${templateId.replace('flaap-template-', '')}' detected`);
      }
      ModuleLoader.templates[templateId] = { template, viewModel };
      return true;
    } catch(e) {
      logger.error(`Failed to create template due to cause:`, e);
    }
  }

  private static renderTemplate(template: HTMLElement, container: HTMLElement): boolean {
    container.appendChild(template)
    return true;
  }

  private static async renderModule(templateId: string, viewModel: any): Promise<any> {
    try {
      let template: any = document.querySelector(`[id="${templateId}"]`);
      let templateHtml = template.innerHTML;
      let renderedTemplate = await ModuleLoader.attachViewModelToTemplate(templateId, templateHtml, viewModel);
      ModuleLoader.activeteLifecycleStep(templateId, Constants.LIFE_CYCLE.ACTIVATE);
      const parser = new DOMParser();
      let doc: any = parser.parseFromString(renderedTemplate, 'text/html')
      await template.parentNode.insertAdjacentHTML('afterbegin', doc.body.innerHTML);
      ModuleLoader.activeteLifecycleStep(templateId, Constants.LIFE_CYCLE.ATTACHED);
      return true;
    } catch (e) {
      logger.error('Failed to render template due to cause:', e);
    }
  }

  private static async attachViewModelToTemplate(templateId: string, templateHtml: any, viewModel: any): Promise<any> {
    let _viewModel = await new viewModel();
    await ModuleLoader.storeTemplate(templateId, templateHtml, _viewModel);
    templateHtml = await BindingService.bindBindableValues(templateHtml, _viewModel);
    templateHtml = await BindingService.removeTemplateIdentities(templateHtml);
    return templateHtml;
  }

  private static activeteLifecycleStep(templateId: string, step: string): void {
    try {
      ModuleLoader.templates[templateId].viewModel[step]();
    } catch(e) {
      logger.error(`Failed to initialise lifecycle method '${step}' due to cause:`, e);
    }
  }

  private static fetch(ModuleName: string): any {
    return {
      asHtml: () => {
        try {
          return require(`html-loader!../${ModuleName}.html`);
        } catch (e) {
          logger.error(`Failed to get html resource ${ModuleName} due to cause:`, e);
        }
      },
      asTs: () => {
        try {
          return require(`../${ModuleName}.ts`);
        } catch (e) {
          logger.error(`Failed to get ts resource ${ModuleName} due to cause:`, e);
        }
      }
    };
  }
}
