import { Eventing } from './services/eventing';
import { Router } from './services/router';
import { Logger } from './services/logger';
import { Flaapworks } from './services/flaapworks';

Logger.logLevel = Logger.LOG_LEVELS.DEBUG;
const logger: Logger = new Logger('Index');

// logger.debug('this is a test');
// logger.info('this is a test');
// logger.error('this is a test');
// new Router();

(async function() {
  logger.debug('initialising app');
  await Flaapworks.initialise();
  logger.exclaim('FLAAP-APP INITALISED');
})();
