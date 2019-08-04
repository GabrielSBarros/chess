import React from 'react';
import Square from '../Square';
import { getBoard } from '../../Game';

import { Container } from './style';

export default function Board({pieces, piecesPosition}){
  console.log(getBoard());
  console.log(pieces)
  const board = getBoard();
  const squares = [];
  const obj = { prop: 2, id: 3 }

  for(let i=0; i < 8; i++){
    for(let j=0; j < 8; j++){
      squares.push(renderSquare(i, j));
    }
  }
/*
  for(let i= 0; i < 8; i++){
    squares.push(board[i].map(
      square => 
        <Square 
          key={square.id} 
          black={square.black} 
          piece={square.piece}
        />
      )
    );
  }
*/
  function renderSquare(x, y){
    const black = (x + y) % 2 === 1;
    let piece = null;
    const isTherePiece = piecesPosition[x][y];
    if(isTherePiece){
      console.log("isTherePiece " + isTherePiece);
      piece = pieces[isTherePiece];
    }
    //const isKnightHere = ((x == knightX) && (y == knightY));
    //const piece = isKnightHere ? <Knight black/> : null;

    return (
        <Square x={x} y={y} black={black} piece={piece}>  
        </Square>
      );
  }
/*{renderPiece(x, y, knightPosition)}*/
  return(
    <Container>
      {squares}
    </Container>
  );
}