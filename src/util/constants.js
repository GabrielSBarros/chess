import ChessMovements from "./ChessMovements";
import Paths from "./Paths";

const genericMatriz = [[], [], [], [], [], [], [], []];
export function startBoard() {
  return genericMatriz.map(() => genericMatriz.map(() => ""));
}

export function Piece(x, y, type, black, id) {
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

export function startPieces() {
  return {
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
}
