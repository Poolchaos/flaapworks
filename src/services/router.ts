import { Logger } from './logger';

const logger = new Logger('Routing');

export class Router {
  public static routes: IRoute[];
  private static previousRoute: IRoute;
  private static nextRoute: IRoute;
  private static canNavigateNext: boolean;
  private static canNavigatePrevious: boolean;

  constructor() {
    logger.debug(' ::>> initialising routing >>>> ');
  }

  public static initialise(): void {
    // todo:
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
  route: string;
  module: string;
  uri?: string;
  title?: string;
  childRouter: Router;
  parentRouter: Router;
}
