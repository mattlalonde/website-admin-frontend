import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import articleActions from '../articleActions';
import { createArticle } from '../api';
import { IArticleResponse } from '../models';

function* createArticleSaga(action) {
    try {
        const data: IArticleResponse = yield call(createArticle, action.payload);
        yield put(articleActions.createArticleSuccess(data));
        yield put(articleActions.closeCreateArticlePopup());
        yield put(push(`/article-details/${data.article.id}`));
    }
    catch(error) {
        yield put(articleActions.createArticleFailed(error.apiErrorData));
    }
}

export function* watchCreateArticleSaga() {
    yield takeEvery(articleActions.createArticleRequest, createArticleSaga);
}
