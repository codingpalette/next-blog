import React, { useEffect } from 'react';
import Link from "next/link";
import { withRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POST_REQUEST } from "../../reducers/post";
import Layout from '../../components/Layout';
import styled from '@emotion/styled';
import hljs from 'highlight.js';


import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from "@material-ui/core/Chip";

hljs.configure({
    languages: ['javascript', 'css', 'html', 'xml ', 'typescript'],
});

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

const PostContent = styled.div`
    display: block;
    margin: 1.5rem 0;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6{
        font-weight: bold;
    }
    h1 {
        font-size: 2rem;
    }
    h2 {
        font-size: 1.75rem;
    }
    h3 {
        font-size: 1.5rem;
    }
    h4 {
        font-size: 1.25rem;
    }
    blockquote{
        margin-top: 2rem;
        margin-bottom: 2rem;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        margin-left: 0px;
        margin-right: 0px;
        border-left: 4px solid #536DFE;
        background: rgb(248, 249, 250);
        padding: 1rem 1rem 1rem 2rem;
    }
    p {
        margin: 1.5em 0px;
        font-size: 0.9rem;
    }
    p a {
       
    }
    p a:hover {
        text-decoration: underline;
    }
    strong {
        
    }
    em {
       font-style: italic; 
    }
    img {
        display: block;
        max-width: 100%;
        margin: 0px auto 1.5em;
    }
    ol {
        list-style-type: decimal;
        list-style-position: inside;
        margin: 0px 0px 1.5em 2em;
    }
    ul {
        list-style-type: disc;
        list-style-position: inside;
        margin: 0px 0px 1.5em 2em;
    }
    ul li {
        font-size: 0.9rem;
    }
    pre {
        //font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
        //  'Courier New', monospace;
        font-size: 16px;
        line-height: 1.6;
        overflow-x: auto;
        white-space: pre;
        margin: 0px 0px 1.5rem;
        padding: 1.5rem;
        //background: rgb(1, 22, 39);
        border-radius: 4px;
    }
  
`;

const Post = ({ router }) => {
    const dispatch = useDispatch();
    const { loadPostLoading, loadPostDone, detailPost } = useSelector((state) => state.post);

    const updataPre = () => {
        document.querySelectorAll('pre').forEach(block => {
            hljs.highlightBlock(block);
        });
    };

    useEffect(() => {
        if (loadPostDone) {
            updataPre();
        }
        return () => {
            updataPre();
        };
    }, [loadPostDone]);

    useEffect(() => {
        dispatch({
            type: LOAD_POST_REQUEST,
            data: router.query.id
        })
    }, [])

    return(
        <>
            <Layout>
                <Grid container spacing={3}>
                    {loadPostDone && detailPost && (
                        <Grid item xs={12}>
                            <PaperBox elevation={0}>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {detailPost.title}
                                </Typography>
                                <TagBox>
                                    {detailPost.tags.map((v, i) => (
                                        <Link href="/" key={i}>
                                            <a>
                                                <Chip label={v} variant="outlined" />
                                            </a>
                                        </Link>
                                    ))}
                                </TagBox>
                                <PostContent>

                                        <div dangerouslySetInnerHTML={{ __html: detailPost.content }} />



                                </PostContent>
                            </PaperBox>
                        </Grid>
                    )}


                </Grid>
            </Layout>
        </>
    )
}


export default withRouter(Post);