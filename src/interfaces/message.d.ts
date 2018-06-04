export interface IMessage {
  pipe: string;
  event: string;
  originator: string,
  payload: any;
  timestamp: number;
}