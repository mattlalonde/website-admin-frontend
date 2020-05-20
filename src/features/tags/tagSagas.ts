import { all, fork } from 'redux-saga/effects';
import { watchCreateTagSaga } from './create/createTagSaga';
import { watchLoadTagSaga } from './details/sagas/loadTagSaga';
import { watchUpdateTagSaga } from './details/sagas/updateTagSaga';
import { watchLoadTagsSaga } from './list/loadTagsSaga';

function* tagSagas() {
    yield all([
        fork(watchCreateTagSaga),

        fork(watchLoadTagSaga),
        fork(watchUpdateTagSaga),

        fork(watchLoadTagsSaga)
    ]);
}

export default tagSagas;