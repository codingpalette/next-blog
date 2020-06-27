import React from 'react';
import Header from './Header';
import styled from '@emotion/styled';
// import Container from '@material-ui/core/Container';


const ContainerBox = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    @media (min-width: 1024px) {
        flex-direction: row;
        flex-wrap: wrap;
    }
`;

const ContentBox = styled.div`
    width: 100%;
    height: calc(100% - 100px);
    flex: 1;
    overflow-y: auto;
    @media (min-width: 1024px) {
       height: calc(100% - 50px);
    }
`;


const Layout = ({ children }) => {
    return(
        <>
            <ContainerBox>
                <Header />
                <ContentBox>
                    {children}
                </ContentBox>
            </ContainerBox>

            {/*<ContainerBox maxWidth="md">*/}
            {/*    {children}*/}
            {/*</ContainerBox>*/}
        </>
    )
}

export default Layout