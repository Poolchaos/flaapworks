import { Constants } from './../constants';
import { Logger } from './logger';
import { ModuleLoader } from './module-loader';

const logger = new Logger('Routing');

export class Router {
  public static routes: IRoute[];
  private static container: HTMLElement;
  private static previousRoute: IRoute;
  private static nextRoute: IRoute;
  private static canNavigateNext: boolean;
  private static canNavigatePrevious: boolean;

  public static initialise(): void {
    // todo: create router component
    
  }

  public static async configure(routes: IRoute[]): Promise<any> {
    // todo: define/setup routes
    let container: HTMLElement = document.querySelector(`${Constants.FRAMEWORK_TAGS.ROUTER}:not(.${Constants.FRAMEWORK_TAGS.ROUTER}-template)`);
    Router.container = container;
    Router.routes = routes;
    await Router.loadRoute('');
    return true;
  }

  private static loadRoute(newRoute: string): void {
    Router.clearContent();
    for(let route of Router.routes) {
      const _route: any = route;
      if(Array.isArray(_route.route) && _route.route.includes(newRoute)) {
        Router.route(_route.module);
        return;
      } else if(typeof _route.route === 'string' && _route.route === newRoute) {
        Router.route(_route.module);
        return;
      }
    }
    logger.error('Failed to configure router. No default route specified.');
  }

  private static clearContent(): void {
    Router.container.innerHTML = '';
  }

  private static route(module: string): void {
    ModuleLoader.loadModule(module, Router.container);
  }

  public navigate(route: string, updateUrl?: boolean): void {
    const module = Router.loadRoute(route);
  }

  public navigateTo(route: string, updateUrl?: boolean) {
    logger.debug('NavigateTo has not been implemented yet.');
  }

  public navigateForward(): void {
    logger.debug('NavigateForward has not been implemented yet.');
  }

  public navigateBack(): void {
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
