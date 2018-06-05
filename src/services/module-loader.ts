import { Logger } from './logger';

const logger = new Logger('ModuleLoader');

export class ModuleLoader {
  private static templates: any = {};

  public static initialise(): void {
    logger.info('initialising module');
    try {
      let body: HTMLElement = document.querySelector('body[flaap-app]');
      let main: string = body.getAttribute('flaap-app');
      this.loadModule(main);
    } catch (e) {
      logger.error('Failed to initialise app due to cause', e);
    }
  }

  private static async loadModule(moduleName: string): Promise<any> {
    logger.debug('loading `' + moduleName + '`');
    try {
      let templateId = await ModuleLoader.loadTemplate(moduleName);
      await ModuleLoader.renderTemplate(templateId);
    } catch (e) {
      logger.error('Failed to load module due to cause', e);
    }
  }

  private static async loadTemplate(moduleName: string): Promise<any> {
    try {
      let body: any = document.querySelector('body[flaap-app]');
      let templateId: string = `flaap-template-${moduleName}`;
      let template: HTMLElement = await ModuleLoader.parseXml(moduleName);
      template.dataset.id = templateId;
      ModuleLoader.storeTemplate(templateId, template);
      await body.appendChild(template);
      return templateId;
    } catch (e) {
      logger.error('Failed to load template due to cause', e);
    }
  }

  private static async renderTemplate(templateId: string): Promise<any> {
    try {
      let template: any = document.querySelector(`[data-id="${templateId}"]`);
      let renderedTemplate = template.content.cloneNode(true);
      await template.parentNode.insertBefore(renderedTemplate, template.nextSibling);
      return true;
    } catch (e) {
      logger.error('Failed to render template due to cause', e);
    }
  }

  private static async parseXml(moduleName: string): Promise<any> {
    try {
      const parser = new DOMParser();
      let doc: any = parser.parseFromString(await ModuleLoader.fetch(moduleName + '.html'), 'text/html');
      return doc.head.firstChild;
    } catch (e) {
      logger.error(`Failed to parse module '${moduleName}' due to cause`, e);
    }
  }

  private static storeTemplate(templateId: string, template: HTMLElement): void {
    ModuleLoader.templates[templateId] = template;
  }

  private static bindViewModel(moduleName: string): void {
    let el: any = document.querySelector(`[data-id="flaap-template-${moduleName}"]`);
    el.dataset.test = 3;
  }

  private static loadViewModel(moduleName: string): void {
    //
  }

  private static fetch(ModuleName: string): any {
    try {
      return require(`html-loader!../${ModuleName}`);
    } catch (e) {
      logger.error(`Failed to get resource ${ModuleName} due to cause`, e);
    }
  }
}
