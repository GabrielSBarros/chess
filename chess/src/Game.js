let board = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
];

for(let i=0; i < 8; i++){
  for(let j=0; j < 8; j++){
    const black = (i + j) % 2 === 1;
    board[i].push({black: black, id: (i * 8) + j})
  }
}

function setBoard(){
  //white pieces
  board[7][0].piece = {type: "rook", black: false};
  board[7][1].piece = {type:"knight", black: false};
  board[7][2].piece = {type:"bishop", black: false};
  board[7][3].piece = {type:"queen", black: false};
  board[7][4].piece = {type:"king", black: false};
  board[7][5].piece = {type:"bishop", black: false};
  board[7][6].piece = {type:"knight", black: false};
  board[7][7].piece = {type:"rook", black: false};

  for(let i = 0; i < 8; i++){
    board[6][i].piece = {type:"pawn", black: false};
  }

  //black pieces
  board[0][0].piece = {type: "rook", black: true};
  board[0][1].piece = {type:"knight", black: true};
  board[0][2].piece = {type:"bishop", black: true};
  board[0][3].piece = {type:"queen", black: true};
  board[0][4].piece = {type:"king", black: true};
  board[0][5].piece = {type:"bishop", black: true};
  board[0][6].piece = {type:"knight", black: true};
  board[0][7].piece = {type:"rook", black: true};

  for(let i = 0; i < 8; i++){
    board[1][i].piece = {type:"pawn", black: true};
  }

}

setBoard();

export function getBoard(){
  return board;
}
  