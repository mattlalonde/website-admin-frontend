import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../articleDetailsSlice';
import * as errors from '../../../errors/errorsSlice';
import { publishArticle } from '../../api';

function* publishArticleSaga(action) {
    try {
        const data = yield call(publishArticle, action.payload);
        yield put(actions.articleActionSuccess(data));
    }
    catch(error) {
        yield put(actions.articleActionFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchPublishArticleSaga() {
    yield takeLatest(actions.publishArticleRequest, publishArticleSaga);
}