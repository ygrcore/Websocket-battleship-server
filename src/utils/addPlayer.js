import { players } from "../ws_server/index.js";

export const addPlayer = (ws, name, password) => {
  const userId = Date.now();

  const player = {
    name: name,
    password: password,
    websocket: ws,
    index: userId,
  };

  players.push(player);
};