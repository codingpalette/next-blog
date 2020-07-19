import React, {useState, useCallback, useEffect, useContext} from 'react';
import wrapper from "../store/configureStore";
import axios from "axios";
import {LOAD_MY_INFO_REQUEST} from "../reducers/user";
import {END} from "redux-saga";
import { SocketContext } from '../socket-context';

import styled from '@emotion/styled'
import Layout from '../components/Layout';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import useToggle from "../hooks/useToggle";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import useInput from "../hooks/useInput";
import DialogContentText from "@material-ui/core/DialogContentText";

const ContentBox = styled.div`
    width: 100%;
    height: calc(100% - 100px);
    flex: 1;
    overflow-y: auto;
    @media (min-width: 1024px) {
       height: calc(100% - 50px);
    }
`;


const ContentHeader = styled.div`
    background-color: #fff;
    padding: 2rem 1rem;
    box-sizing: border-box;
    & h2{
       font-size: 2.5rem;
       font-weight: bold;
    }
    & .room_create_btn_box{
        text-align: right;
    }
`;

const Container = styled.div`
    display: block;
    width: 100%;
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

const Chat = () => {
    const socket = useContext(SocketContext);
    useEffect(() => {
        return () => {
            socket.off('receive data');
        }
    }, []);
    const [roomTitle, onChangeRoomTitle] = useInput('')
    const [modalOpen, onClickModalOpen, modalClose] = useToggle(false);

    const onClickCreateRoom = useCallback(() => {
        console.log(roomTitle)
        socket.emit('join', roomTitle);

    }, [roomTitle])


    return (
        <>
            <Layout>
                <ContentBox>
                    <ContentHeader>
                        <h2>채팅</h2>
                        <div className="room_create_btn_box">
                            <Button color="primary" onClick={onClickModalOpen}>채팅방 만들기</Button>
                        </div>
                        <Dialog open={modalOpen} onClose={modalClose}>
                            <DialogTitle id="form-dialog-title">채팅방 만들기</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    채팅방 이름을 입력해주세요.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="room_title"
                                    label="방 이름을 입력하세요."
                                    type="email"
                                    fullWidth
                                    value={roomTitle}
                                    onChange={onChangeRoomTitle}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={modalClose} color="secondary">
                                    닫기
                                </Button>
                                <Button color="primary" onClick={onClickCreateRoom}>
                                    만들기
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </ContentHeader>
                    <Container>
                        <div className="content">
                            sdfdff
                        </div>
                    </Container>
                </ContentBox>
            </Layout>
        </>
    )
};


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

export default Chat;