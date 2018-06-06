import { ChromeController } from './chrome-controller';
import { Logger } from '../services/logger';
import { Constants } from '../constants';

const logger = new Logger('DtlController');

export class DtlController {
  private static readonly controllers: any = {
    Chrome: ChromeController
  };

  public static async initialise(): Promise<any> {
    let browser: IPlatform = await DtlController.detectBrowser();
    let os = await DtlController.detectOS();
    logger.info(browser);
    logger.info(os);

    try {
      return new DtlController.controllers[browser.browserName]();
    } catch (e) {
      throw new Error(e);
    }
  }

  private static detectBrowser(): IPlatform {
    let nVer = navigator.appVersion;
    let nAgt = navigator.userAgent;
    let browserName = navigator.appName;
    let fullVersion = '' + parseFloat(navigator.appVersion);
    let majorVersion = parseInt(navigator.appVersion, 10);
    let nameOffset, verOffset, ix;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = nAgt.indexOf(Constants.BROWSER.opera)) != -1) {
      // will not work for version 10+
      browserName = Constants.BROWSER.opera;
      fullVersion = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf('Version')) != -1) fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf(Constants.BROWSER.msie.shortHand)) != -1) {
      browserName = Constants.BROWSER.msie.name;
      fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome"
    else if ((verOffset = nAgt.indexOf(Constants.BROWSER.chrome)) != -1) {
      browserName = Constants.BROWSER.chrome;
      fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset = nAgt.indexOf(Constants.BROWSER.safari)) != -1) {
      browserName = Constants.BROWSER.safari;
      fullVersion = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf('Version')) != -1) fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox"
    else if ((verOffset = nAgt.indexOf(Constants.BROWSER.firefox)) != -1) {
      browserName = Constants.BROWSER.firefox;
      fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
      browserName = nAgt.substring(nameOffset, verOffset);
      fullVersion = nAgt.substring(verOffset + 1);
      if (browserName.toLowerCase() == browserName.toUpperCase()) {
        browserName = navigator.appName;
      }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(';')) != -1) fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(' ')) != -1) fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
      fullVersion = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }

    return {
      browserName,
      fullVersion,
      majorVersion,
      appName: navigator.appName,
      userAgent: navigator.userAgent
    };
  }

  private static detectOS(): string {
    let OSName = 'Unknown OS';
    if (navigator.appVersion.indexOf('Win') != -1) OSName = Constants.OS.windows;
    if (navigator.appVersion.indexOf('Mac') != -1) OSName = Constants.OS.mac;
    if (navigator.appVersion.indexOf('X11') != -1) OSName = Constants.OS.unix;
    if (navigator.appVersion.indexOf('Linux') != -1) OSName = Constants.OS.linux;
    return OSName;
  }
}

interface IPlatform {
  browserName: string;
  fullVersion: string;
  majorVersion: number;
  appName: string;
  userAgent: any;
}
