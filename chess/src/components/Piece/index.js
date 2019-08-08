import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

import { canMove } from "../../services/Game";
import ChessPieces from "../../util/ChessPieces";
import { Container } from "./style";

export default function Piece({ piece, black: blackSquare }) {
  const { id, type, black } = piece;

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: "piece",
      id,
      black,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => canMove(black),
  });
  const color = black ? "black" : "white";
  const setPiece = useMemo(() => {
    return ChessPieces[color][type];
  }, [color, type]);

  return (
    <Container black={blackSquare} ref={drag} isDragging={isDragging}>
      <img src={setPiece} alt="" />
    </Container>
  );
}

Piece.propTypes = {
  black: PropTypes.bool.isRequired,
  piece: PropTypes.shape({
    id: PropTypes.string,
    black: PropTypes.bool,
    type: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
};
