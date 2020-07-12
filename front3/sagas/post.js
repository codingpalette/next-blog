import { all, fork, call, put, take, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import shortId from 'shortid';
import axios from 'axios';
import {
    generateDummyPost,
    ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS,
    REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS,
    LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
    LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE,
    MODIFY_POST_REQUEST, MODIFY_POST_SUCCESS, MODIFY_POST_FAILURE
} from "../reducers/post";

import {
    REMOVE_POST_OF_ME
} from "../reducers/user";



function loadPostsAPI(data) {
    return axios.get('/api/posts' , data)
}

function* loadPosts(action) {
    try {
        // const res = yield call(loadPostsAPI , action.data)
        yield put({
            type: LOAD_POSTS_SUCCESS,
            // data: generateDummyPost(10)
        });
    } catch (e) {
        console.log(e);
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: e.response.data
        })
    }
}




function addPostAPI(data) {
    return axios.post('/post' , data)
}

function* addPost(action) {
    try {
        const res = yield call(addPostAPI , action.data)
        console.log(action.data)
        return
        yield put({
            type: ADD_POST_SUCCESS,
            // data: res.data
            // data: action.data

        });
    } catch (e) {
        // console.log(e);
        yield put({
            type: ADD_POST_FAILURE,
            error: e.response.data
        })
    }
}




function removePostAPI(data) {
    return axios.post('/api/post' , data)
}

function* removePost(action) {
    try {
        // const res = yield call(addCommentAPI , action.data)
        yield  delay(1000)
        yield put({
            type: REMOVE_POST_SUCCESS,
            data:action.data

        });
        yield put({
            type : REMOVE_POST_OF_ME,
            data : action.data
        })
    } catch (e) {
        // console.log(e);
        yield put({
            type: REMOVE_POST_FAILURE,
            error: e.response.data
        })
    }
}




function addCommentAPI(data) {
    return axios.post('/api/post' , data)
}

function* addComment(action) {
    try {
        // const res = yield call(addCommentAPI , action.data)
        yield  delay(1000)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: {
                postId: action.data.postId,
                content: action.data.content
            },
            // data: res.data
        })
    } catch (e) {
        // console.log(e);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: e.response.data
        })
    }
}


function loadPostAPI(data) {
    return axios.get('/api/posts' , data)
}

function* loadPost(action) {
    try {
        // const res = yield call(loadPostAPI , action.data)
        // console.log(action)
        yield  delay(1000)
        yield put({
            type: LOAD_POST_SUCCESS,
            data: action.data
        });
    } catch (e) {
        console.log(e);
        yield put({
            type: LOAD_POST_FAILURE,
            error: e.response.data
        })
    }
}


function modifyPostAPI(data) {
    return axios.put('/api/post' , data)
}

function* modifyPost(action) {
    try {
        // const res = yield call(modifyPostAPI , action.data)
        // console.log(action)
        yield  delay(1000)
        yield put({
            type: MODIFY_POST_SUCCESS,
            data: action.data
        });
    } catch (e) {
        console.log(e);
        yield put({
            type: MODIFY_POST_FAILURE,
            error: e.response.data
        })
    }
}




function* watchLoadPosts() {
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts)
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost)
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

function* watchLoadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost)
}

function* watchModifyPost() {
    yield takeLatest(MODIFY_POST_REQUEST, modifyPost)
}


export default function* postSaga() {
    yield all([
        fork(watchLoadPosts),
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
        fork(watchLoadPost),
        fork(watchModifyPost),
    ])
}