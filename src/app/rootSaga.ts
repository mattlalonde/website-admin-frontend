import { all, fork } from 'redux-saga/effects'

import articleListSaga from '../features/articles/list/sagas';
import articleDetailsSaga from '../features/articles/details/sagas';
import articleCreateSaga from '../features/articles/create/sagas';

import tagListSaga from '../features/tags/list/sagas';
import tagDetailsSaga from '../features/tags/details/sagas';
import tagCreateSaga from '../features/tags/create/sagas';

export default function* rootSaga() {
    yield all([
        fork(articleListSaga), 
        fork(articleDetailsSaga),
        fork(articleCreateSaga),

        fork(tagListSaga),
        fork(tagDetailsSaga),
        fork(tagCreateSaga)
    ]);
}

