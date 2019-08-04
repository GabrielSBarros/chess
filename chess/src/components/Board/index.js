import React from "react";
import PropTypes from "prop-types";
import Square from "../Square";
import { getBoard } from "../../Game";

import { Container } from "./style";

export default function Board({ pieces, piecesPosition }) {
  console.log(getBoard());
  console.log(pieces);
  const squares = [];

  function renderSquare(x, y) {
    const black = (x + y) % 2 === 1;
    let piece = null;
    const isTherePiece = piecesPosition[x][y];
    if (isTherePiece) {
      console.log(`isTherePiece ${isTherePiece}`);
      piece = pieces[isTherePiece];
    }
    return <Square x={x} y={y} black={black} piece={piece} />;
  }

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      squares.push(renderSquare(i, j));
    }
  }

  return <Container>{squares}</Container>;
}

Board.propTypes = {
  pieces: PropTypes.shape().isRequired,
  piecesPosition: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
};
