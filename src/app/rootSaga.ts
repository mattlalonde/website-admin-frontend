import { all, fork } from 'redux-saga/effects'

import articleListSaga from '../features/articles/list/sagas';
import articleDetailsSaga from '../features/articles/details/sagas';

export default function* rootSaga() {
    yield all([fork(articleListSaga), fork(articleDetailsSaga)]);
}
