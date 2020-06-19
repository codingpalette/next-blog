import React from 'react';
import Header from './Header'
import Content from "./Content";
import styled from '@emotion/styled';


const AppBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
  @media (min-width: 1024px) {
     flex-direction: row;
  }
`;



const AppLayout = ({children}) => {
    return(
        <>
            <AppBox>
                <Header />
                <Content children={children} />
            </AppBox>
        </>
    )
}

export default  AppLayout;