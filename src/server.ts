import WebSocket from "ws";
import CalculateWinner from "./components/CalculateWinner";
import { ClientMessage, ClientTurnMessage, GameOverMessage, ServerTurnMessage, SquareValue } from "./types";

type IdentifiableWebSocket = typeof WebSocket.WebSocket & {
  id?: string;
  isAlive?: boolean;
  symbol?: "O" | "X";
  wins: number;
} & WebSocket;

const wsServer = new WebSocket.Server<IdentifiableWebSocket>({ port: 9017 });
const waitingRoom: Record<string, IdentifiableWebSocket> = {};
let board: SquareValue[] = Array<SquareValue>(9).fill(undefined);
let currentPlayer: IdentifiableWebSocket | undefined;
let playerA: IdentifiableWebSocket;
let playerB: IdentifiableWebSocket;
let draws = 0;

function onConnect(wsClient: IdentifiableWebSocket) {
  const id = crypto.randomUUID() as string;
  wsClient.id = id;
  wsClient.isAlive = true;
  wsClient.wins = 0;

  wsClient.on("pong", () => {
    wsClient.isAlive = true;
  });

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
      const message = JSON.parse(data) as ClientMessage;
      switch (message.type) {
        case "CLIENT_TURN":
          handleTurn(message, playerA, playerB);
          break;
        case "RESET":
          resetGame();
          break;
      }
    });

    playerB.on("message", function (data: string) {
      const message = JSON.parse(data) as ClientMessage;
      switch (message.type) {
        case "CLIENT_TURN":
          handleTurn(message, playerB, playerA);
          break;
        case "RESET":
          resetGame();
          break;
      }
    });
  }
  console.log("Новый пользователь");

  function handleTurn(message: ClientTurnMessage, player: IdentifiableWebSocket, opponent: IdentifiableWebSocket) {
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

    const winner = checkWin(board);
    if (winner === player.symbol) {
      player.wins += 1;
      sendGameResults(player, {
        playerWins: player.wins,
        opponentWins: opponent.wins,
        draws,
        winner: "YOU",
        type: "GAME_OVER",
      });
      sendGameResults(opponent, {
        playerWins: opponent.wins,
        opponentWins: player.wins,
        draws,
        winner: "OPPONENT",
        type: "GAME_OVER",
      });
      // player.send(`You won!`);
      // opponent.send(`You lost.`);
    } else if (winner === opponent.symbol) {
      opponent.wins += 1;
      sendGameResults(player, {
        playerWins: player.wins,
        opponentWins: opponent.wins,
        draws,
        winner: "OPPONENT",
        type: "GAME_OVER",
      });
      sendGameResults(opponent, {
        playerWins: opponent.wins,
        opponentWins: player.wins,
        draws,
        winner: "YOU",
        type: "GAME_OVER",
      });
      // player.send(`You lost.`);
      // opponent.send(`You won!`);
    } else if (winner === "draw") {
      draws += 1;
      sendGameResults(player, {
        playerWins: player.wins,
        opponentWins: opponent.wins,
        draws,
        winner: "DRAW",
        type: "GAME_OVER",
      });
      sendGameResults(opponent, {
        playerWins: opponent.wins,
        opponentWins: player.wins,
        draws,
        winner: "DRAW",
        type: "GAME_OVER",
      });
      // console.log(draws);
      // player.send(`It's a draw!`);
      // opponent.send(`It's a draw!`);
    }

    sendTurnEvent(player, {
      position: Number(message.position),
      symbol: player.symbol!,
      type: "SERVER_TURN",
      yourTurn: currentPlayer === player,
    });
    sendTurnEvent(opponent, {
      position: Number(message.position),
      symbol: player.symbol!,
      type: "SERVER_TURN",
      yourTurn: currentPlayer === opponent,
    });
  }

  function sendGameResults(player: IdentifiableWebSocket, message: GameOverMessage) {
    player.send(JSON.stringify(message));
  }

  function sendTurnEvent(player: IdentifiableWebSocket, message: ServerTurnMessage) {
    player.send(JSON.stringify(message));
  }

  function checkWin(board: SquareValue[]): "X" | "O" | "draw" | undefined {
    const squares = board.map((square) => (square ? square : undefined));
    const winner = CalculateWinner(squares);
    if (winner === "draw") {
      return "draw";
    } else if (winner) {
      return winner;
    }
    return undefined;
  }

  const interval = setInterval(() => {
    for (const client of wsServer.clients) {
      const identifiableClient = client as IdentifiableWebSocket;
      if (identifiableClient.isAlive === false) {
        terminateClient(identifiableClient);
      } else {
        identifiableClient.ping();
      }
    }
  }, 6000);

  function terminateClient(client: IdentifiableWebSocket) {
    if (client === playerA || client === playerB) {
      const opponent = client === playerA ? playerB : playerA;
      opponent.send("Your opponent has disconnected");
    }

    client.terminate();
    clearInterval(interval);
    resetGame();
    console.log("Player disconnected:", client.id);
  }

  function resetGame() {
    board = Array<SquareValue>(9).fill(undefined);
    currentPlayer = undefined;
    playerA.send(JSON.stringify({ type: "RESET" }));
    playerB.send(JSON.stringify({ type: "RESET" }));
  }

  wsClient.on("close", function () {
    terminateClient(wsClient);
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete waitingRoom[wsClient.id!];
    board = Array<SquareValue>(9).fill(undefined);
  });
}

wsServer.on("connection", onConnect);
console.log("Server started");
