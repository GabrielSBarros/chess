import React from "react";

import { getBlackPlaying } from "~/services/Game";

import { Container, Turn } from "./style";

export default function GameStatus() {
  return (
    <Container>
      <Turn black={getBlackPlaying()}>
        <div>White</div>
        <div>Black</div>
      </Turn>
    </Container>
  );
}
