import React from "react";

import { getBlackPlaying, gameStatus, reset } from "~/services/Game";

import { Container, Turn, Button, Content } from "./style";

export default function GameStatus() {
  return (
    <Container>
      <Content>
        <Turn black={getBlackPlaying()} status={gameStatus}>
          <div>White</div>
          <div>Black</div>
          <div>Check</div>
          <div>Checkmate</div>
        </Turn>
        <Button onClick={() => reset()}>Restart</Button>
      </Content>
    </Container>
  );
}
