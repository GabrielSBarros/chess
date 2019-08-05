import React from "react";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";

import Piece from "../Piece";
import { movePiece, canMovePiece } from "../../Game";

import { Container } from "./style";

export default function Square({ black, piece, x, y }) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "piece",
    canDrop: item => canMovePiece(item.id, x, y, piece && piece.black),
    drop: item => {
      movePiece(item.id, x, y);
    },
    collect: mon => ({
      isOver: mon.isOver(),
      canDrop: mon.canDrop(),
    }),
  });

  return (
    <Container black={black} ref={drop} isOver={isOver} canDrop={canDrop}>
      {piece && <Piece piece={piece} black={piece.black} />}
    </Container>
  );
}

Square.propTypes = {
  black: PropTypes.bool.isRequired,
  piece: PropTypes.shape({
    id: PropTypes.string,
    black: PropTypes.bool,
  }).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};
