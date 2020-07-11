import React, {useCallback, useEffect} from 'react';
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";
import {useDispatch, useSelector} from 'react-redux';
import {LOG_IN_REQUEST, SIGN_UP_REQUEST} from "../reducers/user";
import styled from '@emotion/styled';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const BtnBox = styled.div`
    padding: 16px 24px;
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

const LoginForm = ({modalOpen, closeEvent}) => {
    const dispatch = useDispatch();
    const {logInLoading, logInDone, logInError, signUpLoading, signUpDone, signUpError} = useSelector((state) => state.user);

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
        if (logInDone) {
            setLoginEmail('');
            setLoginPassword('');
            closeEvent();
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
    return (
        <>
            <div>
                <Dialog open={modalOpen} onClose={closeEvent} aria-labelledby="form-dialog-title">
                    {loginMode ? (
                        <form onSubmit={onLoginSubmit}>
                            <DialogTitle id="form-dialog-title">LOGIN</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    로그인에 필요한 이메일 주소와 비밀번호를 입력해주세요.
                                </DialogContentText>
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
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={closeEvent} color="secondary">
                                    닫기
                                </Button>
                                <Button color="primary" type="submit">
                                    {logInLoading ? <CircularProgress size={20}/> : '로그인'}
                                </Button>
                            </DialogActions>
                        </form>

                    ) : (
                        <form onSubmit={onSignUpSubmit}>
                            <DialogTitle id="form-dialog-title">SIGN UP</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    회원가입에 필요한 이메일 주소와 비밀번호를 입력해주세요.
                                </DialogContentText>
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
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={closeEvent} color="secondary">
                                    닫기
                                </Button>
                                <Button color="primary" type="submit">
                                    {signUpLoading ? <CircularProgress size={20}/> : '회원가입'}
                                </Button>
                            </DialogActions>
                        </form>
                    )}

                    <BtnBox>
                        {loginMode ? (
                            <>
                                <p><span>회원이 아니신가요?</span></p>
                                <Button variant="contained" color="primary" onClick={onClickLoginModeFalse}>회원가입하기</Button>
                            </>
                        ) : (
                            <>
                                <p><span>회원이신가요?</span></p>
                                <Button variant="contained" color="primary" onClick={onClickLoginModeTrue}>로그인하기</Button>
                            </>
                        )}
                    </BtnBox>

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
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </>
                        }
                    />
                </Dialog>
            </div>
        </>
    )
}

export default LoginForm;