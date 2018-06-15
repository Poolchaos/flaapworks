import { Lifecycle } from './lifecycle';
import { Constants } from './../constants';
import { Logger } from './logger';
import { ModuleLoader } from './module-loader';

const logger = new Logger('Routing');

export class Router {
  public static routes: IRoute[];
  private static container: HTMLElement;
  private static activeRoute: IRoute;
  private static previousRoute: IRoute;
  private static nextRoute: IRoute;
  private static canNavigateNext: boolean;
  private static canNavigatePrevious: boolean;

  public static initialise(): void {
    // todo: create router component
  }

  public static async configure(routes: IRoute[]): Promise<any> {
    let container: HTMLElement = document.querySelector(`${Constants.FRAMEWORK.ROUTER}:not([${Constants.FRAMEWORK.ROUTER}-template])`);
    Router.container = container;
    Router.routes = routes;
    await Router.loadRoute();
    return true;
  }

  private static loadRoute(newRoute?: string): void {
    Router.clearContent();
    try {
      for(let route of Router.routes) {
        const _route: any = route;
        if(Array.isArray(_route.route) && _route.route.includes(newRoute || '')) {
          Router.route(_route);
          return;
        } else if(typeof _route.route === 'string' && _route.route === (newRoute || '')) {
          Router.route(_route);
          return;
        }
      }
    } catch(e) {
      logger.error('Failed to initialise initial routes due to cause:', e);
    }
    logger.error('Failed to configure router. No default route specified.');
  }

  private static clearContent(): void {
    try {
      Router.container.innerHTML = '';
    } catch(e) {
      logger.error('No container specified to clear due to cause:', e);
    }
  }

  private static async route(route: IRoute): Promise<any> {
    try {
      if(Router.activeRoute) Lifecycle.deactivate(`${Constants.FRAMEWORK.TEMPLATE}${Router.activeRoute.module}`);
      await ModuleLoader.loadTemplate(route.module, Router.container);
      Router.activeRoute = route;
    } catch(e) {
      logger.error(`Failed to route to ${route.route} due to cause:`, e);
    }
  }

  public static navigate(route: string, updateUrl?: boolean): void {
    try {
      Router.loadRoute(route);
    } catch(e) {
      logger.error(`Failed to route to ${route} due to cause:`, e);
    }
  }

  public static navigateTo(route: string, updateUrl?: boolean) {
    logger.debug('NavigateTo has not been implemented yet.');
  }

  public static navigateForward(): void {
    logger.debug('NavigateForward has not been implemented yet.');
  }

  public static navigateBack(): void {
    logger.debug('NavigateBack has not been implemented yet.');
  }
}

export interface IRoute {
  route: string | string[] | any;
  module: string;
  uri?: string;
  title?: string;
  childRouter?: Router;
  parentRouter?: Router;
}
