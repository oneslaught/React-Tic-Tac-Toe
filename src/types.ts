type BaseTurnMessage = {
  position: number;
};

export type ClientTurnMessage = BaseTurnMessage & {
  type: "CLIENT_TURN";
};

export type ResetMessage = {
  type: "RESET";
};

export type ClientMessage = ClientTurnMessage | ResetMessage;

export type ServerMessage =
  | ServerTurnMessage
  | ResetMessage
  | GameOverMessage
  | PlayerDisconnect
  | WaitingForOpponent
  | FirstClickMessage
  | GameStartedMessage;

export type SquareValue = PlayerSymbol | undefined;

export type PlayerSymbol = "O" | "X";

export type GameOverMessage = {
  type: "GAME_OVER";
  playerWins: number;
  opponentWins: number;
  draws: number;
  winner: "YOU" | "OPPONENT" | "DRAW";
};

export type ServerTurnMessage = BaseTurnMessage & {
  type: "SERVER_TURN";
  yourTurn: boolean;
  symbol: PlayerSymbol;
};

export type FirstClickMessage = {
  type: "FIRST_CLICK";
  symbol: PlayerSymbol;
};

export type GameStartedMessage = {
  type: "GAME_STARTED";
};

export type WaitingForOpponent = {
  type: "WAITING";
};

export type PlayerDisconnect = {
  type: "DISCONNECT";
};
