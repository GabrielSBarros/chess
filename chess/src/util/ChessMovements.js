import Limits from "./Limits";

function diagonalMovement(x, y, toX, toY, board) {
  const dX = Math.abs(x - toX);
  const dY = Math.abs(y - toY);
  const topLeftLim = Limits.getTopLeftLim(x, y, board);
  const topRightLim = Limits.getTopRightLim(x, y, board);
  const bottomLeftLim = Limits.getBottomLeftLim(x, y, board);
  const bottomRightLim = Limits.getBottomRightLim(x, y, board);

  return (
    dX === dY &&
    ((toX < x && toY < y && toX >= x - topLeftLim && toY >= y - topLeftLim) ||
      (toX < x &&
        toY > y &&
        toX >= x - topRightLim &&
        toY <= y + topRightLim) ||
      (toX > x &&
        toY < y &&
        toX <= x + bottomLeftLim &&
        toY >= y - bottomLeftLim) ||
      (toX > x &&
        toY > y &&
        toX <= x + bottomRightLim &&
        toY <= y + bottomRightLim))
  );
}

function straightMovement(x, y, toX, toY, board) {
  const topLim = Limits.getTopLim(x, y, board);
  const bottomLim = Limits.getBottomLim(x, y, board);
  const leftLim = Limits.getLeftLim(x, y, board);
  const rightLim = Limits.getRightLim(x, y, board);

  return (
    ((toX === x && toY !== y) || (toY === y && toX !== x)) &&
    (toX >= topLim && toX <= bottomLim) &&
    (toY <= rightLim && toY >= leftLim)
  );
}

function canMoveKnight(x, y, toX, toY) {
  const dX = Math.abs(x - toX);
  const dY = Math.abs(y - toY);

  return (dX === 2 && dY === 1) || (dX === 1 && dY === 2);
}

function canMoveWhitePawn(x, y, toX, toY, board) {
  return (
    (x > 0 &&
      board[x - 1][y] === "" &&
      ((x === 6 && toY === y && (board[x - 2][y] === "" && toX === x - 2)) ||
        (toX === x - 1 && toY === y))) ||
    (toX === x - 1 &&
      ((toY === y + 1 && board[x - 1][y + 1] !== "") ||
        (toY === y - 1 && board[x - 1][y - 1] !== "")))
  );
}

function canMoveBlackPawn(x, y, toX, toY, board) {
  return (
    (x < 7 &&
      board[x + 1][y] === "" &&
      ((x === 1 && toY === y && (board[x + 2][y] === "" && toX === x + 2)) ||
        (toX === x + 1 && toY === y))) ||
    (toX === x + 1 &&
      ((toY === y + 1 && board[x + 1][y + 1] !== "") ||
        (toY === y - 1 && board[x + 1][y - 1] !== "")))
  );
}

function canMoveKing(x, y, toX, toY) {
  const dX = Math.abs(x - toX);
  const dY = Math.abs(y - toY);
  return dX <= 1 && dY <= 1 && dX + dY <= 2;
}

function canMoveRook(x, y, toX, toY, board) {
  return straightMovement(x, y, toX, toY, board);
}

function canMoveBishop(x, y, toX, toY, board) {
  return diagonalMovement(x, y, toX, toY, board);
}

function canMoveQueen(x, y, toX, toY, board) {
  return (
    straightMovement(x, y, toX, toY, board) ||
    diagonalMovement(x, y, toX, toY, board)
  );
}

export default {
  rook: canMoveRook,
  knight: canMoveKnight,
  bishop: canMoveBishop,
  queen: canMoveQueen,
  king: canMoveKing,
  wpawn: canMoveWhitePawn,
  bpawn: canMoveBlackPawn,
};
