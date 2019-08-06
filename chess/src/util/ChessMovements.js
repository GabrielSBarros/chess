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

export default {
  rook: () => false,
  knight: canMoveKnight,
  bishop: () => false,
  queen: () => false,
  king: () => false,
  wpawn: canMoveWhitePawn,
  bpawn: () => false,
};
