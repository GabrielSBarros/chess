import React from 'react';
import { Container } from './style';
import {rook, knight, bishop, king, queen, pawn } from '../../ChessPiecesUnicode';

export default function Piece({ piece, black }){
  
  function setPiece(){
      switch(piece){
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
    <Container black={black}>{setPiece()}</Container>
  );
}