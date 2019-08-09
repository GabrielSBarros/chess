import React from "react";
import { Container, Turn } from "./style";
import { getBlackPlaying } from "../../services/Game";

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
