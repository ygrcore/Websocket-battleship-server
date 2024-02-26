import { WebSocket } from 'ws';

export interface iPlayer {
  name: string;
  password: string;
  websocket: WebSocket;
  index: number;
}