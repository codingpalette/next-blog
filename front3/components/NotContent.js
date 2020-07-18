import React from 'react';
import styled from '@emotion/styled';


const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;


const Content = styled.div`
    margin: auto;
    padding-left: 1rem;
    box-sizing: border-box;
    text-align: center;
    & img{
        max-width:500px;
        width: 100%;
        height: auto;
    }
    & p{
        font-size: 2.5rem;
        font-weight: bold;
        margin-top: 0.5rem;
    }
`;

const NotContent = () => {
    return (
        <>
            <Container>
                <Content>
                    <img src="/undraw_no_data_qbuo.svg" alt=""/>
                    <p>Not Content</p>
                </Content>
            </Container>
        </>
    )
}

export default NotContent;