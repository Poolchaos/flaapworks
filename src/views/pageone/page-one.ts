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

  private dragstartHandler(event: any): void {
    // Add the target element's id to the data transfer object
    event.dataTransfer.setData("text/plain", event.target.id);
    event.dataTransfer.dropEffect = "move";
  }

  private dragoverHandler(event: any): void {
    event.preventDefault();
    // Set the dropEffect to move
    event.dataTransfer.dropEffect = "move"
  }

  private dropHandler(event: any): void {
    event.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
  }
}