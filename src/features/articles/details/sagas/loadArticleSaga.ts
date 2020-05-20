import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../articleDetailsSlice';
import * as errors from '../../../errors/errorsSlice';
import { loadArticle } from '../../api';

function* loadArticleSaga(action) {
    try {
        const data = yield call(loadArticle, action.payload);
        yield put(actions.articleActionSuccess(data));
    }
    catch(error) {
        yield put(actions.articleActionFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchLoadArticleSaga() {
    yield takeLatest(actions.loadArticleRequest, loadArticleSaga);
}