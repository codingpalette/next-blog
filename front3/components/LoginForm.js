import React, { useCallback, useEffect } from 'react';
import useInput from "../hooks/useInput";
import { useDispatch, useSelector  } from 'react-redux';
import { LOG_IN_REQUEST } from "../reducers/user";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoginForm = ({ modalOpen, closeEvent }) => {
    const dispatch = useDispatch();
    const { logInLoading, logInDone } = useSelector((state) => state.user);

    const [email, onChangeEmail, setEmail] = useInput('' )
    const [password, onChangePassword, setPassword] = useInput('')

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type : LOG_IN_REQUEST,
            data : {email, password}
        })
    }, [email, password])

    useEffect(() => {
        if (logInDone) {
            setEmail('')
            setPassword('')
            closeEvent()
        }
    }, [logInDone])
    return(
        <>
            <div >
                <Dialog open={modalOpen} onClose={closeEvent} aria-labelledby="form-dialog-title">
                    <form onSubmit={onSubmit}>
                        <DialogTitle id="form-dialog-title">LOGIN</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                로그인에 필요한 이메일 주소와 비밀번호를 입력해주세요.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={onChangeEmail}
                            />
                            <TextField
                                margin="dense"
                                id="paddword"
                                label="Password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={onChangePassword}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeEvent} color="primary">
                                닫기
                            </Button>
                            <Button color="primary" type="submit">
                                {logInLoading ? <CircularProgress size={20} /> : '로그인'}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        </>
    )
}

export default LoginForm;