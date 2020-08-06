import React, { useEffect, useRef } from 'react';
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




const IndexPage = () => {
    const dispatch = useDispatch();
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

    const scrollContainer = useRef(null);
    const scrollContainerUl = useRef(null);


    useEffect(() => {
        // dispatch({
        //     type: RESET_SUCCESS
        // })
    }, []);


    useEffect(() => {
        const target = scrollContainer.current;
        const targetUl = scrollContainerUl.current
        function onScroll() {
            // console.log(target.scrollTop , target.clientHeight, targetUl.offsetHeight)
            if (target.scrollTop + target.clientHeight >  targetUl.offsetHeight - 300 ) {
                if (hasMorePosts && !loadPostsLoading) {
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        lastId,
                    })
                }
            }
        }
        target.addEventListener('scroll', onScroll);
        return () => {
            target.removeEventListener('scroll', onScroll);
        }
    }, [hasMorePosts, loadPostsLoading, mainPosts])

    return(
        <>
            <Layout >
                <ContentBox ref={scrollContainer}>
                    <Container ref={scrollContainerUl}>
                        {mainPosts.length > 0 ? (
                            <ul>
                                { mainPosts.map((post) => <PostList key={post.id} post={post} />) }
                            </ul>
                        ) : (
                            <NotContent />
                        )}

                    </Container>
                {/*<Grid container spacing={3}>*/}
                {/*    { mainPosts.map((post) => <PostList key={post.id} post={post} />) }*/}

                {/*</Grid>*/}
                </ContentBox>
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