import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../details/articleDetailsSlice';
import * as errors from '../../errors/errorsSlice';
import { updateArticleContent } from '../api';
import { IArticleResponse } from '../models';

function* updateArticleContentSaga(action) {
    try {
        const data: IArticleResponse = yield call(updateArticleContent, action.payload);
        yield put(actions.articleDetailsActionSuccess(data));
    }
    catch(error) {
        yield put(actions.articleDetailsActionFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchUpdateArticleContentSaga() {
    yield takeLatest(actions.updateArticleContentRequest, updateArticleContentSaga);
}