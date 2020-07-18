import React from 'react';
import wrapper from "../store/configureStore";
import axios from "axios";
import {LOAD_MY_INFO_REQUEST} from "../reducers/user";
import {END} from "redux-saga";

import styled from '@emotion/styled'
import Layout from '../components/Layout';
import Link from "next/link";
import Button from "@material-ui/core/Button";

const ContentBox = styled.div`
    width: 100%;
    height: calc(100% - 100px);
    flex: 1;
    overflow-y: auto;
    @media (min-width: 1024px) {
       height: calc(100% - 50px);
    }
`;


const ContentHeader = styled.div`
    background-color: #fff;
    padding: 2rem 1rem;
    box-sizing: border-box;
    & h2{
       font-size: 2.5rem;
       font-weight: bold;
    }
    & .link_box{
        text-align: right;
    }
`;

const Container = styled.div`
    display: block;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    & .content {
        width: 100%;
        max-width: 1100px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        padding: 1rem;
        box-sizing: border-box;
    }
`;

const Setting = () => {
    return (
        <>
            <Layout>
                <ContentBox>
                    <ContentHeader>
                        <h2>환결설정</h2>
                    </ContentHeader>
                    <Container>
                        <div className="content">
                            sdfdff
                        </div>
                    </Container>
                </ContentBox>
            </Layout>
        </>
    )
};


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


    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Setting;