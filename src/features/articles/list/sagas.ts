import { takeEvery, call, put, all, fork } from 'redux-saga/effects';

import * as actions from './articleListSlice';
import { loadArticles } from '../api';


export function* loadArticlesSaga() {
    try {
        const data = yield call(loadArticles);
        yield put(actions.loadArticlesSuccess(data));
    }
    catch(error) {
        yield put(actions.loadArticlesFailed({error}));
    }
}

export function* watchLoadArticlesSaga() {
    yield takeEvery(actions.loadArticlesRequest, loadArticlesSaga);
}

function* articleListSaga() {
    yield all([fork(watchLoadArticlesSaga)]);
}

export default articleListSaga;