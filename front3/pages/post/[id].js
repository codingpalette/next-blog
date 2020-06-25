import React from 'react';
import Link from "next/link";
import Layout from '../../components/Layout';
import styled from '@emotion/styled';


import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from "@material-ui/core/Chip";

const PaperBox = styled(Paper)`
    padding: 1rem;
    box-sizing: border-box;
`;

const TagBox = styled.div`
    margin-bottom: 1rem;
    display: flex;
    flex-wrap: wrap;
    & a {
        display: inline-block;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
    }
    & a div{
        cursor: pointer;
    }

`;

const Post = () => {
    return(
        <>
            <Layout>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <PaperBox>
                            <Typography variant="h5" component="h2" gutterBottom>
                                타이틀
                            </Typography>
                            <TagBox>
                                <Link href="/" >
                                    <a>
                                        <Chip label='aaa' variant="outlined" />
                                    </a>
                                </Link>
                            </TagBox>
                            <div>
                                <div dangerouslySetInnerHTML={{ __html: <p>asdasd</p> }} />
                            </div>
                        </PaperBox>
                    </Grid>

                </Grid>
            </Layout>
        </>
    )
}


export default Post;