import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { END } from 'redux-saga';
import axios from 'axios';

import styled from '@emotion/styled'
import Layout from '../components/Layout';
import PostList from "../components/PostList";
import NotContent from "../components/NotContent";
import {LOAD_POSTS_REQUEST, RESET_SUCCESS } from "../reducers/post";
import {LOAD_MY_INFO_REQUEST} from "../reducers/user";
import wrapper from '../store/configureStore';



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




const IndexPage = () => {
    const dispatch = useDispatch();
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);



    useEffect(() => {
        // dispatch({
        //     type: RESET_SUCCESS
        // })
    }, []);


    useEffect(() => {

        function onScroll() {
            // console.log(target.scrollTop , target.clientHeight, targetUl.offsetHeight)
            // console.log(window.scrollY , document.documentElement.clientHeight, document.documentElement.scrollHeight)
            if (window.scrollY + document.documentElement.clientHeight >  document.documentElement.scrollHeight - 300 ) {
                if (hasMorePosts && !loadPostsLoading) {
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        lastId,
                    })
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [hasMorePosts, loadPostsLoading, mainPosts])

    return(
        <>
            <Layout >
                <Container >
                    {mainPosts.length > 0 ? (
                        <ul>
                            { mainPosts.map((post) => <PostList key={post.id} post={post} />) }
                        </ul>
                    ) : (
                        <NotContent />
                    )}
                </Container>
            </Layout>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    // console.log('context -->', context)
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_POSTS_REQUEST
    });
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });


    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});



export default IndexPage