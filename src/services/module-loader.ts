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
      let body: HTMLElement = document.querySelector('body[flaap-app]');
      let templateId: string = `flaap-template-${moduleName}`;
      let template: string = await ModuleLoader.fetch(moduleName + '.html');
      template = template.replace('<template>', `<template id="${templateId}">`);
      ModuleLoader.templates[templateId] = template;
      body.insertAdjacentHTML('afterbegin', template);
      return templateId;
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

  private static fetch(ModuleName: string): any {
    try {
      return require('html-loader!../' + ModuleName);
    } catch (e) {}
  }
}
