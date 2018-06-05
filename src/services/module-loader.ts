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
      logger.error('`flaap-app` has not been specified. Add `flaap-app="entryModuleName"` to your body tag to initialise app due to cause', e);
    }
  }

  private static async loadModule(moduleName: string): Promise<any> {
    logger.debug('loading `' + moduleName + '`');
    try {
      let templateId = await ModuleLoader.loadTemplate(moduleName);
      await ModuleLoader.renderTemplate(templateId);
    } catch (e) {
      throw new Error(e);
    }
  }

  private static async loadTemplate(moduleName: string): Promise<any> {
    try {
      let body: any = document.querySelector('body[flaap-app]');
      let templateId: string = `flaap-template-${moduleName}`;
      const parser = new DOMParser();
      let doc: any = parser.parseFromString(await ModuleLoader.fetch(moduleName + '.html'), 'text/html');
      let template = doc.head.firstChild;
      template.id = templateId;
      ModuleLoader.templates[templateId] = template;
      await body.appendChild(template);
    } catch (e) {
      throw new Error(e);
    }
  }

  private static async renderTemplate(templateId: string): Promise<any> {
    try {
      let template: any = document.querySelector(`#${templateId}`);
      let renderedTemplate = template.content.cloneNode(true);
      await template.parentNode.insertBefore(renderedTemplate, template.nextSibling);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  private static async parseXml(moduleName: string): Promise<any> {
    try {
      const parser = new DOMParser();
      return parser.parseFromString(await ModuleLoader.fetch(moduleName + '.html'), 'application/xml');
    } catch (e) {
      logger.error();
    }
  }

  private static bindViewModel(moduleName: string): void {
    let el: any = document.querySelector(`#flaap-template-${moduleName}`);
    el.dataset.test = 3;
  }

  private static loadViewModel(moduleName: string): void {
    //
  }

  private static fetch(ModuleName: string): any {
    try {
      return require('html-loader!../' + ModuleName);
    } catch (e) {}
  }
}
