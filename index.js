import { httpServer } from "./src/http_server/index.js";
import { wsServer } from "./src/ws_server/index.js";
import handleRegistration from "./src/ws_server/handleRegistration.js";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

wsServer.on("connection", (ws) => {
  console.log("WebSocket connection established");
  ws.on("error", console.error);

  ws.on("message", message => {
    const req = JSON.parse(message);
    const { type } = req;

    switch (type) {
      case 'reg':
        const response = handleRegistration(req);
        ws.send(JSON.stringify(response));
        break;
      default:
        console.log('no switch case');
        break;
    }
  });

  ws.on("close", (event) => {
    console.log(
      `WebSocket connection closed, code=${event.code}, reason=${event.reason}`
    );
  });
});
