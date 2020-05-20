import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchTakeArticleOfflineSaga } from './takeArticleOfflineSaga';
import reducer, * as actions from '../articleDetailsSlice';
import * as errors from '../../../errors/errorsSlice';
import { takeArticleOffline } from '../../api';
import publishedArticle from '../../__mockData__/publishedArticle.json';
import { throwError } from 'redux-saga-test-plan/providers';
import { IArticle } from '../../models';
import { ApiError } from '../../../../errors/ApiError';
import { ArticleDetailsProcessingState } from '../ArticleDetailsProcessingState';

describe('take article offline saga', () => {
    it('failure should set error and not update article', () => {
        const initialState = {
            loadedArticle: publishedArticle,
            processingState: ArticleDetailsProcessingState.None
        };

        const error = new ApiError('take article offline error', {
            apierror: {
                message: 'something went wrong',
                status: 'ERROR',
                timestamp: (new Date()).toISOString()
            }
        });

        return expectSaga(watchTakeArticleOfflineSaga)
                .withReducer(reducer)
                .withState(initialState)
                .provide([
                    [matchers.call.fn(takeArticleOffline), throwError(error)]
                ])
                .put(actions.articleActionFailed(error.apiErrorData))
                .put(errors.setError(error.apiErrorData))
                .dispatch(actions.takeArticleOfflineRequest({ id: publishedArticle.id }))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: publishedArticle,
                        processingState: ArticleDetailsProcessingState.None
                    });
                });
    });

    it('success should call api and set article with new state', () => {
        const initialState = {
            loadedArticle: publishedArticle,
            processingState: ArticleDetailsProcessingState.None
        };

        const newValues = {
            state: 'DRAFT',
            publicationDate: null
        };

        const updatedArticle = { ...publishedArticle , ...newValues };


        return expectSaga(watchTakeArticleOfflineSaga)
                .withReducer(reducer)
                .withState(initialState)
                .provide([
                    [matchers.call.fn(takeArticleOffline), updatedArticle]
                ])
                .put(actions.articleActionSuccess(updatedArticle as IArticle))
                .dispatch(actions.takeArticleOfflineRequest({ id: publishedArticle.id }))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: updatedArticle,
                        processingState: ArticleDetailsProcessingState.None
                    });
                });
    });
});