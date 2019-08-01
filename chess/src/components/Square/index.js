import React from 'react'
import { Container } from './style';
import Knight from '../Knight';
import Piece from '../Piece';

export default function Square({ black, piece, blackPiece }){
  return(
    <Container black={black}>
      { /*(piece === "knight") ? <Knight/> : "" */}
      {piece ? <Piece blackSquare={black} piece={piece.type} black={piece.black}/>: ""}
    </Container>
  );
}