import React from "react";

import { getBlackPlaying, gameStatus } from "~/services/Game";

import { Container, Turn } from "./style";

export default function GameStatus() {
  return (
    <Container>
      <Turn black={getBlackPlaying()} status={gameStatus}>
        <div>White</div>
        <div>Black</div>
        <div>Check</div>
        <div>Checkmate</div>
      </Turn>
    </Container>
  );
}
