import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../tagSlice';
import * as errors from '../../errors/errorsSlice';
import * as api from '../api';
import { ITag } from '../models';

function* updateTagSaga(action) {
    try {
        const data: ITag = yield call(api.updateTag, action.payload);
        yield put(actions.updateTagSuccess(data));
    }
    catch(error) {
        yield put(actions.updateTagFailed());
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchUpdateTagSaga() {
    yield takeLatest(actions.updateTagRequest, updateTagSaga);
}