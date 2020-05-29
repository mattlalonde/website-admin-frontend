import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../details/articleDetailsSlice';
import * as errors from '../../errors/errorsSlice';
import { publishArticle } from '../api';
import { IArticleResponse } from '../models';

function* publishArticleSaga(action) {
    try {
        const data: IArticleResponse = yield call(publishArticle, action.payload);
        yield put(actions.articleDetailsActionSuccess(data));
    }
    catch(error) {
        yield put(actions.articleDetailsActionFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchPublishArticleSaga() {
    yield takeLatest(actions.publishArticleRequest, publishArticleSaga);
}