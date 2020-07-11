import React from 'react';
import styled from '@emotion/styled';


const Content = styled.div`
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
    return(
        <>
            <Content>
                <img src="undraw_no_data_qbuo.svg" alt=""/>
                <p>Not Content</p>
            </Content>
        </>
    )
}

export default NotContent;