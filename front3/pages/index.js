import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { END } from 'redux-saga';
import axios from 'axios';

import styled from '@emotion/styled'
import Layout from '../components/Layout';
import PostList from "../components/PostList";
import {LOAD_POSTS_REQUEST, RESET_SUCCESS } from "../reducers/post";
import {LOAD_MY_INFO_REQUEST} from "../reducers/user";
import wrapper from '../store/configureStore';

const Container = styled.div`
    display: block;
    width: 100%;
    padding: 1rem 1rem 0 0;
    box-sizing: border-box;
    
    & ul{
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
    }

`;


const IndexPage = () => {
    const dispatch = useDispatch();
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

    useEffect(() => {
        if (mainPosts.length === 0) {
            dispatch({
                type: LOAD_POSTS_REQUEST
            })
        }
    }, [])

    useEffect(() => {
        dispatch({
            type: RESET_SUCCESS
        })
    })

    return(
        <>
            <Layout>
                <Container>
                    <ul>
                        { mainPosts.map((post) => <PostList key={post.id} post={post} />) }
                    </ul>
                </Container>
                {/*<Grid container spacing={3}>*/}
                {/*    { mainPosts.map((post) => <PostList key={post.id} post={post} />) }*/}

                {/*</Grid>*/}
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

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});



export default IndexPage