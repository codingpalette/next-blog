import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { END } from 'redux-saga';
import axios from 'axios';
import useInput from "../hooks/useInput";

import styled from '@emotion/styled';
import Layout from '../components/Layout';
import PortfolioImageUpload from "../components/PortfolioImageUpload";
import {LOAD_MY_INFO_REQUEST} from "../reducers/user";
import wrapper from "../store/configureStore";


import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import useToggle from "../hooks/useToggle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
import {ADD_PORTFOLIO_REQUEST} from "../reducers/portfolio";



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
    padding: 1rem;
    box-sizing: border-box;
    & > div{
        padding: 1rem;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
    }
`;

const BtnBox = styled.div`
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    & button{
        margin: 0 0.5rem;
    }
`;


const portfolioWrite = () => {
    const { imagePaths } = useSelector((state) => state.portfolio);
    const dispatch = useDispatch();

    const [mode, setMode] = useState('create');
    const [title, onChangeTitle, setTitle] = useInput('');
    const [pageLink, onChangePageLink, setPageLink] = useInput('');

    const [snackBarOpen, snackBarOpenTrue, snackBarOpenFalse] = useToggle(false);
    const [snackBarText, onChangeSnackBarText, setSnackBarText] = useInput('');

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (title.trim() === '') {
            setSnackBarText('제목을 입력해주세요.');
            snackBarOpenTrue();
            return;
        }

        if (pageLink.trim() === '') {
            setSnackBarText('포트폴리오 링크를 입력해주세요.');
            snackBarOpenTrue();
            return;
        }

        if (imagePaths.length < 1) {
            setSnackBarText('이미지를 1장이상 등록해주세요.');
            snackBarOpenTrue();
            return;
        }

        const formData = new FormData();
        imagePaths.forEach((p) => {
            formData.append('image', p);
        });
        formData.append('title', title );
        formData.append('link', pageLink );
        dispatch({
            type: ADD_PORTFOLIO_REQUEST,
            data: formData
        });
    }, [title, pageLink, imagePaths]);

    return(
        <>
            <Layout>
                <ContentBox>
                    <Container>
                        <div>
                            <Typography variant="h5" component="h2" gutterBottom>
                                {mode === 'create' ? '포트폴리오 작성' : '포트폴리오 수정'}
                            </Typography>
                            <form onSubmit={onSubmit}>
                                <TextField
                                    margin="dense"
                                    id="title"
                                    label="title"
                                    type="text"
                                    fullWidth
                                    value={title}
                                    onChange={onChangeTitle}
                                />
                                <TextField
                                    margin="dense"
                                    id="page_link"
                                    label="링크"
                                    type="text"
                                    fullWidth
                                    value={pageLink}
                                    onChange={onChangePageLink}
                                />
                                <PortfolioImageUpload />

                                <BtnBox>
                                    <button type="submit">test</button>
                                    <Button variant="contained" color="secondary" disableElevation>
                                        <Link href='/'>
                                            <a>취소</a>
                                        </Link>
                                    </Button>
                                    {mode === 'create' ? (
                                        <Button variant="contained" color="primary" type="submit" disableElevation>
                                            작성
                                        </Button>
                                    ) : (
                                        <Button variant="contained" color="primary" type="submit" disableElevation>
                                            수정
                                        </Button>
                                    )}

                                </BtnBox>
                            </form>
                        </div>

                    </Container>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={snackBarOpen}
                        autoHideDuration={4000}
                        onClose={snackBarOpenFalse}
                        message={snackBarText}
                        action={
                            <>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={snackBarOpenFalse}>
                                    <CloseIcon fontSize="small"/>
                                </IconButton>
                            </>
                        }
                    />
                </ContentBox>
            </Layout>
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

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});


export default portfolioWrite;