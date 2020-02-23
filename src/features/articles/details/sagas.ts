import { takeEvery, call, put, all, fork } from 'redux-saga/effects';

import * as actions from './articleDetailsSlice';
import { loadArticle } from '../api';


export function* loadArticleSaga(action) {
    try {
        const data = yield call(loadArticle, action.payload);
        yield put(actions.loadArticleSuccess(data));
    }
    catch(error) {
        yield put(actions.loadArticleFailed(error));
    }
}

function* watchLoadArticleSaga() {
    yield takeEvery(actions.loadArticleRequest, loadArticleSaga);
}

function* articleDetailsSaga() {
    yield all([fork(watchLoadArticleSaga)]);
}

export default articleDetailsSaga;