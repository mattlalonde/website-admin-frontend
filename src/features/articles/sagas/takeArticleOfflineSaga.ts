import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../details/articleDetailsSlice';
import * as errors from '../../errors/errorsSlice';
import { takeArticleOffline } from '../api';
import { IArticleResponse } from '../models';

function* takeArticleOfflineSaga(action) {
    try {
        const data: IArticleResponse = yield call(takeArticleOffline, action.payload);
        yield put(actions.articleDetailsActionSuccess(data));
    }
    catch(error) {
        yield put(actions.articleDetailsActionFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchTakeArticleOfflineSaga() {
    yield takeLatest(actions.takeArticleOfflineRequest, takeArticleOfflineSaga);
}