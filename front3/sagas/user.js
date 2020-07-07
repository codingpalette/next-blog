import { all, fork, call, put, take, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_FAILURE,
    SIGN_UP_SUCCESS, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE
} from '../reducers/user'



function loadMyInfoAPI() {
    return axios.get('/user' )
}

function* loadMyInfo(action) {
    try {
        const res = yield call(loadMyInfoAPI )
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: res.data
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: e.response.data
        })
    }

}



function logInAPI(data) {
    return axios.post('/user/login' , data)
}

function* logIn(action) {
    try {

        const res = yield call(logInAPI , action.data)
        // yield  delay(1000)
        yield put({
            type: LOG_IN_SUCCESS,
            data: res.data
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: LOG_IN_FAILURE,
            error: e.response.data
        })
    }

}



function logOutAPI() {
    return axios.post('/user/logout')
}

function* logOut() {
    try {
        yield call(logOutAPI)
        // yield  delay(1000)
        yield put({
            type: LOG_OUT_SUCCESS,
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: LOG_OUT_FAILURE,
            error: e.response.data
        })
    }

}





function signUpAPI(data) {
    // 서버에 요청을 보내는 부분
    return axios.post('/user', data);
}

function* signUp(action) {
    try {
        yield call(signUpAPI, action.data);
        // yield delay(1000);
        // throw new Error('') // 에러발생
        yield put({ // put은 dispatch 동일
            type: SIGN_UP_SUCCESS,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
            error: e,
        });
    }
}



function* watchLoadMyInfo() {
    yield takeEvery(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn)

}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST , logOut)
}


export default function* userSaga() {
    yield all([
        fork(watchLoadMyInfo),
        fork(watchSignUp),
        fork(watchLogIn),
        fork(watchLogOut),
    ])
}