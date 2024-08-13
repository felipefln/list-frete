import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    font-weight: 500; // Define o peso padrão, pode ser ajustado conforme necessário
  }
`;

export default GlobalStyle;