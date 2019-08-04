import React from 'react'
import { Container } from './style';
//import Knight from '../Knight';
import Piece from '../Piece';
import { movePiece } from '../../Game';

import { useDrop } from 'react-dnd';

export default function Square({ black, piece, x, y }){
  const [{isOver, canDrop}, drop] = useDrop({
    accept: "piece",
    canDrop: () => true,
    drop: (piece) => {movePiece(piece.id, x, y)},
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  });
  return(
    <Container black={black} ref={drop}>
      { /*(piece === "knight") ? <Knight/> : "" */}
      {piece ? <Piece blackSquare={black} piece={piece} black={piece.black}/>: ""}
    </Container>
  );
}