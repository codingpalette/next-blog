import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import PostList from "../components/PostList";
import Grid from '@material-ui/core/Grid';


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

    return(
        <>
            <Layout>
                <Grid container spacing={3}>
                    { mainPosts.map((post) => <PostList key={post.id} post={post} />) }

                </Grid>
            </Layout>
        </>
    )
}

export default IndexPage