import VazirBold from '@/assets/fonts/Vazir-Bold.ttf';
import VazirLight from '@/assets/fonts/Vazir-Light.ttf';
import VazirMedium from '@/assets/fonts/Vazir-Medium.ttf';
import VazirRegular from '@/assets/fonts/Vazir-Regular.ttf';
import { createGlobalStyle } from 'styled-components';
import { themeColor } from '@/theme/Theme';

const GlobalStyles = createGlobalStyle`
*,
*:before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  user-select: none;
}

body {
  font-family: Vazir, sans-serif;
  color: ${themeColor("gray")}
}

button {
  border: none;
  outline: none;
  font: inherit;
}

@font-face {
  font-family: Vazir;
  font-weight: 300;
  src: url(${VazirLight});
}

@font-face {
  font-family: Vazir;
  font-weight: 400;
  src: url(${VazirRegular});
}

@font-face {
  font-family: Vazir;
  font-weight: 500;
  src: url(${VazirMedium});
}

@font-face {
  font-family: Vazir;
  font-weight: 700;
  src: url(${VazirBold});
}

`;

export default GlobalStyles;
