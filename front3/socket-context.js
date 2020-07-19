import React from 'react'
import socketIOClient from "socket.io-client";
import { backUrl } from "./config/config"

const socket = socketIOClient(backUrl);

export const SocketContext = React.createContext(socket);