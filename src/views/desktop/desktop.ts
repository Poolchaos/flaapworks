// local resources
import { Base } from '../../base';
import { Logger } from './../../services/logger';
import { Constants } from './../../constants';
import { IMessage } from '../../services/eventing';
import './desktop.css';
// constants
const logger = new Logger('PageOne');

export class PageOne extends Base {

  public static ICON_SIZES: any = { 
    SMALL: { CLASS: 'small', DIMENSION: 45 }, MEDIUM: { CLASS: 'medium', DIMENSION: 85 }, LARGE: { CLASS: 'large', DIMENSION: 125 }
  };
  private iconSize: string = PageOne.ICON_SIZES.SMALL.CLASS;
  private iconDimension = PageOne.ICON_SIZES.SMALL.DIMENSION;
  private rows: number = 3;
  private columns: number = 5;

  constructor() {
    super();

    this.rows = Math.floor(window.screen.availHeight / this.iconDimension);
    logger.info(' >>>>> this.rows ', this.rows);
    this.columns = Math.floor(window.screen.availWidth / this.iconDimension);
    logger.info(' >>>>> this.columns ', this.columns);

    super.subscribe(Constants.UPDATED.TEST, (data: IMessage) => {
      logger.debug(' ::>> handling message >>>>> ', data);
    });
  }

  protected activate(): void {
    
  }

  protected attached(): void {
    let container: HTMLElement = document.querySelector('.js-desktop');
    logger.info(' >>>>> window.screen.availHeight ', window.screen.availHeight);
    logger.info(' >>>>> window.screen.availWidth ', window.screen.availWidth);
  }

  private setDimension(size: string): void {
    try {
      this.iconSize = PageOne.ICON_SIZES[size.toUpperCase()].CLASS;
      this.iconDimension = PageOne.ICON_SIZES[size.toUpperCase()].DIMENSION;
    } catch(e) {
      logger.error(`Failed to chane desktop icon dimentions to ${size} due to cause:`, e);
    }
  }
}