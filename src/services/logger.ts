import { ILogLevels } from './../interfaces/index';

export class Logger {

  public static LOG_LEVELS: ILogLevels = {
    DEBUG: 'debug',
    INFO: 'info',
    ERROR: 'error',
    NONE: 'none'
  };
  public static logLevel: string = Logger.LOG_LEVELS.NONE;

  private originator: string;

  constructor(originator: string) {
    this.originator = originator;
  }

  public debug(...args: any[]): void {
    if(Logger.logLevel === Logger.LOG_LEVELS.DEBUG) {
      console.log(`%c${this.getDateString()}: Debug - ${this.originator}:`, 'color: #5c8fe0;', ...args);
    }
  }

  public info(...args: any[]): void {
    if(Logger.logLevel === Logger.LOG_LEVELS.DEBUG) {
      console.log(`%c${this.getDateString()}: Info - ${this.originator}:`, 'color: #5ce092;', ...args);
    }
  }

  public error(...args: any[]): void {
    if(Logger.logLevel === Logger.LOG_LEVELS.DEBUG) {
      console.log(`%c${this.getDateString()}: Error - ${this.originator}:`, 'color: #d19e9e;', ...args);
    }
  }

  private getDateString(): string {
    return new Date().toISOString();
  }
}