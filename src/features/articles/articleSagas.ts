import { all, fork } from 'redux-saga/effects';
import { watchLoadArticleSaga } from './sagas/loadArticleSaga';
import { watchUpdateArticleContentSaga } from './sagas/updateArticleContentSaga';
import { watchDeleteArticleSaga } from './sagas/deleteArticleSaga';
import { watchReinstateArticleSaga } from './sagas/reinstateArticleSaga';
import { watchPublishArticleSaga } from './sagas/publishArticleSaga';
import { watchTakeArticleOfflineSaga } from './sagas/takeArticleOfflineSaga';
import { watchCreateArticleSaga } from './sagas/createArticleSaga';
import { watchLoadArticlesSaga } from './sagas/loadArticlesSaga';
import { watchAddTagToArticleSaga } from './sagas/addArticleTagSaga';
import { watchRemoveTagFromArticleSaga } from './sagas/removeArticleTagSaga';

function* articleSagas() {
    yield all([
        fork(watchLoadArticleSaga), 
        fork(watchUpdateArticleContentSaga),
        fork(watchDeleteArticleSaga),
        fork(watchReinstateArticleSaga),
        fork(watchPublishArticleSaga),
        fork(watchTakeArticleOfflineSaga),
        fork(watchAddTagToArticleSaga),
        fork(watchRemoveTagFromArticleSaga),

        fork(watchCreateArticleSaga),

        fork(watchLoadArticlesSaga)
    ]);
}

export default articleSagas;