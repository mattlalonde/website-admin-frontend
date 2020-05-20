import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../articleDetailsSlice';
import * as errors from '../../../errors/errorsSlice';
import { takeArticleOffline } from '../../api';

function* takeArticleOfflineSaga(action) {
    try {
        const data = yield call(takeArticleOffline, action.payload);
        yield put(actions.articleActionSuccess(data));
    }
    catch(error) {
        yield put(actions.articleActionFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchTakeArticleOfflineSaga() {
    yield takeLatest(actions.takeArticleOfflineRequest, takeArticleOfflineSaga);
}