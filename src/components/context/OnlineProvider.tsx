import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useGameContext } from "./GameProvider";

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

const OnlineContext = createContext<OnlineContext | undefined>(undefined);

export const OnlineProvider = ({ children }: PropsWithChildren) => {
  const { handlePlay } = useGameContext();

  const [onlineMode, setOnlineMode] = useState(false);
  const [connection, setConnection] = useState<WebSocket | undefined>(undefined);

  useEffect(() => {
    if (connection) {
      connection.onopen = () => {
        console.log("подключился");
        setOnlineMode(true);
      };
      connection.onmessage = (e) => {
        const data = e.data as string;
        try {
          const message = JSON.parse(data) as TurnMessage;
          console.log(message);
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (message.type === "TURN") {
            handlePlay(message.position);
          }
        } catch (err) {
          console.log(data);
        }
      };
    }
  }, [connection, handlePlay, setOnlineMode]);

  const send = useCallback(
    (value: string) => {
      connection?.send(value);
    },
    [connection],
  );

  const disconnect = useCallback(() => {
    connection?.close();
    setConnection(undefined);
    setOnlineMode(false);
  }, [connection, setConnection, setOnlineMode]);

  const connect = useCallback(() => {
    const ws = new WebSocket("ws://localhost:9017");
    setConnection(ws);
  }, [handlePlay, setConnection]);

  const onlineContext = useMemo(
    () => ({
      connect,
      disconnect,
      isOnlineMode: onlineMode,
      send,
    }),
    [connect, disconnect, onlineMode, send],
  );

  return <OnlineContext.Provider value={onlineContext}>{children}</OnlineContext.Provider>;
};

export const useOnlineContext = () => {
  const context = useContext(OnlineContext);
  if (context === undefined) {
    throw new Error("useOnlineContext must be used within a OnlineProvider");
  }
  return context;
};
