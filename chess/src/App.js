import React from "react";
import PropTypes from "prop-types";

import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import Board from "./components/Board";
import GlobalStyle from "./styles/global";

export default function App({ piecesPosition, pieces }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Board piecesPosition={piecesPosition} pieces={pieces} />
      <GlobalStyle />
    </DndProvider>
  );
}

App.propTypes = {
  pieces: PropTypes.shape().isRequired,
  piecesPosition: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
};
