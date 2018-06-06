import { Logger } from './logger';

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
      let template: HTMLElement = await ModuleLoader.parseXml(moduleName);
      template.dataset.id = templateId;
      let viewModel: any = await ModuleLoader.bindViewModel(moduleName, template);
      await ModuleLoader.storeTemplate(moduleName, templateId, template, viewModel);
      await ModuleLoader.renderTemplate(template, container);
      await ModuleLoader.renderModule(templateId, viewModel);
      return true;
    } catch (e) {
      logger.error('Failed to load template due to cause:', e);
    }
  }

  private static async parseXml(moduleName: string): Promise<any> {
    try {
      const parser = new DOMParser();
      let doc: any = parser.parseFromString(await ModuleLoader.fetch(moduleName).asHtml(), 'text/html');
      return doc.head.firstChild;
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

  private static storeTemplate(moduleName: string, templateId: string, template: HTMLElement, viewModel: any): boolean {
    try {
      if(ModuleLoader.templates[templateId]) {
        throw new Error(`Duplicate module '${moduleName}' detected`);
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
      let template: any = document.querySelector(`[data-id="${templateId}"]`);
      let renderedTemplate = template.content.cloneNode(true);
      renderedTemplate = await ModuleLoader.attachViewModelToTemplate(renderedTemplate, viewModel);
      await template.parentNode.insertBefore(renderedTemplate, template.nextSibling);
      return true;
    } catch (e) {
      logger.error('Failed to render template due to cause:', e);
    }
  }

  private static async attachViewModelToTemplate(template: HTMLElement, viewModel: any): Promise<any> {
    let _viewModel = await new viewModel();
    await _viewModel.activate();
    for(let prop in _viewModel) {
      if(_viewModel.hasOwnProperty(prop) && typeof _viewModel[prop] !== 'function') {
        let bindableExpression = new RegExp('\\${' + prop + '}', 'g');
        template.textContent = template.textContent.replace(bindableExpression, _viewModel[prop]);
      }
    }
    await _viewModel.attached();
    return template;
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
