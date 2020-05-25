import { all, fork } from 'redux-saga/effects';
import { watchLoadArticleSaga } from './details/sagas/loadArticleSaga';
import { watchUpdateArticleContentSaga } from './details/sagas/updateArticleContentSaga';
import { watchDeleteArticleSaga } from './details/sagas/deleteArticleSaga';
import { watchReinstateArticleSaga } from './details/sagas/reinstateArticleSaga';
import { watchPublishArticleSaga } from './details/sagas/publishArticleSaga';
import { watchTakeArticleOfflineSaga } from './details/sagas/takeArticleOfflineSaga';
import { watchCreateArticleSaga } from './create/createArticleSaga';
import { watchLoadArticlesSaga } from './list/loadArticlesSaga';
import { watchAddTagToArticleSaga } from './details/sagas/addArticleTagSaga';
import { watchRemoveTagFromArticleSaga } from './details/sagas/removeArticleTagSaga';

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