export interface TurnMessage {
  type: "TURN";
  position: number;
  symbol: "O" | "X";
}

export interface ResetMessage {
  type: "RESET";
}

export type Message = TurnMessage | ResetMessage;

export type SquareValue = "O" | "X" | undefined;
