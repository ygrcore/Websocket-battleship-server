import { WebSocket } from "ws";
import { players } from "./index";
import { addPlayer } from "../utils/addPlayer";

interface RegistrationRequest {
  data: string;
  id: number;
}

interface ExistingPlayer {
  name: string;
  password: string;
  index: number;
}

interface RegistrationResponseData {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
}

interface RegistrationResponse {
  type: string;
  data: string;
  id: number;
}

function handleRegistration(req: RegistrationRequest, ws: WebSocket) {
  const parsedData = JSON.parse(req.data);

  const {name, password} = parsedData;
  const reqId = req.id;

  const existingPlayer: ExistingPlayer = players.find(player => player.name === name);
  const id = Date.now();

  const responseData: RegistrationResponseData = {
    name,
    index: id,
    error: false,
    errorText: '',
  }
  const response: RegistrationResponse = {
      type: 'reg',
      data: JSON.stringify(responseData),
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