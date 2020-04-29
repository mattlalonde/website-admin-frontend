import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import * as actions from './articleDetailsSlice';
import * as errors from '../../errors/errorsSlice';
import { loadArticle, updateArticleContent, deleteArticle, reinstateArticle, publishArticle, takeArticleOffline } from '../api';


export function* loadArticleSaga(action) {
    try {
        const data = yield call(loadArticle, action.payload);
        yield put(actions.loadArticleSuccess(data));
    }
    catch(error) {
        yield put(actions.loadArticleFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
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
        yield put(actions.updateArticleContentFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchUpdateArticleContentSaga() {
    yield takeLatest(actions.updateArticleContentRequest, updateArticleContentSaga);
}

export function* deleteArticleSaga(action) {
    try {
        const data = yield call(deleteArticle, action.payload);
        yield put(actions.deleteArticleSuccess(data));
    }
    catch(error) {
        yield put(actions.deleteArticleFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchDeleteArticleSaga() {
    yield takeLatest(actions.deleteArticleRequest, deleteArticleSaga);
}

export function* reinstateArticleSaga(action) {
    try {
        const data = yield call(reinstateArticle, action.payload);
        yield put(actions.reinstateArticleSuccess(data));
    }
    catch(error) {
        yield put(actions.reinstateArticleFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchReinstateArticleSaga() {
    yield takeLatest(actions.reinstateArticleRequest, reinstateArticleSaga);
}

export function* publishArticleSaga(action) {
    try {
        const data = yield call(publishArticle, action.payload);
        yield put(actions.publishArticleSuccess(data));
    }
    catch(error) {
        yield put(actions.publishArticleFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchPublishArticleSaga() {
    yield takeLatest(actions.publishArticleRequest, publishArticleSaga);
}

export function* takeArticleOfflineSaga(action) {
    try {
        const data = yield call(takeArticleOffline, action.payload);
        yield put(actions.takeArticleOfflineSuccess(data));
    }
    catch(error) {
        yield put(actions.takeArticleOfflineFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchTakeArticleOfflineSaga() {
    yield takeLatest(actions.takeArticleOfflineRequest, takeArticleOfflineSaga);
}


function* articleDetailsSaga() {
    yield all([
        fork(watchLoadArticleSaga), 
        fork(watchUpdateArticleContentSaga),
        fork(watchDeleteArticleSaga),
        fork(watchReinstateArticleSaga),
        fork(watchPublishArticleSaga),
        fork(watchTakeArticleOfflineSaga)
    ]);
}

export default articleDetailsSaga;