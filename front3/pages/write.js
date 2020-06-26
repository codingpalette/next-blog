import React, {useState, useCallback, useRef, useEffect} from 'react';
import Link from 'next/link';
import Router, { withRouter } from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {ADD_POST_REQUEST, LOAD_POST_REQUEST, MODIFY_POST_REQUEST} from "../reducers/post";
import Layout from '../components/Layout';
import useInput from "../hooks/useInput";
import styled from '@emotion/styled';
import Editor from '../components/Editor';


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress";



const PaperBox = styled(Paper)`
    padding: 1rem;
    box-sizing: border-box;
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
            <TagItem key={tag} tag={tag} onRemove={onRemove}/>
        ))}
    </TagListBlock>
));


const Write = ({ router }) => {
    const dispatch = useDispatch()
    const { addPostLoading, addPostDone, detailPost } = useSelector((state) => state.post)
    const [mode, setMode] = useState('create')
    const [title, onChangeTitle, setTitle] = useInput('');
    const [description, onChangeDescription, setDescription] = useInput('');
    const [tag, onChangeTag, setTag] = useInput('');
    const [localTags, setLocalTags] = useState([]);
    const [content, onChangeContent, setContent] = useInput('');

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
            setLocalTags(detailPost.tags)
            setContent(detailPost.content)
        }
    }, [detailPost])



    useEffect(() => {
        if (addPostDone) {
            Router.push('/')
        }
    }, [addPostDone])

    const insertTag = useCallback((tag) => {
        if (!tag) return; // 공백이라면 추가하지 않음
        if (localTags.includes(tag)) return; // 이미 존재한다면 추가하지 않음
        const nextTags = [...localTags, tag];
        setLocalTags(nextTags);
    }, [localTags])

    const onRemove = useCallback((tag) => {
            const nextTags = localTags.filter(t => t !== tag);
            setLocalTags(nextTags);
        }, [localTags]
    );

    const onClickTagAdd = useCallback(() => {
        insertTag(tag.trim()); // 앞뒤 공백 없앤 후 등록
        setTag('');
    }, [tag, insertTag])


    const onSubmit = useCallback((e) => {
        e.preventDefault()
        if (mode === 'create') {
            dispatch({
                type: ADD_POST_REQUEST,
                data: {title, description, tags:localTags, content}
            })
        } else {
            dispatch({
                type: MODIFY_POST_REQUEST,
                data: {id: detailPost.id, title, description, tags:localTags, content}
            })
        }

    }, [detailPost, title, description, localTags, content])



    return (
        <>
            <Layout>
                <Grid container>
                    <Grid item xs={12}>
                        <PaperBox elevation={0}>
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
                                <Editor content={content} setContent={setContent} />

                                <BtnBox>
                                    <Button variant="contained" color="secondary" disableElevation>
                                        <Link href='/'>
                                            <a>취소</a>
                                        </Link>
                                    </Button>
                                    {mode === 'create' ? (
                                        <Button variant="contained" color="primary" type="submit" disableElevation>
                                            {addPostLoading ? <CircularProgressTag  size={20} /> : '작성'}
                                        </Button>
                                    ) : (
                                        <Button variant="contained" color="primary" type="submit" disableElevation>
                                            {addPostLoading ? <CircularProgressTag  size={20} /> : '수정'}
                                        </Button>
                                    )}

                                </BtnBox>

                            </form>
                        </PaperBox>
                    </Grid>
                </Grid>
            </Layout>
        </>
    )
}

export default withRouter(Write)