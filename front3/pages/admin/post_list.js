import React, {useCallback, useEffect, useState} from 'react';
import Link from 'next/link';
import Router from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {LOAD_POSTS_REQUEST, RESET_SUCCESS} from "../../reducers/post";
import Layout from "../../components/Layout";
import styled from '@emotion/styled';
import PostTrList from "../../components/PostTrList";

import Button from '@material-ui/core/Button';


const ContentHeader = styled.div`
    background-color: #fff;
    padding: 2rem 1rem;
    box-sizing: border-box;
    & h2{
       font-size: 2.5rem;
       font-weight: bold;
    }
    & .link_box{
        text-align: right;
    }
`;


const Container = styled.div`
    padding: 1rem;
    box-sizing: border-box;
    & .table_content{
        width: 100%;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
    }
    & .table_content table{
        width: 100%;
    }
    & .table_content thead th{
        padding: 1rem;
        font-size: 12px;
        text-align: left;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
    & .table_content tbody tr{
        position: relative;
    }
    & .table_content tbody tr:hover {
        background: #f5f5f5;
    }
    & .table_content tbody td {
        color: rgba(0, 0, 0, 0.54);
        font-size: 13px;
        padding: 0.5rem 1rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        white-space: nowrap;
    }
    & .table_content tbody td .btn_box{
        text-align: right;
        position: relative;
    }
`;


const postList = () => {
    const dispatch = useDispatch();
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

    useEffect(() => {
        if (mainPosts.length === 0) {
            dispatch({
                type: LOAD_POSTS_REQUEST
            })
        }
    }, []);

    useEffect(() => {
        dispatch({
            type: RESET_SUCCESS
        })
    });

    return(
        <>
            <Layout>
                <ContentHeader>
                    <h2>포스트 리스트</h2>
                    <div className="link_box">
                        <Link href="/write" >
                            <a>
                                <Button color="primary">포스트 작성</Button>
                            </a>
                        </Link>
                    </div>
                </ContentHeader>
                <Container>
                    <div className="table_content">
                        <table>
                            <thead>
                                <tr>
                                    <th>제목</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {mainPosts.length > 0 && mainPosts.map(post => (
                                    <PostTrList key={post.id} post={post} />
                                ))}


                            </tbody>
                        </table>
                    </div>
                </Container>
            </Layout>
        </>
    )
}

export default postList;