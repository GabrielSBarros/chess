const board = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
];
let observer = null;


for(let i=0; i < 8; i++){
  for(let j=0; j < 8; j++){
    board[i].push("");
  }
}

function emitChange(){
  observer(board, pieces);
}

export function observe(o){
  if (observer) {
    throw new Error('Multiple observers not implemented.')
  }

  observer = o;
  emitChange();  
}

const pieces = {
  wRook1: {x: 7, y: 0, type: "rook", id:"wRook1"},
  wKnight1: {x: 7, y: 1, type: "knight", id:"wKnight1"},
  wBishop1: {x: 7, y: 2, type: "bishop", id:"wBishop1"},
  wQueen: {x: 7, y: 3, type: "queen", id:"wQueen"},
  wKing: {x: 7, y: 4, type: "king", id:"wKing"},
  wBishop2: {x: 7, y: 5, type: "bishop", id:"wBishop2"},
  wKnight2: {x: 7, y: 6, type: "knight", id:"wKnight2"},
  wRook2: {x: 7, y: 7, type: "rook", id:"wRook2"},

  wPawn1: {x: 6, y: 0, type: "pawn", id:"wPawn1"},
  wPawn2: {x: 6, y: 1, type: "pawn", id:"wPawn2"},
  wPawn3: {x: 6, y: 2, type: "pawn", id:"wPawn3"},
  wPawn4: {x: 6, y: 3, type: "pawn", id:"wPawn4"},
  wPawn5: {x: 6, y: 4, type: "pawn", id:"wPawn5"},
  wPawn6: {x: 6, y: 5, type: "pawn", id:"wPawn6"},
  wPawn7: {x: 6, y: 6, type: "pawn", id:"wPawn7"},
  wPawn8: {x: 6, y: 7, type: "pawn", id:"wPawn8"},

  bRook1: {x: 0, y: 0, type: "rook", black: true, id:"bRook1"},
  bKnight1: {x: 0, y: 1, type: "knight", black: true, id:"bKnight1"},
  bBishop1: {x: 0, y: 2, type: "bishop", black: true, id:"bBishop1"},
  bQueen: {x: 0, y: 3, type: "queen", black: true, id:"bQueen"},
  bKing: {x: 0, y: 4, type: "king", black: true, id:"bKing"},
  bBishop2: {x: 0, y: 5, type: "bishop", black: true, id:"bBishop2"},
  bKnight2: {x: 0, y: 6, type: "knight", black: true, id:"bKnight2"},
  bRook2: {x: 0, y: 7, type: "rook", black: true, id:"bRook2"},
  bPawn1: {x: 1, y: 0, type: "pawn", black: true, id:"bPawn1"},
  bPawn2: {x: 1, y: 1, type: "pawn", black: true, id:"bPawn2"},
  bPawn3: {x: 1, y: 2, type: "pawn", black: true, id:"bPawn3"},
  bPawn4: {x: 1, y: 3, type: "pawn", black: true, id:"bPawn4"},
  bPawn5: {x: 1, y: 4, type: "pawn", black: true, id:"bPawn5"},
  bPawn6: {x: 1, y: 5, type: "pawn", black: true, id:"bPawn6"},
  bPawn7: {x: 1, y: 6, type: "pawn", black: true, id:"bPawn7"},
  bPawn8: {x: 1, y: 7, type: "pawn", black: true, id:"bPawn8"},
}

function setBoard(){
  //white pieces
  board[7][0] = "wRook1";
  board[7][1] = "wKnight1";
  board[7][2] = "wBishop1";
  board[7][3] = "wQueen";
  board[7][4] = "wKing";
  board[7][5] = "wBishop2";
  board[7][6] = "wKnight2";
  board[7][7] = "wRook2";

  for(let i = 0; i < 8; i++){
    board[6][i] = "wPawn" + (i + 1);
  }

  //black pieces
  board[0][0] = "bRook1";
  board[0][1] = "bKnight1";
  board[0][2] = "bBishop1";
  board[0][3] = "bQueen";
  board[0][4] = "bKing";
  board[0][5] = "bBishop2";
  board[0][6] = "bKnight2";
  board[0][7] = "bRook2";

  for(let i = 0; i < 8; i++){
    board[1][i] = "bPawn" + (i + 1);
  }

}

setBoard();
/*
export function movePiece(from, to){
  board[to.x, to.y].piece = board[from.x, from.y].piece;
  board[from.x, from.y].piece = null;
}*/

export function movePiece(pieceName, toX, toY){
  const piece = pieces[pieceName];
  const {x, y} = piece;
  if(x == toX && y == toY)
    return;
  board[toX][toY] = pieceName;
  board[x][y] = "";
  piece.x = toX;
  piece.y = toY;
  emitChange();
}


export function getBoard(){
  return board;
}
  