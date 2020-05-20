import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../tagDetailsSlice';
import * as errors from '../../../errors/errorsSlice';
import * as api from '../../api';

function* updateTagSaga(action) {
    try {
        const data = yield call(api.updateTag, action.payload);
        yield put(actions.updateTagSuccess(data));
    }
    catch(error) {
        yield put(actions.updateTagFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchUpdateTagSaga() {
    yield takeLatest(actions.updateTagRequest, updateTagSaga);
}