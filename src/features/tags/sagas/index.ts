import { all, fork } from 'redux-saga/effects';
import { watchCreateTagSaga } from './createTagSaga';
import { watchLoadTagSaga } from './loadTagSaga';
import { watchUpdateTagSaga } from './updateTagSaga';
import { watchLoadTagsSaga } from './loadTagsSaga';

function* tagSagas() {
    yield all([
        fork(watchCreateTagSaga),

        fork(watchLoadTagSaga),
        fork(watchUpdateTagSaga),

        fork(watchLoadTagsSaga)
    ]);
}

export default tagSagas;