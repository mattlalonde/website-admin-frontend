import { takeLatest, call, put } from 'redux-saga/effects';

import tagActions from '../tagActions';
import * as errors from '../../errors/errorsSlice';
import * as api from '../api';
import { ITag } from '../models';

function* loadTagSaga(action) {
    try {
        const data: ITag = yield call(api.loadTag, action.payload);
        yield put(tagActions.loadTagSuccess(data));
    }
    catch(error) {
        yield put(tagActions.loadTagFailed());
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchLoadTagSaga() {
    yield takeLatest(tagActions.loadTagRequest, loadTagSaga);
}