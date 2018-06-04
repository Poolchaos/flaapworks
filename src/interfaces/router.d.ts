export interface IRouter {
  routes: IRoute[];
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