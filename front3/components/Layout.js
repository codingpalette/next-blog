import React from 'react';
import Header from './Header';
import styled from '@emotion/styled';
import Container from '@material-ui/core/Container';


const ContainerBox = styled(Container)`
    padding-top: 16px;
    padding-bottom: 16px;
    box-sizing: border-box;
`;


const Layout = ({ children }) => {
    return(
        <>
            <Header />
            <ContainerBox maxWidth="md">
                {children}
            </ContainerBox>
        </>
    )
}

export default Layout