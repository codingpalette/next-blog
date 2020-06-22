import React from 'react';
import { GlobalStyle } from './GlobalStyle';
import Header from './Header';
import Aside from "./Aside";
import Main from "./Main";
import styled from '@emotion/styled';



const AppBox = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #e8e8ee;
  & #app{
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      max-width: 1300px;
      margin: 0 auto;
      padding: 5px;
      box-sizing: border-box;
  }
  
  @media (min-width: 1024px) {
    & #app{
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;



const AppLayout = ({ children }) => {
    return(
        <>
            <GlobalStyle />
            <AppBox>
                <div id="app">
                    <Aside />
                    <Main children={children} />
                </div>
            </AppBox>
        </>
    )
}

export default  AppLayout;