// local resources
import { Base } from '../../base';
import { Logger } from './../../services/logger';
import { Constants } from './../../constants';
import { IMessage } from '../../services/eventing';
import './desktop.css';
// constants
const logger = new Logger('Desktop');

export class Desktop extends Base {

  public static ICON_SIZES: any = { 
    SMALL: { CLASS: 'small', DIMENSION: 48 }, MEDIUM: { CLASS: 'medium', DIMENSION: 85 }, LARGE: { CLASS: 'large', DIMENSION: 125 }
  };
  private iconSize: string = Desktop.ICON_SIZES.SMALL.CLASS;
  private iconDimension = Desktop.ICON_SIZES.SMALL.DIMENSION;
  private rows: number = 3;
  private columns: number = 5;

  constructor() {
    super();

    var w = window,
    d = document,
    e = d.documentElement,
    g = document.body,
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    logger.info(' >>>>> window.screen ', x + ' × ' + y);
    this.columns = Math.floor(x / this.iconDimension);
    logger.info(' >>>>> this.columns ', this.columns);
    this.rows = Math.floor(y / this.iconDimension);
    logger.info(' >>>>> this.rows ', this.rows);

    super.subscribe(Constants.UPDATED.TEST, (data: IMessage) => {
      logger.debug(' ::>> handling message >>>>> ', data);
    });
  }

  protected activate(): void {
    
  }

  protected attached(): void {
    // let container: HTMLElement = document.querySelector('.js-desktop');
    // logger.info(' >>>>> window.screen ', window.screen);
    // logger.info(' >>>>> window.screen.availHeight ', window.screen.availHeight);
    // logger.info(' >>>>> window.screen.availWidth ', window.screen.availWidth);
  }

  private setDimension(size: string): void {
    try {
      this.iconSize = Desktop.ICON_SIZES[size.toUpperCase()].CLASS;
      this.iconDimension = Desktop.ICON_SIZES[size.toUpperCase()].DIMENSION;
    } catch(e) {
      logger.error(`Failed to chane desktop icon dimentions to ${size} due to cause:`, e);
    }
  }
}