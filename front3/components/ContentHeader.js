import React from 'react';

import styled from '@emotion/styled';

const Content = styled.div`
    padding: 2rem 1rem;
    box-sizing: border-box;
    background-color: #fff;
    & h2{
       font-size: 2.5rem;
       font-weight: bold;
    }
     & .link_box{
        text-align: right;
    }
`;

const ContentHeader = ({ title, children }) => {
    return(
        <>
            <Content>
                <h2>{title}</h2>
                {children}
            </Content>
        </>
    )
};

export default ContentHeader;