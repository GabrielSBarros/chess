import React from 'react';
import Square from '../Square';
import { getBoard } from '../../Game';

import { Container } from './style';

export default function Board(){
  console.log(getBoard());
  const board = getBoard();
  const squares = [];
  
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

  return(
    <Container>
      {console.log(squares)}
      {squares}
    </Container>
  );
}