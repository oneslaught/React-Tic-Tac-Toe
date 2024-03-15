import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { GameProvider } from "./components/GameProvider";
import { OnlineComponent } from "./components/OnlineComponent";

const rootElement = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(rootElement!);
root.render(
  <GameProvider>
    <OnlineComponent>
      <App />
    </OnlineComponent>
  </GameProvider>,
);
