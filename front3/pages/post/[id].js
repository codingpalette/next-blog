import React, {useEffect} from 'react';
import Link from "next/link";
import {withRouter} from 'next/router';
import Head from 'next/head';
import {useDispatch, useSelector} from "react-redux";
import {END} from "redux-saga";
import axios from "axios";

import styled from '@emotion/styled';
import Layout from '../../components/Layout';
import ContentHeader from "../../components/ContentHeader";
import {LOAD_POST_REQUEST, LOAD_POSTS_REQUEST} from "../../reducers/post";
import {LOAD_MY_INFO_REQUEST} from "../../reducers/user";
import wrapper from "../../store/configureStore";
import hljs from 'highlight.js';

import Chip from "@material-ui/core/Chip";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

hljs.configure({
    languages: ['javascript', 'css', 'html', 'xml ', 'typescript'],
});



const TagBox = styled.div`
    margin-top: 1rem;
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

const PostBody = styled.div`
    padding: 1rem;
    box-sizing: border-box;
    & .content {
        width: 100%;
        max-width: 1100px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        padding: 1rem;
        box-sizing: border-box;
    }

`;

const PostContent = styled.div`
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
        margin: 2rem 0;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-left: 4px solid #536DFE;
        background: rgb(248, 249, 250);
        padding: 1rem 1rem 1rem 2rem;
    }
    p {
        margin: 1em 0px;
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
        font-size: 0.9rem;
        line-height: 1.6;
        overflow-x: auto;
        white-space: pre;
        margin: 0 0 1.5rem;
        padding: 1.5rem;
        //background: rgb(1, 22, 39);
        border-radius: 4px;
    }
  
`;

const Pagination = styled.div`
    padding: 1rem;
    box-sizing: border-box;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & .btn_box{
        
    }
    & .btn_box a{
        display: flex;
        align-items: center;
        border-radius: 0.25rem;
        box-sizing: border-box;
    }
    & .btn_box a:hover{
        color: #536DFE;
    }
    & .btn_box a span{
        margin: 0 0.5rem;
    }
`;

const Post = ({router}) => {
    const dispatch = useDispatch();
    const {loadPostLoading, loadPostDone, detailPost, prevPost, nextPost} = useSelector((state) => state.post);

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

    // useEffect(() => {
    //     dispatch({
    //         type: LOAD_POST_REQUEST,
    //         data: router.query.id
    //     })
    // }, [])

    return (
        <>
            {loadPostDone && detailPost && (
                <>
                    <Head>
                        <title>{detailPost.title}</title>
                        <meta name="description" content={detailPost.description}/>
                        <meta property="og:title" content={`${detailPost.title}`}/>
                        <meta property="og:description" content={detailPost.description}/>
                        <meta property="og:url" content={`https://codingpalette.com/post/${detailPost.id}`}/>
                    </Head>
                    <Layout>
                        <ContentHeader title={detailPost.title}>
                            <TagBox>
                                {detailPost.Tags.map((v) => (
                                    <Link href={`/tag/${v.name}`} key={v.name} prefetch={false}>
                                        <a>
                                            <Chip label={v.name} variant="outlined"/>
                                        </a>
                                    </Link>
                                ))}
                            </TagBox>
                        </ContentHeader>
                        <PostBody>
                            <div className='content'>
                                <PostContent>
                                    <div dangerouslySetInnerHTML={{__html: detailPost.content}}/>
                                </PostContent>
                            </div>
                        </PostBody>
                        <Pagination>
                            <div className="btn_box">
                                {nextPost && (
                                    <Link href="/post/[id]" as={`/post/${nextPost.id}`}>
                                        <a>
                                            <ArrowBackIcon/>
                                            <span>{nextPost.title}</span>
                                        </a>
                                    </Link>
                                )}

                            </div>
                            <div className="btn_box">
                                {prevPost && (
                                    <Link href="/post/[id]" as={`/post/${prevPost.id}`}>
                                        <a>
                                            <span>{prevPost.title}</span>
                                            <ArrowForwardIcon/>
                                        </a>
                                    </Link>
                                )}
                            </div>
                        </Pagination>
                    </Layout>
                </>
            )}
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
    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.params.id
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});


export default withRouter(Post);
