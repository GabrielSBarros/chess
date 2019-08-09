import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=VT323:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  } 

  html, body, #root{
    height: 100%;
    background: linear-gradient(0deg, #402845, #22202C);
    font-family: VT323, sans-serif;
  }

  #root{
    display: flex;
    justify-content: space-around;
  }
`;
