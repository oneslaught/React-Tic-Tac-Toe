import WebSocket from "ws";

type IdentifiableWebSocket = typeof WebSocket.WebSocket & {
  id?: string;
  symbol?: "O" | "X";
} & WebSocket;

export type SquareValue = "O" | "X" | undefined;

const wsServer = new WebSocket.Server<IdentifiableWebSocket>({ port: 9017 });
const waitingRoom: Record<string, IdentifiableWebSocket> = {};
const board = Array(9).fill(undefined);
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

    playerA.on("message", function (message: string) {
      handleTurn(message, playerA, playerB);
    });

    playerB.on("message", function (message: string) {
      handleTurn(message, playerB, playerA);
    });
  }
  console.log("Новый пользователь");

  function handleTurn(position: string, player: IdentifiableWebSocket, opponent: IdentifiableWebSocket) {
    const isFirstTurn = board.every((c) => !c);
    if (isFirstTurn) {
      player.symbol = "X";
      opponent.symbol = "O";
      board[Number(position)] = "X";
    } else {
      board[Number(position)] = player.symbol;
    }

    player.send(JSON.stringify({ position: Number(position), symbol: player.symbol, type: "TURN", yourTurn: false }));
    opponent.send(JSON.stringify({ position: Number(position), symbol: player.symbol, type: "TURN", yourTurn: true }));
  }

  // отправка приветственного сообщения клиенту
  // wsClient.send("Привет");

  // wsClient.on("message", function (message: any) {
  //   console.log("received: %s", message);
  //   wsClient.send("Получил");
  //   /* обработчик сообщений от клиента */
  // });

  wsClient.on("close", function () {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete waitingRoom[wsClient.id!];
    // отправка уведомления в консоль
    console.log("Пользователь отключился");
  });
}

wsServer.on("connection", onConnect);
console.log("Server started");
