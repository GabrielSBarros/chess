import React from 'react';
import { Container } from './style';
import {rook, knight, bishop, king, queen, pawn } from '../../ChessPiecesUnicode';
import { useDrag } from 'react-dnd'

export default function Piece({ piece, black }){
  const [{isDragging}, drag] = useDrag({
    item: {type: "piece", id: piece.id},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  
  function setPiece(){
      switch(piece.type){
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
  return(
    <Container 
      black={black}
      ref={drag}
      isDragging={isDragging}
    >
      {setPiece()}
    </Container>
  );
}