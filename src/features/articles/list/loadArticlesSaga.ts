import { takeEvery, call, put } from 'redux-saga/effects';

import * as actions from './articleListSlice';
import * as errors from '../../errors/errorsSlice';
import { loadArticles } from '../api';
import { IArticleListResponse } from '../models';


function* loadArticlesSaga() {
    try {
        const data: IArticleListResponse = yield call(loadArticles);
        yield put(actions.loadArticlesSuccess(data));
    }
    catch(error) {
        yield put(actions.loadArticlesFailed());
        yield put(errors.setError(error));
    }
}

export function* watchLoadArticlesSaga() {
    yield takeEvery(actions.loadArticlesRequest, loadArticlesSaga);
}
