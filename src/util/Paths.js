import Limits from "~/util/Limits";

const coorX = [0, 1, 2, 3, 4, 5, 6, 7];

const coords = [];

const coords1 = coorX.map(x1 =>
  coorX.map(y1 => {
    return { x: x1, y: y1 };
  })
);

function diagonal(x, y, toX, toY) {
  const dX = Math.abs(toX - x);
  const dY = Math.abs(toY - y);
  return dX === dY;
}

function straight(x, y, toX, toY) {
  return (toX !== x && toY === y) || (toX === x && toY !== y);
}

for (let i = 0; i < coords1.length; i++) coords.push(...coords1[i]);

function topLeftPath(x1, y1, diagonalPath, board) {
  const limit = Limits.getTopLeftLim(x1, y1, board);
  const validCoords = diagonalPath.filter(
    ({ x, y }) => x > x1 - limit && x < x1 && y < y1
  );
  return validCoords;
}

function topRightPath(x1, y1, diagonalPath, board) {
  const limit = Limits.getTopRightLim(x1, y1, board);
  const validCoords = diagonalPath.filter(
    ({ x, y }) => x > x1 - limit && x < x1 && y > y1
  );
  return validCoords;
}

function bottomLeftPath(x1, y1, diagonalPath, board) {
  const limit = Limits.getBottomLeftLim(x1, y1, board);
  const validCoords = diagonalPath.filter(
    ({ x, y }) => x < x1 + limit && x > x1 && y < y1
  );
  return validCoords;
}

function bottomRightPath(x1, y1, diagonalPath, board) {
  const limit = Limits.getBottomRightLim(x1, y1, board);
  const validCoords = diagonalPath.filter(
    ({ x, y }) => x < x1 + limit && x > x1 && y > y1
  );
  return validCoords;
}

function topPath(x1, y1, straightPath, board) {
  const limit = Limits.getTopLim(x1, y1, board);
  const validCoords = straightPath.filter(({ x }) => x < x1 && x > limit);
  return validCoords;
}

function bottomPath(x1, y1, straightPath, board) {
  const limit = Limits.getBottomLim(x1, y1, board);
  const validCoords = straightPath.filter(({ x }) => x > x1 && x < limit);
  return validCoords;
}

function leftPath(x1, y1, straightPath, board) {
  const limit = Limits.getLeftLim(x1, y1, board);
  const validCoords = straightPath.filter(({ y }) => y < y1 && y > limit);
  return validCoords;
}

function rightPath(x1, y1, straightPath, board) {
  const limit = Limits.getRightLim(x1, y1, board);
  const validCoords = straightPath.filter(({ y }) => y > y1 && y < limit);
  return validCoords;
}

function diagonalPathTo(x1, y1, toX, toY, board) {
  const diagonalCoords = coords.filter(({ x, y }) => diagonal(x1, y1, x, y));
  let direction = 0; // Direction aiming for the top and the left
  if (toX > x1) direction += 1; // Makes the direction aim to the bottom
  if (toY > y1) direction += 2; // Makes the direction aim to the right
  switch (direction) {
    case 0:
      return topLeftPath(x1, y1, diagonalCoords, board);
    case 1:
      return bottomLeftPath(x1, y1, diagonalCoords, board);
    case 2:
      return topRightPath(x1, y1, diagonalCoords, board);
    case 3:
      return bottomRightPath(x1, y1, diagonalCoords, board);
    default:
      return [];
  }
}

function straightPathTo(x1, y1, toX, toY, board) {
  const straightCoords = coords.filter(({ x, y }) => straight(x1, y1, x, y));
  let direction = 0;
  if (toX > x1) direction += 1;
  else if (toY !== y1) direction += 2;
  if (toY > y1) direction += 1;

  switch (direction) {
    case 0:
      return topPath(x1, y1, straightCoords, board);
    case 1:
      return bottomPath(x1, y1, straightCoords, board);
    case 2:
      return leftPath(x1, y1, straightCoords, board);
    case 3:
      return rightPath(x1, y1, straightCoords, board);
    default:
      return [];
  }
}

function queenPathTo(x1, y1, toX, toY, board) {
  return straight(x1, y1, toX, toY)
    ? straightPathTo(x1, y1, toX, toY, board)
    : diagonalPathTo(x1, y1, toX, toY, board);
}

export default {
  bishop: diagonalPathTo,
  rook: straightPathTo,
  queen: queenPathTo,
  pawn: () => [],
  wpawn: () => [],
  bpawn: () => [],
  king: () => [],
  knight: () => [],
};
