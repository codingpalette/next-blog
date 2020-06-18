import React from 'react';
import Header from './Header'
import styled from '@emotion/styled';


const AppBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
     flex-direction: row;
  }
`;

const AppLayout = ({children}) => {
    return(
        <>
            <AppBox>
                <Header />
                {children}

            </AppBox>
        </>
    )
}

export default  AppLayout;