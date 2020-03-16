import { takeEvery, call, put, all, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import *  as articleCreateActions from './articleCreateSlice';
import * as articleDetailsActions from '../details/articleDetailsSlice';
import * as articleListActions from '../list/articleListSlice';
import { createArticle } from '../api';

export function* createArticleSaga(action) {
    try {
        const data = yield call(createArticle, action.payload);
        yield put(articleCreateActions.createArticleSuccess(data));
        yield put(articleDetailsActions.setLoadedArticle(data));
        yield put(articleCreateActions.setCreateArticlePopupVisibility(false));
        yield put(articleListActions.addArticleToList({
            articleId: data.articleId,
            ownerUserId: data.ownerUserId,
            createdTimestamp:data.createdTimestamp,
            published: data.published,
            title: data.title
        }));
        yield put(push(`/article-details/${data.articleId}`));
    }
    catch(error) {
        yield put(articleCreateActions.createArticleFailed({error}));
    }
}

export function* watchCreateArticleSaga() {
    yield takeEvery(articleCreateActions.createArticleRequest, createArticleSaga);
}


function* articleDetailsSaga() {
    yield all([
        fork(watchCreateArticleSaga)
    ]);
}

export default articleDetailsSaga;