import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../details/articleDetailsSlice';
import * as errors from '../../errors/errorsSlice';
import { reinstateArticle } from '../api';
import { IArticleResponse } from '../models';

function* reinstateArticleSaga(action) {
    try {
        const data: IArticleResponse = yield call(reinstateArticle, action.payload);
        yield put(actions.articleDetailsActionSuccess(data));
    }
    catch(error) {
        yield put(actions.articleDetailsActionFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchReinstateArticleSaga() {
    yield takeLatest(actions.reinstateArticleRequest, reinstateArticleSaga);
}