import { takeEvery, call, put } from 'redux-saga/effects';

import * as actions from '../list/articleListSlice';
import * as errors from '../../errors/errorsSlice';
import { loadArticles } from '../api';
import { IArticleListResponse } from '../models';
import { IApiResponse } from '../../../utils/api/http';
import { defaultError } from '../../errors/models';


function* loadArticlesSaga() {
    const response : IApiResponse<IArticleListResponse> = yield call(loadArticles);

    if(response.ok && response.body) {
        yield put(actions.loadArticlesSuccess(response.body));
    }
    else {
        yield put(actions.loadArticlesFailed());
        yield put(errors.setError(response.error ?? defaultError));
    }
}

export function* watchLoadArticlesSaga() {
    yield takeEvery(actions.loadArticlesRequest, loadArticlesSaga);
}
