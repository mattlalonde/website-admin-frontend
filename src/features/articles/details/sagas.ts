import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import * as actions from './articleDetailsSlice';
import { loadArticle, updateArticleContent } from '../api';


export function* loadArticleSaga(action) {
    try {
        const data = yield call(loadArticle, action.payload);
        yield put(actions.loadArticleSuccess(data));
    }
    catch(error) {
        yield put(actions.loadArticleFailed({error}));
    }
}

export function* watchLoadArticleSaga() {
    yield takeLatest(actions.loadArticleRequest, loadArticleSaga);
}

export function* updateArticleContentSaga(action) {
    try {
        const data = yield call(updateArticleContent, action.payload);
        yield put(actions.updateArticleContentSuccess(data));
    }
    catch(error) {
        yield put(actions.updateArticleContentFailed(error));
    }
}

export function* watchUpdateArticleContentSaga() {
    yield takeLatest(actions.updateArticleContentRequest, updateArticleContentSaga);
}


function* articleDetailsSaga() {
    yield all([
        fork(watchLoadArticleSaga), 
        fork(watchUpdateArticleContentSaga)
    ]);
}

export default articleDetailsSaga;