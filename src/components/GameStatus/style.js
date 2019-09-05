import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc((100vw - 85vh) / 2);
  justify-content: space-around;
`;

export const Turn = styled.div`
  background-color: ${props => (props.black ? "#000" : "#FFF")};
  color: ${props => (props.black ? "#FFF" : "#000")};
  height: 60px;
  text-align: center;
  overflow: hidden;
  width: 70%;
  align-self: center;
  /*position: absolute;
  top: 50%;
  left: calc(((100vw - 85vh) / 2) / 2);
  transform: translate(-50%, -50%);*/
  border-radius: 2.5px;
  transition: color 0.9, background-color 0.9;
  user-select: none;

  div {
    line-height: 60px;
    text-align: center;
    align-self: center;
    padding: 0 40px;
    text-transform: uppercase;
    font-size: 40px;
    letter-spacing: 3px;
  }

  div:first-child {
    transition: margin-top 1.15s;
    margin-top: ${props => {
      if (props.status > 0 && props.status < 3) return "-120px";
      if (props.status > 2) return "-180px";
      return props.black ? "-60px" : "0px";
    }};
  }
`;

export const Button = styled.div`
  margin-top: 10px;
  background-color: lightgrey;
  width: 25%;
  align-self: center;
  text-align: center;
  border-radius: 2.5px;
  font-size: 25px;
  cursor: pointer;
  user-select: none;
  &:active {
    transform: scale(1.03);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
