import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {END} from 'redux-saga';
import axios from 'axios';
import { backUrl } from '../../config/config'

import styled from '@emotion/styled'
import Layout from '../../components/Layout';
import PortfolioList from "../../components/PortfolioList";

import {LOAD_MY_INFO_REQUEST} from "../../reducers/user";
import {LOAD_PORTFOLIOS_REQUEST} from "../../reducers/portfolio";

import wrapper from '../../store/configureStore';
import Link from "next/link";
import Chip from "@material-ui/core/Chip";
import NotContent from "../../components/NotContent";
import PostList from "../../components/PostList";


const ContentBox = styled.div`
    width: 100%;
    height: calc(100% - 100px);
    flex: 1;
    overflow-y: auto;
    @media (min-width: 1024px) {
       height: calc(100% - 50px);
    }
`;


const Container = styled.div`
    display: block;
    width: 100%;
    //height: 100%;
    padding: 1rem 1rem 0 0;
    box-sizing: border-box;
    
    & ul{
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
    }
    & ul li {
        position: relative;
        width: 100%;
        padding-left: 1rem;
        box-sizing: border-box;
        margin-bottom: 1rem;
        transition: 0.3s;
        
        cursor: pointer;
    }
    & ul li:hover{
        transform: translateY(-5px);
    }
    & .list_content{
        border-radius: 4px;
        overflow: hidden;
        height: 300px;
        position: relative;
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
    }
    & ul li img{
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    
    @media (min-width: 1024px) {
        & ul li {
            width: 50%;
        }
    }
    
    @media (min-width: 1280px) {
        & ul li {
            width: 33.33%;
        }
    }
    
    @media (min-width: 1600px) {
        & ul li {
            width: 25%;
        }
    }
    
    @media (min-width: 2000px) {
        & ul li {
             width: 20%;
        }
    }
`;




const Portfolio = () => {
    const dispatch = useDispatch();
    const { portfolios } = useSelector((state) => state.portfolio)


    useEffect(() => {
        dispatch({
            type: LOAD_PORTFOLIOS_REQUEST
        });
    }, [])

    return (
        <>
            <Layout>
                <ContentBox>
                    <Container>
                        {portfolios.length > 0 ? (
                            <ul>
                                {portfolios.map((item) => (
                                    <li key={item.id}>
                                        <div className="list_content">
                                            <img src={`${backUrl}/${item.Images[0].src}`} alt=""/>
                                        </div>
                                    </li>
                                ))}

                                {/*{portfolios.map((item) => <PortfolioList key={item.id} post={item} />)}*/}
                            </ul>

                        ) : (
                            <NotContent />
                        )}

                    </Container>
                </ContentBox>
            </Layout>
        </>
    )
};


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    // console.log('context -->', context)
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch({
        type: LOAD_PORTFOLIOS_REQUEST,
    })

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Portfolio;
