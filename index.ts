import * as WebSocket from 'ws';
import { httpServer } from "./src/http_server/index";
import { players, wsServer, rooms, connections } from "./src/ws_server/index";
import handleRegistration from "./src/ws_server/handleRegistration";
import { handleCreateRoom } from './src/ws_server/handleCreateRoom';

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

wsServer.on("connection", (ws: WebSocket) => {
  const id = Date.now();
  connections[id] = { websocket: ws };
  console.log("WebSocket connection established");

  ws.on("error", console.error);

  ws.on("message", (message: string) => {
    const req = JSON.parse(message);
    const { type } = req;
    console.log('MESSAGE: ', req);

    switch (type) {
      case 'reg':
        const regResponse = handleRegistration(req, ws);
        ws.send(regResponse);
        console.log('Players List: ', players);
        break;
      case 'create_room':
        const roomId = Date.now();
        rooms.push(roomId);
        const player = players.find((player) => player.websocket === connections[id].websocket);
        const createRoomResponse = handleCreateRoom(roomId, player.name, player.index);
        console.log('Create Room Response: ', createRoomResponse);
        ws.send(createRoomResponse);
        break;
      default:
        console.log(req);
        break;
    }
  });

  ws.on("close", (event: WebSocket.CloseEvent) => {
    console.log(
      `WebSocket connection closed, code=${event.code}, reason=${event.reason}`
    );
  });
});
