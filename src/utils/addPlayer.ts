import { WebSocket } from 'ws';
import { players } from "../ws_server/index";
import { iPlayer } from '../types/types';

export const addPlayer = (ws: WebSocket, name: string, password: string) => {
  const userId = Date.now();

  const player: iPlayer = {
    name: name,
    password: password,
    websocket: ws,
    index: userId,
  };

  players.push(player);
};