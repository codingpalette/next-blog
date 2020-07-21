import React from 'react';
import { END } from 'redux-saga';
import axios from 'axios';

import styled from '@emotion/styled'
import Layout from '../components/Layout';
import ContentHeader from "../components/ContentHeader";
import wrapper from "../store/configureStore";
import {LOAD_MY_INFO_REQUEST} from "../reducers/user";

const ContentBox = styled.div`
    width: 100%;
    height: calc(100% - 100px);
    flex: 1;
    overflow-y: auto;
    @media (min-width: 1024px) {
       height: calc(100% - 50px);
    }
`;

const Profile = () => {
    return(
        <>
            <Layout>
                <ContentBox>
                    <ContentHeader title="프로필" />
                    <div>
                        sfsdf
                    </div>
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


export default Profile;