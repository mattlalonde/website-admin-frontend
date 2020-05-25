import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../articleDetailsSlice';
import * as errors from '../../../errors/errorsSlice';
import { reinstateArticle } from '../../api';

function* reinstateArticleSaga(action) {
    try {
        const data = yield call(reinstateArticle, action.payload);
        yield put(actions.articleActionSuccess(data));
    }
    catch(error) {
        yield put(actions.articleActionFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchReinstateArticleSaga() {
    yield takeLatest(actions.reinstateArticleRequest, reinstateArticleSaga);
}