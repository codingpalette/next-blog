import React from 'react';
import Link from 'next/link';

import styled from '@emotion/styled';


const ListBox = styled.li`
    position: relative;
    width: 100%;
    padding-left: 1rem;
    box-sizing: border-box;
    margin-bottom: 1rem;
    transition: 0.3s;
    
    &:hover{
        transform: translateY(-5px);
    }
    
    @media (min-width: 1024px) {
        width: 50%;
    }
    
    @media (min-width: 1280px) {
        width: 33.33%;
    }
    
    @media (min-width: 1600px) {
        width: 25%;
    }
    
    @media (min-width: 2000px) {
        width: 20%;
    }
    
    & .list_content{
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        border-radius: 4px;
        height: 250px;
    }

`;

const PortfolioList = ({ post }) => {
    return(
        <>
            <ListBox>

                <a href="https://www.naver.com/" target="_blank">
                    <div className="list_content">
                        {/*{post.}*/}
                    </div>
                </a>

            </ListBox>
        </>
    )
};

export default PortfolioList;
