import React, {useState, useCallback, useRef, useEffect} from 'react';
import Link from 'next/link';
import Router, {withRouter} from "next/router";
import useToggle from "../hooks/useToggle";
import {END} from "redux-saga";
import axios from "axios";

import styled from '@emotion/styled';
import Layout from '../components/Layout';
import Editor from '../components/Editor';
import useInput from "../hooks/useInput";
import {useDispatch, useSelector} from "react-redux";
import {ADD_POST_REQUEST, LOAD_POST_REQUEST, MODIFY_POST_REQUEST} from "../reducers/post";
import {LOAD_MY_INFO_REQUEST} from "../reducers/user";
import wrapper from "../store/configureStore";


import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";


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


const TagFormBox = styled.div`
    display: flex;
    align-items: flex-end;
    width: 100%;
`;

const TagBtn = styled(Button)`
    height: 35px;
    margin-left: 1rem !important;
`;

const TagListBlock = styled.div`
    display: flex;
    margin-top: 0.5rem;
    & >div{
        margin-right: 0.5rem;
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

const CircularProgressTag = styled(CircularProgress)`
    color: #fff;
`

// React.memo를 사용하여 tag 값이 바뀔 때만 리렌더링되도록 처리
const TagItem = React.memo(({tag, onRemove}) => (
    <Chip label={tag} variant="outlined" onClick={() => onRemove(tag)}/>
));

// React.memo를 사용하여 tags 값이 바뀔 때만 리렌더링되도록 처리
const TagList = React.memo(({tags, onRemove}) => (
    <TagListBlock>
        {tags.map(tag => (
            <TagItem key={tag.name} tag={tag.name} onRemove={onRemove}/>
        ))}
    </TagListBlock>
));


const Write = ({router}) => {
    const dispatch = useDispatch()
    const {addPostLoading, addPostDone, detailPost, modifyPostLoading, modifyPostDone} = useSelector((state) => state.post)
    const [mode, setMode] = useState('create')
    const [title, onChangeTitle, setTitle] = useInput('');
    const [tag, onChangeTag, setTag] = useInput('');
    const [localTags, setLocalTags] = useState([]);
    const [content, onChangeContent, setContent] = useInput('');

    const [description, setDescription] = useState('');
    const onChangeDescription = useCallback((e) => {
        if (e.target.value.length > 200) {
            return
        }
        setDescription(e.target.value)
    }, []);

    const [snackBarOpen, snackBarOpenTrue, snackBarOpenFalse] = useToggle(false);
    const [snackBarText, onChangeSnackBarText, setSnackBarText] = useInput('');

    useEffect(() => {
        if (router.query.id) {
            setMode('modify')
            dispatch({
                type: LOAD_POST_REQUEST,
                data: router.query.id
            })
        } else {
            setMode('create')
        }
    }, [])

    useEffect(() => {
        if (detailPost) {
            setTitle(detailPost.title)
            setDescription(detailPost.description)
            setLocalTags(detailPost.Tags)
            setContent(detailPost.content)
        }
    }, [detailPost])


    useEffect(() => {
        if (addPostDone) {
            Router.push('/')
        }
    }, [addPostDone])

    useEffect(() => {
        if (modifyPostDone) {
            Router.push('/')
        }
    }, [modifyPostDone])

    const insertTag = useCallback((tag) => {
        if (!tag) return; // 공백이라면 추가하지 않음
        if (localTags.includes(tag)) return; // 이미 존재한다면 추가하지 않음
        const nextTags = [...localTags, {name: tag}];
        setLocalTags(nextTags);
    }, [localTags])

    const onRemove = useCallback((tag) => {
            const nextTags = localTags.filter(t => t.name !== tag);
            setLocalTags(nextTags);
        }, [localTags]
    );

    const onClickTagAdd = useCallback(() => {
        insertTag(tag.trim()); // 앞뒤 공백 없앤 후 등록
        setTag('');
    }, [tag, insertTag])


    const onSubmit = useCallback((e) => {
        e.preventDefault();
        // console.log(localTags)
        if (title === '') {
            setSnackBarText('제목을 입력해주세요.');
            snackBarOpenTrue();
            return
        }
        if (description === '') {
            setSnackBarText('설명을 입력해주세요.');
            snackBarOpenTrue();
            return
        }
        if (content === '') {
            setSnackBarText('내용을 입력해주세요.');
            snackBarOpenTrue();
            return
        }
        if (mode === 'create') {
            dispatch({
                type: ADD_POST_REQUEST,
                data: {title, description, tags: localTags, content}
            })
        } else {
            dispatch({
                type: MODIFY_POST_REQUEST,
                data: {id: detailPost.id, title, description, tags: localTags, content}
            })
        }

    }, [detailPost, title, description, localTags, content])

    return (
        <>
            <Layout>
                <Container>
                    <div>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {mode === 'create' ? '포스트 작성' : '포스트 수정'}
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
                                id="description"
                                label="description"
                                type="text"
                                fullWidth
                                multiline
                                rowsMax={4}
                                value={description}
                                onChange={onChangeDescription}
                            />
                            <TagFormBox>
                                <TextField
                                    margin="dense"
                                    id="tag"
                                    label="tag"
                                    type="text"
                                    fullWidth
                                    value={tag}
                                    onChange={onChangeTag}
                                />
                                <TagBtn
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                    onClick={onClickTagAdd}
                                >
                                    추가
                                </TagBtn>
                            </TagFormBox>
                            <TagList tags={localTags} onRemove={onRemove}/>
                            <Editor content={content} setContent={setContent}/>

                            <BtnBox>
                                <Button variant="contained" color="secondary" disableElevation>
                                    <Link href='/'>
                                        <a>취소</a>
                                    </Link>
                                </Button>
                                {mode === 'create' ? (
                                    <Button variant="contained" color="primary" type="submit" disableElevation>
                                        {addPostLoading ? <CircularProgressTag size={20}/> : '작성'}
                                    </Button>
                                ) : (
                                    <Button variant="contained" color="primary" type="submit" disableElevation>
                                        {modifyPostLoading ? <CircularProgressTag size={20}/> : '수정'}
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

export default withRouter(Write)