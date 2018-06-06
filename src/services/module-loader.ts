import { Logger } from './logger';

const logger = new Logger('ModuleLoader');

export class ModuleLoader {
  private static templates: any = {};

  public static async initialise(): Promise<any> {
    logger.info('initialising module');
    try {
      let body: HTMLElement = document.querySelector('body[flaap-app]');
      let entry: string = body.getAttribute('flaap-app');
      await this.loadModule(entry);
      return true;
    } catch (e) {
      logger.error('Failed to initialise app due to cause:', e);
    }
  }

  private static async loadModule(moduleName: string): Promise<any> {
    logger.debug('loading `' + moduleName + '`');
    try {
      let templateId = await ModuleLoader.loadTemplate(moduleName);
      return true;
    } catch (e) {
      logger.error('Failed to load module due to cause:', e);
    }
  }

  private static async loadTemplate(moduleName: string): Promise<any> {
    try {
      let templateId: string = `flaap-template-${moduleName}`;
      let template: HTMLElement = await ModuleLoader.parseXml(moduleName);
      template.dataset.id = templateId;
      let viewModel: any = await ModuleLoader.bindViewModel(moduleName, template);
      await ModuleLoader.storeTemplate(moduleName, templateId, template, viewModel);
      await ModuleLoader.attachViewModelToTemplate(template, viewModel);
      await ModuleLoader.renderTemplate(template);
      await ModuleLoader.renderModule(templateId);
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

  private static async attachViewModelToTemplate(template: HTMLElement, viewModel: any): Promise<any> {
    logger.info('attachViewModelToTemplate > ', { template, viewModel });

    let _viewModel = await new viewModel();
    _viewModel.activate();
    logger.info(' _viewModel = ', _viewModel);

    return true;
  }

  private static renderTemplate(template: HTMLElement): boolean {
    let body: any = document.querySelector('body[flaap-app]');
    body.appendChild(template)
    return true;
  }

  private static async renderModule(templateId: string): Promise<any> {
    try {
      let template: any = document.querySelector(`[data-id="${templateId}"]`);
      let renderedTemplate = template.content.cloneNode(true);
      await template.parentNode.insertBefore(renderedTemplate, template.nextSibling);
      return true;
    } catch (e) {
      logger.error('Failed to render template due to cause:', e);
    }
  }

  private static loadViewModel(moduleName: string): void {
    //
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
