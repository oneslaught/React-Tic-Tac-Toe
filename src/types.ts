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

export type ServerMessage = ServerTurnMessage | ResetMessage | GameOverMessage;

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

export type ModalProps = {
  handleClose: () => void;
  modalOpen: boolean;
};

export type BackdropProps = {
  children: React.ReactNode;
  onClick: () => void;
};
