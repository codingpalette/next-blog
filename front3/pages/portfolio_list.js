import React, {useCallback, useEffect, useRef} from 'react';
import Link from 'next/link';
import Router from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {END} from "redux-saga";
import axios from "axios";

import styled from '@emotion/styled';
import Layout from "../components/Layout";
import ContentHeader from "../components/ContentHeader";
import PortfolioTrList from "../components/PortfolioTrList";
import NotContent from "../components/NotContent";
import {LOAD_MY_INFO_REQUEST} from "../reducers/user";
import {LOAD_PORTFOLIOS_REQUEST} from "../reducers/portfolio";
import wrapper from "../store/configureStore";

import Button from '@material-ui/core/Button';

const Container = styled.div`
    padding: 1rem;
    box-sizing: border-box;
    & .table_content{
        width: 100%;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
    }
    & .table_content table{
        width: 100%;
    }
    & .table_content thead th{
        padding: 1rem;
        font-size: 12px;
        text-align: left;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
    & .table_content tbody tr{
        position: relative;
    }
    & .table_content tbody tr:hover {
        background: #f5f5f5;
    }
    & .table_content tbody td {
        color: rgba(0, 0, 0, 0.54);
        font-size: 13px;
        padding: 0.5rem 1rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        white-space: nowrap;
    }
    & .table_content tbody td .btn_box{
        text-align: right;
        position: relative;
    }
`;


const portfolioList = () => {

    const dispatch = useDispatch();
    const { portfolios, hasMorePortfolios, loadPortfoliosLoading } = useSelector((state) => state.portfolio);

    useEffect(() => {

        function onScroll() {
            if (window.scrollY + document.documentElement.clientHeight >  document.documentElement.scrollHeight - 300  ) {
                if (hasMorePortfolios && !loadPortfoliosLoading) {
                    const lastId = portfolios[portfolios.length - 1]?.id;
                    dispatch({
                        type: LOAD_PORTFOLIOS_REQUEST,
                        lastId,
                    })
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [hasMorePortfolios, loadPortfoliosLoading, portfolios])

    return (
        <>
            <Layout>
                <ContentHeader title="포트폴리오 리스트">
                    <div className="link_box">
                        <Link href="/portfolio_write">
                            <a>
                                <Button color="primary">포트폴리오 작성</Button>
                            </a>
                        </Link>
                    </div>
                </ContentHeader>
                <Container>
                    {portfolios.length > 0 ? (
                        <div className="table_content">
                            <table>
                                <thead>
                                <tr>
                                    <th>제목</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {portfolios.length > 0 && portfolios.map(item => (
                                    <PortfolioTrList key={item.id} post={item}/>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <NotContent/>
                    )}

                </Container>
            </Layout>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    // console.log(context)
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_PORTFOLIOS_REQUEST
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default portfolioList;
