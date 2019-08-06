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
  let topLim;
  for (topLim = x + 1; topLim < 8; topLim++) if (board[topLim][y] !== "") break;

  let bottomLim;
  for (bottomLim = x - 1; bottomLim >= 0; bottomLim--)
    if (board[bottomLim][y] !== "") break;

  let leftLim;
  for (leftLim = y - 1; leftLim >= 0; leftLim--)
    if (board[x][leftLim] !== "") break;

  let rightLim;
  for (rightLim = y + 1; rightLim < 8; rightLim++)
    if (board[x][rightLim] !== "") break;

  return (
    ((toX === x && toY !== y) || (toY === y && toX !== x)) &&
    (toX <= topLim && toX >= bottomLim) &&
    (toY <= rightLim && toY >= leftLim)
  );
}

export default {
  rook: canMoveRook,
  knight: canMoveKnight,
  bishop: () => false,
  queen: () => false,
  king: canMoveKing,
  wpawn: canMoveWhitePawn,
  bpawn: canMoveBlackPawn,
};
