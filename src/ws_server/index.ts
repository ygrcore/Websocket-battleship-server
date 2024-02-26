import { WebSocketServer } from "ws";

export const connections: any[] = [];
export const players: any[] = [];
export const rooms: any[] = [];

export const wsServer = new WebSocketServer({ port: 3000, clientTracking: true });
