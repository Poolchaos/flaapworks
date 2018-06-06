import { ModuleLoader } from './module-loader';
import { Logger } from './logger';
import { DtlController } from '../controllers/dtl-controller';
import { Router } from './router';

const logger = new Logger('Flaapworks');

class Flaapworks {
  public static router = Router;
  private static dtlController: DtlController;

  public static async initialise(): Promise<any> {
    try {
      this.dtlController = await DtlController.initialise();
      await ModuleLoader.initialise();
      return true;
    } catch (e) {
      logger.error('Failed to load dtlController due to cause:', e);
    }
  }

  public static async withRouter(): Promise<any> {
    await Router.initialise();
    return true;
  }
}
export { Flaapworks };
