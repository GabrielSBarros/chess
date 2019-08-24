import ChessMovements from "~/util/ChessMovements";
import Paths from "~/util/Paths";

const genericMatriz = [[], [], [], [], [], [], [], []];
const statusCode = {
  NONE: 0,
  CHECK_WHITE: 1,
  CHECK_BLACK: 2,
  CHECKMATE_WHITE: 3,
  CHECKMATE_BLACK: 4,
};

let observer = null;
let blackPlaying = false;
export let gameStatus = statusCode.NONE;

let renderedBoard = genericMatriz.map(() => genericMatriz.map(() => ""));

function Piece(x, y, type, black, id) {
  return {
    canMoveTo: ChessMovements[type],
    pathTo: Paths[type],
    black,
    type,
    id,
    x,
    y,
  };
}

const pieces = {
  wRook1: Piece(7, 0, "rook", false, "wRook1"),
  wKnight1: Piece(7, 1, "knight", false, "wKnight1"),
  wBishop1: Piece(7, 2, "bishop", false, "wBishop1"),
  wQueen: Piece(7, 3, "queen", false, "wQueen"),
  wKing: Piece(7, 4, "king", false, "wKing"),
  wBishop2: Piece(7, 5, "bishop", false, "wBishop2"),
  wKnight2: Piece(7, 6, "knight", false, "wKnight2"),
  wRook2: Piece(7, 7, "rook", false, "wRook2"),

  wPawn1: Piece(6, 0, "wpawn", false, "wPawn1"),
  wPawn2: Piece(6, 1, "wpawn", false, "wPawn2"),
  wPawn3: Piece(6, 2, "wpawn", false, "wPawn3"),
  wPawn4: Piece(6, 3, "wpawn", false, "wPawn4"),
  wPawn5: Piece(6, 4, "wpawn", false, "wPawn5"),
  wPawn6: Piece(6, 5, "wpawn", false, "wPawn6"),
  wPawn7: Piece(6, 6, "wpawn", false, "wPawn7"),
  wPawn8: Piece(6, 7, "wpawn", false, "wPawn8"),

  bRook1: Piece(0, 0, "rook", true, "bRook1"),
  bKnight1: Piece(0, 1, "knight", true, "bKnight1"),
  bBishop1: Piece(0, 2, "bishop", true, "bBishop1"),
  bQueen: Piece(0, 3, "queen", true, "bQueen"),
  bKing: Piece(0, 4, "king", true, "bKing"),
  bBishop2: Piece(0, 5, "bishop", true, "bBishop2"),
  bKnight2: Piece(0, 6, "knight", true, "bKnight2"),
  bRook2: Piece(0, 7, "rook", true, "bRook2"),

  bPawn1: Piece(1, 0, "bpawn", true, "bPawn1"),
  bPawn2: Piece(1, 1, "bpawn", true, "bPawn2"),
  bPawn3: Piece(1, 2, "bpawn", true, "bPawn3"),
  bPawn4: Piece(1, 3, "bpawn", true, "bPawn4"),
  bPawn5: Piece(1, 4, "bpawn", true, "bPawn5"),
  bPawn6: Piece(1, 5, "bpawn", true, "bPawn6"),
  bPawn7: Piece(1, 6, "bpawn", true, "bPawn7"),
  bPawn8: Piece(1, 7, "bpawn", true, "bPawn8"),
};

function setBoard() {
  // white pieces
  renderedBoard[7][0] = "wRook1";
  renderedBoard[7][1] = "wKnight1";
  renderedBoard[7][2] = "wBishop1";
  renderedBoard[7][3] = "wQueen";
  renderedBoard[7][4] = "wKing";
  renderedBoard[7][5] = "wBishop2";
  renderedBoard[7][6] = "wKnight2";
  renderedBoard[7][7] = "wRook2";

  for (let i = 0; i < 8; i++) {
    renderedBoard[6][i] = `wPawn${i + 1}`;
  }

  // black pieces
  renderedBoard[0][0] = "bRook1";
  renderedBoard[0][1] = "bKnight1";
  renderedBoard[0][2] = "bBishop1";
  renderedBoard[0][3] = "bQueen";
  renderedBoard[0][4] = "bKing";
  renderedBoard[0][5] = "bBishop2";
  renderedBoard[0][6] = "bKnight2";
  renderedBoard[0][7] = "bRook2";

  for (let i = 0; i < 8; i++) {
    renderedBoard[1][i] = `bPawn${i + 1}`;
  }
}

setBoard();

function emitChange() {
  observer(renderedBoard, pieces);
}

export function getBoard() {
  return renderedBoard;
}

export function canMovePieceTo(
  draggedPieceName,
  toX,
  toY,
  pieceBlack,
  board = renderedBoard
) {
  const { black, x, y, canMoveTo } = pieces[draggedPieceName];

  if (gameStatus > 2 || pieceBlack === black) return false;

  return canMoveTo(x, y, toX, toY, board);
}

function isThreatnedByBlack(x, y, board) {
  const bKeys = Object.keys(pieces).slice(16, 32);
  const threatning = [];

  bKeys.forEach(element => {
    if (canMovePieceTo(element, x, y, false, board)) threatning.push(element);
  });
  return threatning;
}

function isThreatnedByWhite(x, y, board) {
  const wKeys = Object.keys(pieces).slice(0, 16);
  const threatning = [];

  wKeys.forEach(element => {
    if (canMovePieceTo(element, x, y, true, board)) threatning.push(element);
  });
  return threatning;
}

function isWKingThreatned(board) {
  const { x, y } = pieces.wKing;
  return isThreatnedByBlack(x, y, board);
}

function isBKingThreatned(board) {
  const { x, y } = pieces.bKing;
  return isThreatnedByWhite(x, y, board);
}

function threatnerInDanger(piece) {
  const { x, y } = pieces[piece];
  const threatning = blackPlaying ? isThreatnedByWhite : isThreatnedByBlack;
  const threatners = threatning(x, y, renderedBoard);
  if (
    threatners.length === 1 &&
    (threatners[0] === "bKing" || threatners[0] === "wKing")
  )
    return false;
  return !!threatning(x, y, renderedBoard).length;
}

function canBlockThreatner(pieceName, kingX, kingY) {
  const { x, y, pathTo } = pieces[pieceName];
  const pathToKing = pathTo(x, y, kingX, kingY, renderedBoard);
  const threatning = blackPlaying ? isThreatnedByWhite : isThreatnedByBlack;
  let canBlock = false;
  pathToKing.forEach(({ x: x1, y: y1 }) => {
    if (threatning(x1, y1, renderedBoard)) canBlock = true;
  });
  return canBlock;
}

function checkMate(threatners) {
  const { wKing, bKing } = pieces;
  const { x, y, black } = blackPlaying ? wKing : bKing;
  const threatning = blackPlaying ? isThreatnedByBlack : isThreatnedByWhite;
  const canMoveTo = ChessMovements.kingCanMoveTo(x, y, renderedBoard, black);

  const legalMovements = canMoveTo.filter(
    ({ x: toX, y: toY }) => !threatning(toX, toY, renderedBoard).length
  );
  console.log("legalMovements ");
  console.log(!legalMovements);
  if (threatners.length > 1) {
    console.log("double check");
    return !legalMovements.length;
  }
  const canCaptureThreatner = threatnerInDanger(threatners[0], x, y);

  return (
    !legalMovements.length &&
    !canCaptureThreatner &&
    !canBlockThreatner(threatners[0])
  );
}

function check() {
  const threatning = blackPlaying ? isWKingThreatned : isBKingThreatned;
  const threatners = threatning(renderedBoard);
  const isInCheck = !!threatners.length;
  console.log("threatning");
  console.log(threatners);
  console.log(isInCheck);
  let status = statusCode.NONE;
  if (isInCheck) {
    status = blackPlaying ? statusCode.CHECK_WHITE : statusCode.CHECK_BLACK;
    if (checkMate(threatners)) {
      status += 2;
    }
  }

  return status;
}

export function movePiece(pieceName, toX, toY) {
  const pieceCopy = { ...pieces[pieceName] };
  const piece = pieces[pieceName];

  const { x, y } = piece;

  if (x === toX && y === toY) return;

  const boardCopy = renderedBoard.map(elem => elem.slice());
  boardCopy[toX][toY] = pieceName;
  boardCopy[x][y] = "";
  piece.x = toX;
  piece.y = toY;

  const wKingThreatned = isWKingThreatned(boardCopy);
  const bKingThreatned = isBKingThreatned(boardCopy);
  let illegalMove;

  if (blackPlaying) illegalMove = !!bKingThreatned.length;
  else illegalMove = !!wKingThreatned.length;

  if (!illegalMove) {
    const target = renderedBoard[toX][toY];
    if (target) pieces[target].canMoveTo = () => false;
    renderedBoard = boardCopy;
    gameStatus = check();
    console.log(`gameStatus: ${gameStatus}`);
    blackPlaying = !blackPlaying;
  } else pieces[pieceName] = pieceCopy;

  emitChange();
}

export function canMove(black) {
  return black === blackPlaying;
}

export function getBlackPlaying() {
  return blackPlaying;
}

export function observe(o) {
  if (observer) {
    throw new Error("Multiple observers not implemented.");
  }

  observer = o;
  emitChange();
}
