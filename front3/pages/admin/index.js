import React, {useEffect} from 'react';
import Link from 'next/link';
import {useDispatch, useSelector} from "react-redux";
import {END} from 'redux-saga';
import axios from 'axios';

import styled from '@emotion/styled'
import Layout from '../../components/Layout';
import ContentHeader from "../../components/ContentHeader";

import {LOAD_TAGS_REQUEST} from "../../reducers/post";
import {LOAD_MY_INFO_REQUEST} from "../../reducers/user";
import wrapper from '../../store/configureStore';



const ContentBox = styled.div`
    width: 100%;
    height: calc(100% - 100px);
    flex: 1;
    overflow-y: auto;
    @media (min-width: 1024px) {
       height: calc(100% - 50px);
    }
`;


const PostBody = styled.div`
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



const Admin = () => {
    const dispatch = useDispatch();
    const { tags } = useSelector((state) => state.post)

    // useEffect(() => {
    //     dispatch({
    //         type: LOAD_TAGS_REQUEST
    //     });
    // }, [])

    return (
        <>
            <Layout>
                <ContentBox>
                    <ContentHeader title="Admin" />
                    <PostBody>
                        <div className='content'>
                            <div>
                                <Link href="/admin/post_list">
                                    <a>
                                        블로그 포스트 관리
                                    </a>
                                </Link>
                            </div>
                            <div>
                                <Link href="/admin/portfolio_list">
                                    <a>
                                        포트폴리오 관리
                                    </a>
                                </Link>
                            </div>

                        </div>
                    </PostBody>
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

export default Admin;