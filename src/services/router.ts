import { Logger } from './logger';
import { ModuleLoader } from './module-loader';

const logger = new Logger('Routing');

export class Router {
  public static routes: IRoute[];
  private static previousRoute: IRoute;
  private static nextRoute: IRoute;
  private static canNavigateNext: boolean;
  private static canNavigatePrevious: boolean;

  public static initialise(): void {
    // todo: create router component
    
  }

  public static async configure(routes: IRoute[]): Promise<any> {
    // todo: define/setup routes
    await Router.loadInitialRoute(routes);
    return true;
  }

  private static loadInitialRoute(routes: IRoute[]): void {
    let container: HTMLElement = document.querySelector('flaap-router');
    for(let route of routes) {
      const _route: any = route;
      if(Array.isArray(_route.route) && _route.route.includes('')) {
        ModuleLoader.loadModule(_route.module, container);
        return;
      } else if(typeof _route.route === 'string' && _route.route === '') {
        ModuleLoader.loadModule(_route.module, container);
        return;
      }
    }
    logger.error('Failed to configure router. No default route specified.');
  }

  public static navigate(route: string, updateUrl?: boolean): void {
    logger.debug('Navigate has not been implemented yet.');
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
