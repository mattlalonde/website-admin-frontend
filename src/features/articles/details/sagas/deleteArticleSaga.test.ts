import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchDeleteArticleSaga } from './deleteArticleSaga';
import reducer, * as actions from '../articleDetailsSlice';
import * as errors from '../../../errors/errorsSlice';
import { deleteArticle } from '../../api';
import draftArticle from '../../__mockData__/draftArticle.json';
import { throwError } from 'redux-saga-test-plan/providers';
import { IArticle } from '../../models';
import { ApiError } from '../../../../errors/ApiError';
import { ArticleDetailsProcessingState } from '../ArticleDetailsProcessingState';

describe('delete article saga', () => {
    it('delete article failed should set error and not update areticle', () => {
        const initialState = {
            loadedArticle: draftArticle,
            processingState: ArticleDetailsProcessingState.None
        };

        const error = new ApiError('delete error', {
            apierror: {
                message: 'something went wrong',
                status: 'ERROR',
                timestamp: (new Date()).toISOString()
            }
        });

        return expectSaga(watchDeleteArticleSaga)
                .withReducer(reducer)
                .withState(initialState)
                .provide([
                    [matchers.call.fn(deleteArticle), throwError(error)]
                ])
                .put(actions.articleActionFailed(error.apiErrorData))
                .put(errors.setError(error.apiErrorData))
                .dispatch(actions.deleteArticleRequest({ id: draftArticle.id }))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: draftArticle,
                        processingState: ArticleDetailsProcessingState.None
                    });
                });
    });

    it('delete article should call the api and set the new article state', () => {
        const initialState = {
            loadedArticle: draftArticle,
            processingState: ArticleDetailsProcessingState.None
        };

        const newValues = {
            state: 'DELETED'
        };

        const updatedArticle = { ...draftArticle , ...newValues };


        return expectSaga(watchDeleteArticleSaga)
                .withReducer(reducer)
                .withState(initialState)
                .provide([
                    [matchers.call.fn(deleteArticle), updatedArticle]
                ])
                .put(actions.articleActionSuccess(updatedArticle as IArticle))
                .dispatch(actions.deleteArticleRequest({ id: draftArticle.id }))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: updatedArticle,
                        processingState: ArticleDetailsProcessingState.None
                    });
                });
    });
});