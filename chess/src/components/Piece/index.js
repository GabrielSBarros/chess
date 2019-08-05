import React from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { Container } from "./style";
import {
  rook,
  knight,
  bishop,
  king,
  queen,
  pawn,
} from "../../ChessPiecesUnicode";

export default function Piece({ piece, black }) {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: "piece",
      id: piece.id,
      black: piece.black,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  function setPiece() {
    switch (piece.type) {
      case "pawn":
        return pawn;
      case "rook":
        return rook;
      case "knight":
        return knight;
      case "bishop":
        return bishop;
      case "queen":
        return queen;
      case "king":
        return king;
      default:
        return "";
    }
  }
  return (
    <Container black={black} ref={drag} isDragging={isDragging}>
      {setPiece()}
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
