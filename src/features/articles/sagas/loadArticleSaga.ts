import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../details/articleDetailsSlice';
import * as errors from '../../errors/errorsSlice';
import { loadArticle } from '../api';
import { IArticleResponse } from '../models';

function* loadArticleSaga(action) {
    try {
        const data: IArticleResponse = yield call(loadArticle, action.payload);
        yield put(actions.articleDetailsActionSuccess(data));
    }
    catch(error) {
        yield put(actions.articleDetailsActionFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchLoadArticleSaga() {
    yield takeLatest(actions.loadArticleRequest, loadArticleSaga);
}