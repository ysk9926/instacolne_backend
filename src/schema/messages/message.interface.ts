export interface IMessage {
  id: number;
  payload: string;
  userId: number;
  roomId: number;
}

export interface IRoom {
  id: number;
  cursor: number;
}
