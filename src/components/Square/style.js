import styled from "styled-components";

export const Container = styled.div`
  background-color: ${props => {
    if (props.isOver && !props.canDrop) return "red";
    if (!props.isOver && props.canDrop) return "#FADA5E";
    if (props.isOver && props.canDrop) return "green";
    return props.black ? "#666666" : "rgba(255, 255, 255, 0.5)";
  }};
  border: 1px solid lightgrey;
  height: 12.5%;
  width: 12.5%;
  flex: 0 0 12.5%;
`;
