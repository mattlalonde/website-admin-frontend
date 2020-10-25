import { takeLatest, call, put } from 'redux-saga/effects';

import actions from '../articleActions';
import * as errors from '../../errors/errorsSlice';

import { addTagToArticle } from '../api';
import { IArticleResponse } from '../models';
import { IApiResponse } from '../../../utils/api/http';
import { defaultError } from '../../errors/models';

function* addTagToArticleSaga(action) {
    const response: IApiResponse<IArticleResponse> = yield call(addTagToArticle, action.payload);

    if(response.ok && response.body) {
        yield put(actions.articleDetailsActionSuccess(response.body));  
    }
    else {
        yield put(actions.articleDetailsActionFailed());
        yield put(errors.setError(response.error ?? defaultError));
    }
}

export function* watchAddTagToArticleSaga() {
    yield takeLatest(actions.addTagToArticleRequest, addTagToArticleSaga);
}