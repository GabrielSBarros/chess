import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
  cursor: move;
  height: 100%;
  opacity: ${props => (props.isDragging ? 0.5 : 1)};
  img {
    height: 85%;
    align-self: center;
  }
`;
