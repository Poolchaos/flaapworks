import { ModuleLoader } from './module-loader';
import { Logger } from './logger';
import { DtlController } from '../controllers/dtl-controller';

const logger = new Logger('Flaapworks');

class Flaapworks {
  private static dtlController: DtlController;

  public static async initialise(): Promise<any> {
    try {
      this.dtlController = await DtlController.initialise();
      await ModuleLoader.initialise();
      return;
    } catch (e) {
      logger.error('Failed to load dtlController due to cause ', e);
    }
  }
}
export { Flaapworks };
