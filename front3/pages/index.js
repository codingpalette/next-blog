import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import styled from '@emotion/styled';
import PostList from "../components/PostList";


import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';



const ContainerBox = styled(Container)`
    padding-top: 16px;
    padding-bottom: 16px;
    box-sizing: border-box;
`;



const IndexPage = () => {
    const dispatch = useDispatch();
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch({
            type: LOAD_POSTS_REQUEST
        })
    }, [])

    return(
        <>
            <Layout>
                <ContainerBox maxWidth="md">
                    <Grid container spacing={3}>
                        { mainPosts.map((post) => <PostList key={post.id} post={post} />) }

                    </Grid>
                </ContainerBox>
            </Layout>
        </>
    )
}

export default IndexPage