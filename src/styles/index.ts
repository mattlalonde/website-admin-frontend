import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
 
export const GlobalStyle = createGlobalStyle`
    ${normalize}
 
    *, :after, :before {
        box-sizing: border-box;
    }
`