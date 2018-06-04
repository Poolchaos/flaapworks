import { Routing } from './services/routing';
import { Logger } from './services/logger';

console.log(' ::>>  = Logger.LOG_LEVELS.NONE >>> ', { Logger }, Logger.LOG_LEVELS);

Logger.logLevel = Logger.LOG_LEVELS.DEBUG;
const logger: Logger = new Logger('config');

logger.debug('this is a test');
logger.info('this is a test');
logger.error('this is a test');
new Routing();

export function config() {
  
}