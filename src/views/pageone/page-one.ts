// local resources
import { Base } from '../../base';
import { Logger } from './../../services/logger';
import { Constants } from './../../constants';
import { IMessage } from '../../services/eventing';
import './page-one.css';
// constants
const logger = new Logger('PageOne');

export class PageOne extends Base {

  private rows: number = 3;
  private columns: number = 5;

  constructor() {
    super();

    super.subscribe(Constants.UPDATED.TEST, (data: IMessage) => {
      logger.debug(' ::>> handling message >>>>> ', data);
    });
  }

  // private dragstartHandler(event: any): void {
  //   event.dataTransfer.setData('text/plain', event.target.id);
  //   // dropEffect: copy | move | link | none
  //   event.dataTransfer.dropEffect = 'move';
  // }

  // private dragoverHandler(event: any): void {
  //   event.preventDefault();
  //   // dropEffect: copy | move | link | none
  //   event.dataTransfer.dropEffect = 'move';
  // }

  // private dropHandler(event: any): void {
  //   event.preventDefault();
  //   var data = event.dataTransfer.getData('text');
  //   event.target.appendChild(document.getElementById(data));
  // }
}