import { takeLatest, call, put } from 'redux-saga/effects';

import tagActions from '../tagActions';
import * as errors from '../../errors/errorsSlice';
import * as api from '../api';
import { ITag } from '../models';

function* updateTagSaga(action) {
    try {
        const data: ITag = yield call(api.updateTag, action.payload);
        yield put(tagActions.updateTagSuccess(data));
    }
    catch(error) {
        yield put(tagActions.updateTagFailed());
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchUpdateTagSaga() {
    yield takeLatest(tagActions.updateTagRequest, updateTagSaga);
}