import styled from "styled-components";

export const Container = styled.div`
  font-size: 70px;
  text-align: center;
  cursor: move;
  background-color: inherit;
  color: ${props => (props.black ? "black" : "white")};
  opacity: ${props => (props.isDragging ? 0.5 : 1)};
`;
