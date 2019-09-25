import Reactotron from "reactotron-react-js";
import ChessMovements from "~/util/ChessMovements";
import { startBoard, startPieces, Piece } from "~/util/constants";

const statusCode = {
  NONE: 0,
  CHECK_WHITE: 1,
  CHECK_BLACK: 2,
  CHECKMATE_WHITE: 3,
  CHECKMATE_BLACK: 4,
};

let observer = null;
let blackPlaying = false;
let movements = [];
// eslint-disable-next-line import/no-mutable-exports
export let gameStatus = statusCode.NONE;

let renderedBoard = startBoard();

function printMovements() {
  return movements
    .map(movement => {
      const { x, y } = movement.from;
      const { x: toX, y: toY } = movement.to;
      return `${movement.piece} from: ${x} ${y} to: ${toX} ${toY}`;
    })
    .reverse();
}

let pieces = startPieces();

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
    Reactotron.log(`${x1} ${y1}`);
    Reactotron.log(threatning(x1, y1, renderedBoard));
    if (threatning(x1, y1, renderedBoard)) {
      canBlock = true;
    }
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

  Reactotron.log(`legalMovements ${legalMovements.length}`);
  Reactotron.log(`canCapture ${canCaptureThreatner}`);
  Reactotron.log(`canBlock ${canBlockThreatner(threatners[0], x, y)}`);
  return (
    !legalMovements.length &&
    !canCaptureThreatner &&
    !canBlockThreatner(threatners[0], x, y)
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

function promotion(pieceName) {
  const {x, y, black, id} = pieces[pieceName];
  pieces[pieceName] = Piece(x, y, "queen", black, id); 
  Reactotron.log(`promotion${pieceName}`);
}

export function movePiece(pieceName, toX, toY) {
  const pieceCopy = { ...pieces[pieceName] };
  const piece = pieces[pieceName];

  const { x, y, type } = piece;

  if (x === toX && y === toY) return;

  const boardCopy = renderedBoard.map(elem => elem.slice());

  const target = renderedBoard[toX][toY];
  if (target) pieces[target].canMoveTo = () => false;
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
    renderedBoard = boardCopy;
    gameStatus = check();
    console.log(`gameStatus: ${gameStatus}`);
    blackPlaying = !blackPlaying;
    movements.push({
      piece: pieceName,
      from: { x, y },
      to: { x: toX, y: toY },
    });
    if ((type === "wpawn" && toX === 0) || (type === "bpawn" && toX === 7)) {
      promotion(pieceName);
    }
    Reactotron.log(printMovements());
  } else {
    pieces[pieceName] = pieceCopy;
    if (target) pieces[target].canMoveTo = ChessMovements[pieces[target].type];
  }

  emitChange();
}

export function canMove(black) {
  return black === blackPlaying;
}

export function getBlackPlaying() {
  return blackPlaying;
}

export function reset() {
  movements = [];
  pieces = startPieces();
  renderedBoard = startBoard();
  setBoard();
  blackPlaying = false;
  gameStatus = statusCode.NONE;
  emitChange();
}

export function observe(o) {
  if (observer) {
    throw new Error("Multiple observers not implemented.");
  }

  observer = o;
  emitChange();
}
