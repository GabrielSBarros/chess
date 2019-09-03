import React from "react";
import PropTypes from "prop-types";

import "./config/ReactotronConfig";

import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import Board from "./components/Board";
import GameStatus from "./components/GameStatus";
import GlobalStyle from "./styles/global";

export default function App({ piecesPosition, pieces }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <GameStatus />
      <Board piecesPosition={piecesPosition} pieces={pieces} />
      <div style={{ width: "calc((100vw - 85vh) / 2)" }} />
      <GlobalStyle />
    </DndProvider>
  );
}

App.propTypes = {
  pieces: PropTypes.shape().isRequired,
  piecesPosition: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
};
