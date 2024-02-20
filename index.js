import { httpServer } from "./src/http_server/index.js";
import { wsServer } from "./src/ws_server/index.js";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

wsServer.on("connection", (ws) => {
  console.log("WebSocket connection established");
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: ", data);
  });

  ws.on("close", (event) => {
    console.log(
      `WebSocket connection closed, code=${event.code}, reason=${event.reason}`
    );
  });
});
