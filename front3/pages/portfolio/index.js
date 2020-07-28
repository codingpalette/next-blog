import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {END} from 'redux-saga';
import axios from 'axios';

import styled from '@emotion/styled'
import Layout from '../../components/Layout';
import ContentHeader from "../../components/ContentHeader";
import PortfolioList from "../../components/PortfolioList";

import {LOAD_MY_INFO_REQUEST} from "../../reducers/user";
import {LOAD_PORTFOLIOS_REQUEST} from "../../reducers/portfolio";

import wrapper from '../../store/configureStore';
import Link from "next/link";
import Chip from "@material-ui/core/Chip";


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
`;




const Portfolio = () => {
    const dispatch = useDispatch();


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

                        <ul>
                            <PortfolioList />
                        </ul>

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

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Portfolio;