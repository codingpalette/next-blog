import React from 'react';
import Header from './Header';
import Aside from "./Aside";
import Content from "./Content";
import styled from '@emotion/styled';



const AppBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  margin: 0 auto;
  padding: 5px;
  box-sizing: border-box;
  @media (min-width: 1024px) {
     flex-direction: row;
     justify-content: space-between;
  }
`;



const AppLayout = ({children}) => {
    return(
        <>
            <AppBox>
                {/*<Header />*/}
                <Aside />
                <Content children={children} />
            </AppBox>
        </>
    )
}

export default  AppLayout;