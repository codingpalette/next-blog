import { all, fork, call, put, take, takeEvery, takeLatest, delay, throttle } from 'redux-saga/effects';
import axios from 'axios';
import {
    ADD_PORTFOLIO_FAILURE, ADD_PORTFOLIO_REQUEST, ADD_PORTFOLIO_SUCCESS,
    PORTFOLIO_IMAGE_UPLOAD_REQUEST, PORTFOLIO_IMAGE_UPLOAD_SUCCESS, PORTFOLIO_IMAGE_UPLOAD_FAILURE,
    LOAD_PORTFOLIOS_REQUEST, LOAD_PORTFOLIOS_SUCCESS, LOAD_PORTFOLIOS_FAILURE,
    LOAD_PORTFOLIO_REQUEST, LOAD_PORTFOLIO_SUCCESS, LOAD_PORTFOLIO_FAILURE,
    MODIFY_PORTFOLIO_REQUEST, MODIFY_PORTFOLIO_SUCCESS, MODIFY_PORTFOLIO_FAILURE,
    REMOVE_PORTFOLIO_REQUEST, REMOVE_PORTFOLIO_SUCCESS, REMOVE_PORTFOLIO_FAILURE

} from "../reducers/portfolio";


function addPortfolioAPI(data) {
    return axios.post('/portfolio' , data)
}

function* addPortfolio(action) {
    try {
        const res = yield call(addPortfolioAPI , action.data);
        yield put({
            type: ADD_PORTFOLIO_SUCCESS,
            data: res.data
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: ADD_PORTFOLIO_FAILURE,
            error: e.response.data
        })
    }
}

function modifyPortfolioAPI(data) {
    return axios.patch('/portfolio' , data)
}

function* modifyPortfolio(action) {
    try {
        const res = yield call(modifyPortfolioAPI , action.data);
        yield put({
            type: MODIFY_PORTFOLIO_SUCCESS,
            data: res.data
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: MODIFY_PORTFOLIO_FAILURE,
            error: e.response.data
        })
    }
}


function loadPortfoliosAPI(lastId) {
    return axios.get(`/portfolios?lastId=${lastId || 0}`);
}

function* loadPortfolios(action) {
    try {
        const res = yield call(loadPortfoliosAPI , action.lastId);
        // console.log(res)
        yield put({
            type: LOAD_PORTFOLIOS_SUCCESS,
            data: res.data
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_PORTFOLIOS_FAILURE,
            error: e.response.data
        })
    }
}


function loadPortfolioAPI(data) {
    return axios.get(`/portfolio/${data}`);
}

function* loadPortfolio(action) {
    try {
        const res = yield call(loadPortfolioAPI , action.data);
        // console.log(res)
        yield put({
            type: LOAD_PORTFOLIO_SUCCESS,
            data: res.data
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_PORTFOLIO_FAILURE,
            error: e.response.data
        })
    }
}


function removePortfolioAPI(data) {
    return axios.delete(`/portfolio/${data}`);
}

function* removePortfolio(action) {
    try {
        const res = yield call(removePortfolioAPI , action.data);
        // console.log(res)
        yield put({
            type: REMOVE_PORTFOLIO_SUCCESS,
            data: res.data
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: REMOVE_PORTFOLIO_FAILURE,
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
        console.error(e);
        yield put({
            type: PORTFOLIO_IMAGE_UPLOAD_FAILURE,
            error: e.response.data
        })
    }
}

function* watchAddPortfolio() {
    yield takeLatest(ADD_PORTFOLIO_REQUEST, addPortfolio)
}

function* watchLoadPortfolios() {
    yield takeLatest(LOAD_PORTFOLIOS_REQUEST, loadPortfolios)
}

function* watchLoadPortfolio() {
    yield takeLatest(LOAD_PORTFOLIO_REQUEST, loadPortfolio)
}

function* watchModifyPortfolio() {
    yield takeLatest(MODIFY_PORTFOLIO_REQUEST, modifyPortfolio)
}

function* watchRemovePortfolio() {
    yield takeLatest(REMOVE_PORTFOLIO_REQUEST, removePortfolio)
}


function* watchAddImage() {
    yield takeLatest(PORTFOLIO_IMAGE_UPLOAD_REQUEST, uploadImages)
}


export default function* portfolioSaga() {
    yield all([
        fork(watchAddPortfolio),
        fork(watchLoadPortfolios),
        fork(watchLoadPortfolio),
        fork(watchModifyPortfolio),
        fork(watchRemovePortfolio),
        fork(watchAddImage),
    ])
}
