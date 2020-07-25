import { all, fork, call, put, take, takeEvery, takeLatest, delay, throttle } from 'redux-saga/effects';
import axios from 'axios';
import {
    ADD_PORTFOLIO_FAILURE, ADD_PORTFOLIO_REQUEST, ADD_PORTFOLIO_SUCCESS
} from "../reducers/portfolio";


function addPortfolioAPI(data) {
    return axios.post('/post' , data)
}

function* addPortfolio(action) {
    try {
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

function* watchAddPortfolio() {
    yield takeLatest(ADD_PORTFOLIO_REQUEST, addPortfolio)
}


export default function* postSaga() {
    yield all([
        fork(watchAddPortfolio),
    ])
}