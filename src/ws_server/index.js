import { WebSocketServer } from "ws";

export const connections = [];
export const players = [];
export const rooms = [];

export const wsServer = new WebSocketServer({ port: 3000, clientTracking: true });
