import WebSocket from "ws";
import { Message, TurnMessage } from "./types";

type IdentifiableWebSocket = typeof WebSocket.WebSocket & {
  id?: string;
  symbol?: "O" | "X";
} & WebSocket;

const wsServer = new WebSocket.Server<IdentifiableWebSocket>({ port: 9017 });
const waitingRoom: Record<string, IdentifiableWebSocket> = {};
let board = Array(9).fill(undefined);
let currentPlayer: IdentifiableWebSocket | undefined;
let playerA: IdentifiableWebSocket;
let playerB: IdentifiableWebSocket;

function onConnect(wsClient: IdentifiableWebSocket) {
  const id = crypto.randomUUID() as string;
  wsClient.id = id;
  if (Object.keys(waitingRoom).length === 0) {
    waitingRoom[id] = wsClient;
    console.log(JSON.stringify(Object.keys(waitingRoom)));
    wsClient.send("Waiting for opponent");
  } else {
    const opponentId = Object.keys(waitingRoom)[0];
    playerA = wsClient;
    playerB = waitingRoom[opponentId!]!;

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete waitingRoom[opponentId!];
    playerA.send("Game started");
    playerB.send("Game started");

    playerA.on("message", function (data: string) {
      const message = JSON.parse(data) as Message;
      switch (message.type) {
        case "TURN":
          handleTurn(message, playerA, playerB);
          break;
        case "RESET":
          resetGame();
          break;
      }
    });

    playerB.on("message", function (data: string) {
      const message = JSON.parse(data) as Message;
      switch (message.type) {
        case "TURN":
          handleTurn(message, playerB, playerA);
          break;
        case "RESET":
          resetGame();
          break;
      }
    });
  }
  console.log("Новый пользователь");

  function handleTurn(message: TurnMessage, player: IdentifiableWebSocket, opponent: IdentifiableWebSocket) {
    const isFirstTurn = board.every((c) => !c);
    if (isFirstTurn) {
      player.symbol = "X";
      opponent.symbol = "O";
      currentPlayer = opponent;
    } else {
      if (currentPlayer !== player) {
        return;
      }
      currentPlayer = opponent;
    }
    board[Number(message.position)] = player.symbol;

    player.send(JSON.stringify({ position: Number(message.position), symbol: player.symbol, type: "TURN", yourTurn: false }));
    opponent.send(JSON.stringify({ position: Number(message.position), symbol: player.symbol, type: "TURN", yourTurn: true }));
  }

  function resetGame() {
    board = Array(9).fill(undefined);
    currentPlayer = undefined;
    playerA.send(JSON.stringify({ type: "RESET" }));
    playerB.send(JSON.stringify({ type: "RESET" }));
  }

  wsClient.on("close", function () {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete waitingRoom[wsClient.id!];
    console.log("Пользователь отключился");
  });
}

wsServer.on("connection", onConnect);
console.log("Server started");
