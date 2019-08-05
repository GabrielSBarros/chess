import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

import ChessPiecesUnicode from "../../util/ChessPiecesUnicode";
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
  });

  const setPiece = useMemo(() => ChessPiecesUnicode[type], [type]);

  return (
    <Container black={blackSquare} ref={drag} isDragging={isDragging}>
      {setPiece}
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
