import React, { useCallback, useEffect } from 'react';
import { withRouter } from 'next/router';
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";
import {useDispatch, useSelector} from "react-redux";
import {END} from 'redux-saga';
import axios from 'axios';

import styled from '@emotion/styled';
import {LOAD_MY_INFO_REQUEST, LOG_IN_REQUEST, SIGN_UP_REQUEST} from "../reducers/user";
import wrapper from '../store/configureStore';
import Layout from "../components/Layout";


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';



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
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
`;

const FormBox = styled.div`
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
    padding: 1rem;
    box-sizing: border-box;
    & .header{
        font-size: 1.5rem;
        text-align: center;
        font-weight: bold;
    }
    & .header span{
        font-size: 0.75rem;
        color: rgba(0,0,0,0.5);
    }
    
    & .body{
        padding: 1rem 1.25rem;
        box-sizing: border-box;
    }
    
    & .footer{
        text-align: center;
        color: #fff;
    }

`;


const BtnBox = styled.div`
    padding: 1rem 1.25rem;
    box-sizing: border-box;
    text-align: center;
    & p{
        color: rgba(0,0,0,0.5);
        position: relative;
    }
    & p span{
        position: relative;
        z-index: 10;
        background-color: #fff;
        display: inline-block;
        padding: 0 10px;
    }
    & p:before{
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 50%;
        height: 1px;
        background-color: rgba(0,0,0,0.5);
    }
    & p:after{
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        width: 50%;
        height: 1px;
        background-color: rgba(0,0,0,0.5);
    }
    & button{
        margin-top: 1rem;
    }
`;


const Login = ({ router }) => {
    const dispatch = useDispatch();
    const {me, logInLoading, logInDone, logInError, signUpLoading, signUpDone, signUpError} = useSelector((state) => state.user);

    const [loginMode, onClickLoginModeTrue, onClickLoginModeFalse] = useToggle(true);
    const [loginEmail, onChangeLoginEmail, setLoginEmail] = useInput('');
    const [loginPassword, onChangeLoginPassword, setLoginPassword] = useInput('');

    const [signEmail, onChangeSignEmail, setSignEmail] = useInput('');
    const [signNickname, onChangeNickname, setSignNickname] = useInput('');
    const [signPassword, onChangeSignPassword, setSignPassword] = useInput('');
    const [signPassword2, onChangeSignPassword2, setSignPassword2] = useInput('');

    const [snackBarOpen, snackBarOpenTrue, snackBarOpenFalse] = useToggle(false);
    const [snackBarText, onChangeSnackBarText, setSnackBarText] = useInput('');

    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const onLoginSubmit = useCallback((e) => {
        e.preventDefault();
        if (loginEmail.match(regExp) === null) {
            setSnackBarText('올바른 이메일을 입력해주세요');
            snackBarOpenTrue();
            return
        }
        if (loginPassword.length === 0) {
            setSnackBarText('비밀번호를 입력해주세요');
            snackBarOpenTrue();
            return
        }
        dispatch({
            type: LOG_IN_REQUEST,
            data: {email: loginEmail, password: loginPassword}
        })
    }, [loginEmail, loginPassword, snackBarText, snackBarOpenTrue]);

    const onSignUpSubmit = useCallback((e) => {
        e.preventDefault();
        return false;
        if (signEmail.match(regExp) === null) {
            setSnackBarText('올바른 이메일을 입력해주세요');
            snackBarOpenTrue();
            return
        }
        if (signNickname.trim().length === 0) {
            setSnackBarText('닉네임을 입력해주세요');
            snackBarOpenTrue();
            return
        }
        if (signPassword.length < 4) {
            setSnackBarText('비밀번호 4자리 이상 입력해주세요');
            snackBarOpenTrue();
            return
        }
        if (signPassword !== signPassword2) {
            setSnackBarText('비밀번호가 일치하지 않습니다.');
            snackBarOpenTrue();
            return
        }

        dispatch({
            type: SIGN_UP_REQUEST,
            data: {email: signEmail, nickname: signNickname, password: signPassword}
        })
    }, [signEmail, signNickname, signPassword, signPassword2, snackBarText, snackBarOpenTrue])

    useEffect(() => {
        if ((me && me.id)) {
            router.push('/')
        }
    }, [me && me.id]);

    useEffect(() => {
        if (logInDone) {
            setLoginEmail('');
            setLoginPassword('');
        }
    }, [logInDone]);



    useEffect(() => {
        if (logInError) {
            setSnackBarText(`${logInError}`);
            snackBarOpenTrue();
        }
    }, [logInError])

    useEffect(() => {
        if (signUpDone) {
            setSnackBarText('회원가입이 완료되었습니다.');
            snackBarOpenTrue();
            setSignEmail('');
            setSignNickname('');
            setSignPassword('');
            setSignPassword2('');
            onClickLoginModeTrue();
        }
    }, [signUpDone]);

    useEffect(() => {
        if (signUpError) {
            setSnackBarText('회원가입에 실패했습니다.');
            snackBarOpenTrue();
        }
    }, [signUpError])

    if (me) {
        return null;
    }

    return (
        <>
            <Layout>
                <ContentBox>
                    <Container>
                        <FormBox>
                            {loginMode ? (
                                <form onSubmit={onLoginSubmit}>
                                    <div className="header">
                                        <h2>LOGIN</h2>
                                        <span>로그인에 필요한 이메일 주소와 비밀번호를 입력해주세요.</span>
                                    </div>
                                    <div className="body">
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="login_email"
                                            label="이메일"
                                            type="email"
                                            fullWidth
                                            value={loginEmail}
                                            onChange={onChangeLoginEmail}
                                        />
                                        <TextField
                                            margin="dense"
                                            id="login_password"
                                            label="비밀번호"
                                            type="password"
                                            fullWidth
                                            value={loginPassword}
                                            onChange={onChangeLoginPassword}
                                        />
                                    </div>

                                    <div className="footer">
                                        <Button variant="contained" color="primary" type="submit">
                                            {logInLoading ? <CircularProgress size={20} color="inherit" /> : '로그인'}
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <form onSubmit={onSignUpSubmit} >
                                    <div className="header">
                                        <h2>SIGN UP</h2>
                                        <span>회원가입에 필요한 이메일 주소와 비밀번호를 입력해주세요.</span>
                                    </div>
                                    <div className="body">
                                        <TextField
                                            margin="dense"
                                            id="sign_email"
                                            label="이메일"
                                            type="email"
                                            fullWidth
                                            value={signEmail}
                                            onChange={onChangeSignEmail}
                                        />
                                        <TextField
                                            margin="dense"
                                            id="nickname"
                                            label="닉네임"
                                            type="nickname"
                                            fullWidth
                                            value={signNickname}
                                            onChange={onChangeNickname}
                                        />
                                        <TextField
                                            margin="dense"
                                            id="sign_password"
                                            label="비밀번호"
                                            type="password"
                                            fullWidth
                                            value={signPassword}
                                            onChange={onChangeSignPassword}
                                        />
                                        <TextField
                                            margin="dense"
                                            id="sign_password2"
                                            label="비밀번호 확인"
                                            type="password"
                                            fullWidth
                                            value={signPassword2}
                                            onChange={onChangeSignPassword2}
                                        />
                                    </div>
                                    <div className="footer">
                                        <Button variant="contained" color="primary" type="submit">
                                            {signUpLoading ? <CircularProgress size={20} color="inherit" /> : '회원가입'}
                                        </Button>
                                    </div>
                                </form>
                            )}
                            <BtnBox>
                                {loginMode ? (
                                    <>
                                        {/*<p><span>회원이 아니신가요?</span></p>*/}
                                        {/*<Button variant="contained" color="primary" onClick={onClickLoginModeFalse}>회원가입하기</Button>*/}
                                    </>
                                ) : (
                                    <>
                                        {/*<p><span>회원이신가요?</span></p>*/}
                                        {/*<Button variant="contained" color="primary" onClick={onClickLoginModeTrue}>로그인하기</Button>*/}
                                    </>
                                )}
                            </BtnBox>
                        </FormBox>


                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={snackBarOpen}
                            autoHideDuration={6000}
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
                    </Container>
                </ContentBox>
            </Layout>
        </>
    )
};


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    // console.log('context -->', context)
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


export default withRouter(Login);