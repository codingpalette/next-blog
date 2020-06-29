import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from "react-redux";
import {LOAD_POSTS_REQUEST, RESET_SUCCESS } from "../reducers/post";
import styled from '@emotion/styled'
import PostList from "../components/PostList";

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

export default IndexPage