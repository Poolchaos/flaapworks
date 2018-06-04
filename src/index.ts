import { Eventing } from './services/eventing';
import { Routing } from './services/routing';
import { Logger } from './services/logger';
import { Flaapworks } from './services/flaapworks';

Logger.logLevel = Logger.LOG_LEVELS.DEBUG;
const logger: Logger = new Logger('config');

// logger.debug('this is a test');
// logger.info('this is a test');
// logger.error('this is a test');
// new Routing();

(function() {
  Flaapworks.initialise();
})();
