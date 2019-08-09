import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  } 

  html, body, #root{
    height: 100%;
    background: linear-gradient(0deg, #402845, #22202C);
  }

  #root{
    display: flex;
    justify-content: space-around;
  }
`;
