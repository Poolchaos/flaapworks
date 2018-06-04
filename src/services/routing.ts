import { Logger } from './logger';

const logger = new Logger('Routing');

export class Routing {

  public static routes: IRoute[];

  constructor() {
    logger.debug(' ::>> initialising routing >>>> ');
  }
}

export interface IRoute {
  route: string;
  module: string;
  uri?: string;
  title?: string;
  previousRoute: IRoute;
  nextRoute: IRoute;
  canNavigateNext: boolean;
  canNavigatePrevious: boolean;
  navigate: (route: string, updateUrl?: boolean) => void;
  navigateTo: (route: string, updateUrl?: boolean) => void;
  navigateForward: () => void;
  navigateBack: () => void;
}