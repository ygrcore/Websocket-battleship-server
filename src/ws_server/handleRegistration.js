import { players } from "./index.js";
import { addPlayer } from "../utils/addPlayer.js";

function handleRegistration(req, ws) {
  const parsedData = JSON.parse(req.data);

  const {name, password} = parsedData;
  const reqId = req.id;

  const existingPlayer = players.find(player => player.name === name);
  const id = Date.now();

  const responseData = {
    name,
    index: id,
    error: false,
    errorText: '',
  }
  const response = {
      type: 'reg',
      data: responseData,
      id: reqId,
  };

  if (!existingPlayer) {
    addPlayer(ws, name, password)
  } else {
      if (existingPlayer.password !== password) {
          responseData.error = true;
          responseData.errorText = 'Wrong password';
      } else {
          responseData.index = existingPlayer.index;
      }
  }

  const newResponseData = JSON.stringify(responseData);
  response.data = newResponseData;
  return JSON.stringify(response);
}

export default handleRegistration;