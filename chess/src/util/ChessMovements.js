import Limits from "./Limits";

function diagonalMovement(x, y, toX, toY, board) {
  const dX = Math.abs(x - toX);
  const dY = Math.abs(y - toY);
  const topLeftLim = Limits.getTopLeftLim(x, y, board); // Limit of a diagonal path going to top and left
  const topRightLim = Limits.getTopRightLim(x, y, board); // Limit of a diagonal path going to top and right
  const bottomLeftLim = Limits.getBottomLeftLim(x, y, board); // Limit of a diagonal path going to bottom and left
  const bottomRightLim = Limits.getBottomRightLim(x, y, board); // Limit of a diagonal path going to bottom and right

  return (
    dX === dY && // in a diagonal movement the deltas of the square coordinates are the same
    ((toX < x && toY < y && toX >= x - topLeftLim && toY >= y - topLeftLim) || // Limits the path direction going to top and left
    (toX < x && toY > y && toX >= x - topRightLim && toY <= y + topRightLim) || // Limit the path direction going to top and right
    (toX > x &&
      toY < y &&
      toX <= x + bottomLeftLim &&
      toY >= y - bottomLeftLim) || // Limit the path direction going to bottom and left
      (toX > x &&
      toY > y &&
      toX <= x + bottomRightLim && // Limit the path direction going to bottom and right
        toY <= y + bottomRightLim))
  );
}

function straightMovement(x, y, toX, toY, board) {
  const topLim = Limits.getTopLim(x, y, board); // Limit of a vertical path going to x = 0
  const bottomLim = Limits.getBottomLim(x, y, board); // Limit of a vertical path going to x = 7
  const leftLim = Limits.getLeftLim(x, y, board); // Limit of a horizontal path going to y = 0
  const rightLim = Limits.getRightLim(x, y, board); // Limit of a horizontal path going to y = 7

  return (
    ((toX === x && toY !== y) || (toY === y && toX !== x)) && // A horizontal movement has y changing and x fixed and a vertical one the oposite
    (toX >= topLim && toX <= bottomLim) && // Limits the movement if there are pieces in the vetical path that the piece can move
    (toY <= rightLim && toY >= leftLim) // Limits the movement if there are pieces in the horizontal path that the piece can move
  );
}

function canMoveKnight(x, y, toX, toY) {
  const dX = Math.abs(x - toX);
  const dY = Math.abs(y - toY);

  return (dX === 2 && dY === 1) || (dX === 1 && dY === 2); // end of the L movements
}

function canMoveWhitePawn(x, y, toX, toY, board) {
  return (
    (x > 0 && // prevents the pawn from trying to move to a square out of the board
    board[x - 1][y] === "" && // checks if the square in front of the pawn is empty
      ((x === 6 && toY === y && (board[x - 2][y] === "" && toX === x - 2)) || // if the pawn is in the start square and the sencond square in front of the pawn is empty and the targeted
        (toX === x - 1 && toY === y))) || // if the targeted square is the first in front of the pawn
    (toX === x - 1 &&
      ((toY === y + 1 && board[x - 1][y + 1] !== "") || // checks if there's a piece in the right diagonal to capture
        (toY === y - 1 && board[x - 1][y - 1] !== ""))) // checks if there's a piece in the left diagonal to capture
  );
}

function canMoveBlackPawn(x, y, toX, toY, board) {
  return (
    (x < 7 && // prevents the pawn from trying to move to a square out of the board
    board[x + 1][y] === "" && // checks if the square in front of the pawn is empty
      ((x === 1 && toY === y && (board[x + 2][y] === "" && toX === x + 2)) || // if the pawn is in the start square and the sencond square in front of the pawn is empty and the targeted
        (toX === x + 1 && toY === y))) || // if the targeted square is the first in front of the pawn
    (toX === x + 1 &&
      ((toY === y + 1 && board[x + 1][y + 1] !== "") || // checks if there's a piece in the right diagonal to capture
        (toY === y - 1 && board[x + 1][y - 1] !== ""))) // checks if there's a piece in the left diagonal to capture
  );
}

function canMoveKing(x, y, toX, toY) {
  const dX = Math.abs(x - toX);
  const dY = Math.abs(y - toY);
  return dX <= 1 && dY <= 1 && dX + dY <= 2;
  // the sum of the deltas of the squares around the king are always or 2
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
