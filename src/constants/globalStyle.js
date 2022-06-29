import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    padding: 0px;
    margin: 0px;
    width: 100vw;
    height: 100vh;
    position:relative;
    background-color: whitesmoke;
    min-width: 415px;
    min-height: 790px;
}`;

export default GlobalStyle;
