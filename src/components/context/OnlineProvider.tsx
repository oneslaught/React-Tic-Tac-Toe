import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useGameContext } from "./GameProvider";
import { ClientMessage, ServerMessage } from "../../types";

type OnlineContext = {
  connect: VoidFunction;
  disconnect: VoidFunction;
  reconnect: VoidFunction;
  isOnlineMode: boolean;
  send: (payload: ClientMessage) => void;
  yourTurn: boolean;
  yourWins: number;
  opponentWins: number;
  draws: number;
  onlineWinner: string;
  isWaiting: boolean;
  setIsWaiting: (isOpen: boolean) => void;
  setIsDisconnect: (isOpen: boolean) => void;
  setGameStarted: (isOpen: boolean) => void;
  gameStarted: boolean;
  isDisconnect: boolean;
  clientSymbol: string;
};

const OnlineContext = createContext<OnlineContext | undefined>(undefined);

export const OnlineProvider = ({ children }: PropsWithChildren) => {
  const { handlePlay, resetGame } = useGameContext();

  const [onlineMode, setOnlineMode] = useState(false);
  const [connection, setConnection] = useState<WebSocket | undefined>(undefined);
  const [yourTurn, setYourTurn] = useState(true);
  const [yourWins, setYourWins] = useState(0);
  const [opponentWins, setOpponentWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [onlineWinner, setOnlineWinner] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isDisconnect, setIsDisconnect] = useState(false);
  const [clientSymbol, setClientSymbol] = useState<string>("X");

  useEffect(() => {
    if (connection) {
      connection.onopen = () => {
        console.log("подключился");
        setOnlineMode(true);
      };
      connection.onmessage = (e) => {
        const data = e.data as string;
        try {
          const message = JSON.parse(data) as ServerMessage;
          console.log(message);
          switch (message.type) {
            case "SERVER_TURN":
              handlePlay(message.position, message.symbol);
              setYourTurn(message.yourTurn);
              break;
            case "RESET":
              resetGame();
              setYourTurn(true);
              setGameStarted(false);
              setClientSymbol("X");
              setOnlineWinner("");
              break;
            case "WAITING":
              setIsWaiting(true);
              break;
            case "FIRST_CLICK":
              if (message.symbol === "X") {
                setClientSymbol("X");
              } else {
                setClientSymbol("O");
              }
              break;
            case "GAME_STARTED":
              setIsWaiting(false);
              setGameStarted(true);
              break;
            case "GAME_OVER":
              setYourWins(message.playerWins);
              setOpponentWins(message.opponentWins);
              setDraws(message.draws);
              setOnlineWinner(message.winner);
              break;
            case "DISCONNECT":
              setGameStarted(false);
              setIsDisconnect(true);
              setYourTurn(true);
              setClientSymbol("X");
              setOnlineWinner("");
              break;
          }
        } catch (err) {
          console.log(data);
        }
      };
    }
  }, [connection, handlePlay, setOnlineMode, resetGame]);

  const send = useCallback(
    (value: ClientMessage) => {
      connection?.send(JSON.stringify(value));
    },
    [connection],
  );

  const createWebSocket = useCallback(() => {
    const ws = new WebSocket(`ws://${window.location.host.split(":")[0]}:9017`);
    setConnection(ws);
  }, []);

  const disconnect = useCallback(() => {
    connection?.close();
    setConnection(undefined);
    setOnlineMode(false);
  }, [connection, setConnection, setOnlineMode]);

  const connect = useCallback(() => {
    if (!connection) {
      createWebSocket();
    }
  }, [connection, createWebSocket]);

  const reconnect = useCallback(() => {
    if (connection) {
      connection.close();
      setConnection(undefined);
    }
    createWebSocket();
  }, [connection, createWebSocket]);

  const onlineContext = useMemo(
    () => ({
      connect,
      disconnect,
      isOnlineMode: onlineMode,
      send,
      yourTurn,
      yourWins,
      opponentWins,
      draws,
      onlineWinner,
      isWaiting,
      setIsWaiting,
      gameStarted,
      isDisconnect,
      setIsDisconnect,
      setGameStarted,
      reconnect,
      clientSymbol,
    }),
    [
      connect,
      disconnect,
      draws,
      onlineMode,
      opponentWins,
      send,
      yourTurn,
      yourWins,
      onlineWinner,
      isWaiting,
      setIsWaiting,
      gameStarted,
      isDisconnect,
      setIsDisconnect,
      setGameStarted,
      reconnect,
      clientSymbol,
    ],
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
