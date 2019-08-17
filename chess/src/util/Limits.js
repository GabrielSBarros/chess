function underLimitis(x, y) {
  return x < 8 && x > -1 && y < 8 && y > -1;
}

/* 
  Each function returns the number of squares a piece can move until reach other piece
  with a specific path direction

  Straight Movements:
    Top: x = 0
    Bottom: x = 7
    Left: y = 0
    Right: y = 7

  Diagonal Movements:
    TopLeft: x = 0 and y = 0
    TopRight: x = 0 and y = 7
    BottomLeft: x = 7 and y = 0
    BottomRight: x = 7 and y = 7
*/

function getTopLim(x, y, board) {
  let topLim;
  for (topLim = x - 1; topLim >= 0; topLim--)
    if (board[topLim][y] !== "") break;
  return topLim;
}

function getBottomLim(x, y, board) {
  let bottomLim;
  for (bottomLim = x + 1; bottomLim < 8; bottomLim++)
    if (board[bottomLim][y] !== "") break;
  return bottomLim;
}

function getLeftLim(x, y, board) {
  let leftLim;
  for (leftLim = y - 1; leftLim >= 0; leftLim--)
    if (board[x][leftLim] !== "") break;
  return leftLim;
}

function getRightLim(x, y, board) {
  let rightLim;
  for (rightLim = y + 1; rightLim < 8; rightLim++)
    if (board[x][rightLim] !== "") break;
  return rightLim;
}

function getTopLeftLim(x, y, board) {
  let topLeftLim;
  for (topLeftLim = 1; topLeftLim <= 7; topLeftLim++)
    if (
      !underLimitis(x - topLeftLim, y - topLeftLim) ||
      board[x - topLeftLim][y - topLeftLim] !== ""
    )
      break;
  return topLeftLim;
}

function getTopRightLim(x, y, board) {
  let topRightLim;
  for (topRightLim = 1; topRightLim <= 7; topRightLim++)
    if (
      !underLimitis(x - topRightLim, y + topRightLim) ||
      board[x - topRightLim][y + topRightLim] !== ""
    )
      break;
  return topRightLim;
}

function getBottomLeftLim(x, y, board) {
  let bottomLeftLim;
  for (bottomLeftLim = 1; bottomLeftLim <= 7; bottomLeftLim++)
    if (
      !underLimitis(x + bottomLeftLim, y - bottomLeftLim) ||
      board[x + bottomLeftLim][y - bottomLeftLim] !== ""
    )
      break;
  return bottomLeftLim;
}

function getBottomRightLim(x, y, board) {
  let bottomRightLim;
  for (bottomRightLim = 1; bottomRightLim <= 7; bottomRightLim++)
    if (
      !underLimitis(x + bottomRightLim, y + bottomRightLim) ||
      board[x + bottomRightLim][y + bottomRightLim] !== ""
    )
      break;
  return bottomRightLim;
}

export default {
  underLimitis,
  getTopLim,
  getBottomLim,
  getLeftLim,
  getRightLim,
  getTopLeftLim,
  getTopRightLim,
  getBottomLeftLim,
  getBottomRightLim,
};
