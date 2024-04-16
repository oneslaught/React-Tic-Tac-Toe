import React from "react";

import Board from "./components/Board";
import GameMode from "./components/GameMode";
import GameResults from "./components/GameResults";
import GameScore from "./components/GameScore";
import PlayerTurn from "./components/PlayerTurn";
import ResetButton from "./components/ResetButton";
import "./styles/app.css";
import { AudioComponent } from "./components/AudioComponent";
import { GameProvider } from "./components/context/GameProvider";
import { OnlineProvider } from "./components/context/OnlineProvider";
import GameNotification from "./components/GameNotification";

export default function App() {
  return (
    <React.StrictMode>
      <GameProvider>
        <OnlineProvider>
          <AudioComponent>
            <PlayerTurn />
            <GameScore />
            <Board />
            <GameResults />
            <ResetButton />
            <GameNotification />
            <GameMode />
          </AudioComponent>
        </OnlineProvider>
      </GameProvider>
    </React.StrictMode>
  );
}
