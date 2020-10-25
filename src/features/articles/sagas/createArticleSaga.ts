import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import articleActions from '../articleActions';
import { createArticle } from '../api';
import { IArticleResponse } from '../models';
import { IApiResponse } from '../../../utils/api/http';
import { defaultError } from '../../errors/models';

function* createArticleSaga(action) {

    const response: IApiResponse<IArticleResponse> = yield call(createArticle, action.payload);

    if(response.ok && response.body){
        yield put(articleActions.createArticleSuccess(response.body));
        yield put(articleActions.closeCreateArticlePopup());
        yield put(push(`/article-details/${response.body.article.id}`));
    }
    else {
        yield put(articleActions.createArticleFailed(response.error ?? defaultError));
    }
}

export function* watchCreateArticleSaga() {
    yield takeEvery(articleActions.createArticleRequest, createArticleSaga);
}
