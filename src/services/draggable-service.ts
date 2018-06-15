export class DraggableService {

  public static DROP_EFFECTS = { COPY: 'copy', MOVE: 'move', LINK: 'link', NONE: 'none' };
  public static dropEffect = DraggableService.DROP_EFFECTS.MOVE; // default

  public static dragstartHandler(event: any): void {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.dropEffect = DraggableService.dropEffect;
  }

  public static dragoverHandler(event: any): void {
    event.preventDefault();
    event.dataTransfer.dropEffect = DraggableService.dropEffect;
  }

  public static dropHandler(event: any): void {
    event.preventDefault();
    var data = event.dataTransfer.getData('text');
    event.target.appendChild(document.getElementById(data));
  }
}