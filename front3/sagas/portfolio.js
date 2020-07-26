import { all, fork, call, put, take, takeEvery, takeLatest, delay, throttle } from 'redux-saga/effects';
import axios from 'axios';
import {
    ADD_PORTFOLIO_FAILURE, ADD_PORTFOLIO_REQUEST, ADD_PORTFOLIO_SUCCESS,
    PORTFOLIO_IMAGE_UPLOAD_REQUEST, PORTFOLIO_IMAGE_UPLOAD_SUCCESS, PORTFOLIO_IMAGE_UPLOAD_FAILURE

} from "../reducers/portfolio";


function addPortfolioAPI(data) {
    return axios.post('/post' , data)
}

function* addPortfolio(action) {
    try {
        return
        const res = yield call(addPortfolioAPI , action.data);
        yield put({
            type: ADD_PORTFOLIO_SUCCESS,
            data: res.data
        });
    } catch (e) {
        console.log(e);
        yield put({
            type: ADD_PORTFOLIO_FAILURE,
            error: e.response.data
        })
    }
}

function uploadImagesAPI(data) {
    return axios.post(`/portfolio/images` , data)
}

function* uploadImages(action) {
    try {
        const res = yield call(uploadImagesAPI, action.data)
        yield put({
            type: PORTFOLIO_IMAGE_UPLOAD_SUCCESS,
            data: res.data
        });
    } catch (e) {
        console.log(e);
        yield put({
            type: PORTFOLIO_IMAGE_UPLOAD_FAILURE,
            error: e.response.data
        })
    }
}

function* watchAddPortfolio() {
    yield takeLatest(ADD_PORTFOLIO_REQUEST, addPortfolio)
}

function* watchAddImage() {
    yield takeLatest(PORTFOLIO_IMAGE_UPLOAD_REQUEST, uploadImages)
}


export default function* postSaga() {
    yield all([
        fork(watchAddPortfolio),
        fork(watchAddImage),
    ])
}