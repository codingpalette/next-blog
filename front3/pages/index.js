import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
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
    return(
        <>
            <Layout>
                <ContainerBox maxWidth="md">
                    <Grid container spacing={3}>
                        <PostList />
                    </Grid>
                </ContainerBox>
            </Layout>
        </>
    )
}

export default IndexPage