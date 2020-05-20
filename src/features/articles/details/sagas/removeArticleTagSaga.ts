import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../articleDetailsSlice';
import * as errors from '../../../errors/errorsSlice';

import { removeTagFromArticle } from '../../api';
import { IArticle } from '../../models';

function* removeTagFromArticleSaga(action) {
    try {
        const data: IArticle = yield call(removeTagFromArticle, action.payload);
        yield put(actions.articleActionSuccess(data));        
    }
    catch(error) {
        yield put(actions.articleActionFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchRemoveTagFromArticleSaga() {
    yield takeLatest(actions.removeTagFromArticleRequest, removeTagFromArticleSaga);
}