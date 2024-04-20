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
  draws = 0;

  console.log("Client connected:", wsClient.id);

  wsClient.on("pong", () => {
    wsClient.isAlive = true;
  });

  if (Object.keys(waitingRoom).length === 0) {
    waitingRoom[id] = wsClient;
    console.log(JSON.stringify(Object.keys(waitingRoom)));
    wsClient.send(JSON.stringify({ type: "WAITING" }));
    console.log("Client waiting:", wsClient.id);
  } else {
    const opponentId = Object.keys(waitingRoom)[0];
    playerA = wsClient;
    playerB = waitingRoom[opponentId!]!;

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete waitingRoom[opponentId!];
    playerA.send(JSON.stringify({ type: "GAME_STARTED" }));
    playerB.send(JSON.stringify({ type: "GAME_STARTED" }));
    console.log("Game started");

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

  function handleTurn(message: ClientTurnMessage, player: IdentifiableWebSocket, opponent: IdentifiableWebSocket) {
    const winner = checkWin(board);
    if (board[message.position]) {
      return;
    }
    const isFirstTurn = board.every((c) => !c);
    if (isFirstTurn) {
      if (player.symbol === "X") {
        return;
      } else {
        player.symbol = "X";
        opponent.symbol = "O";
      }

      player.symbol = "X";
      opponent.symbol = "O";
      currentPlayer = opponent;

      player.send(JSON.stringify({ type: "FIRST_CLICK", symbol: player.symbol }));
      opponent.send(JSON.stringify({ type: "FIRST_CLICK", symbol: opponent.symbol }));
      console.log("First click");
    } else {
      if (currentPlayer !== player || winner) {
        return;
      }
      currentPlayer = opponent;
    }
    board[Number(message.position)] = player.symbol;
    console.log(`set ${message.position} to ${player.symbol} for ${player.id}`);
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
      console.log("We have a draw!");
      return "draw";
    } else if (winner) {
      console.log("We have a winner!");
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
      opponent.send(JSON.stringify({ type: "DISCONNECT" }));
    }

    client.terminate();
    clearInterval(interval);
    console.log("Player disconnected:", client.id);
  }

  function resetGame() {
    board = Array<SquareValue>(9).fill(undefined);
    currentPlayer = undefined;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (playerA) {
      playerA.send(JSON.stringify({ type: "RESET", yourTurn: playerA.symbol === "X" ? false : true }));
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (playerB) {
      playerB.send(JSON.stringify({ type: "RESET", yourTurn: playerB.symbol === "X" ? false : true }));
    }
    console.log("Board has been cleaned");
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
