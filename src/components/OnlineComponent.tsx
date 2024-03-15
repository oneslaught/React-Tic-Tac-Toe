import React, { PropsWithChildren, createContext, useContext, useState } from "react";
import { useGameContext } from "./GameProvider";

const OnlineProvider = createContext<OnlineContext | undefined>(undefined);

interface TurnMessage {
  type: "TURN";
  position: number;
  symbol: "O" | "X";
}

interface OnlineContext {
  connect: VoidFunction;
  disconnect: VoidFunction;
  isOnlineMode: boolean;
  send: (payload: string) => void;
}

export const OnlineComponent = ({ children }: PropsWithChildren) => {
  const { handlePlay } = useGameContext();

  const [onlineMode, setOnlineMode] = useState(false);
  const [connection, setConnection] = useState<WebSocket | undefined>(undefined);

  function connect() {
    const myWs = new WebSocket("ws://localhost:9017");
    setConnection(myWs);
    myWs.onopen = function () {
      console.log("подключился");
      setOnlineMode(true);
    };
    myWs.onmessage = function (e) {
      const data = e.data as string;
      try {
        const message = JSON.parse(data) as TurnMessage;
        console.log(message);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (message.type === "TURN") {
          handleTurn(message.position, message.symbol);
        }
      } catch (err) {
        console.log(data);
      }
    };
  }

  function handleTurn(position: number, symbol: "O" | "X") {
    handlePlay(position);
  }

  function send(value: string) {
    connection?.send(value);
  }

  function disconnect() {
    connection?.close();
    setConnection(undefined);
    setOnlineMode(false);
  }

  const onlineContext = {
    connect,
    disconnect,
    isOnlineMode: onlineMode,
    send,
  };
  return <OnlineProvider.Provider value={onlineContext}>{children}</OnlineProvider.Provider>;
};

export const useOnlineContext = () => {
  const context = useContext(OnlineProvider);
  if (context === undefined) {
    throw new Error("useOnlineContext must be used within a OnlineProvider");
  }
  return context;
};
