import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { observe } from "./services/Game";

observe((piecesPosition, pieces) => {
  ReactDOM.render(
    <App piecesPosition={piecesPosition} pieces={pieces} />,
    document.getElementById("root")
  );
});
