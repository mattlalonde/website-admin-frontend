import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchLoadArticleSaga } from './loadArticleSaga';
import reducer, * as actions from '../articleDetailsSlice';
import * as errors from '../../../errors/errorsSlice';
import { loadArticle } from '../../api';
import draftArticle from '../../__mockData__/draftArticle.json';
import { throwError } from 'redux-saga-test-plan/providers';
import { IArticle } from '../../models';
import { ApiError } from '../../../../errors/ApiError';
import { ArticleDetailsProcessingState } from '../ArticleDetailsProcessingState';

describe('load article saga', () => {
    it('puts failed action on error and updates store', () => {
        const error = new ApiError('test error', {
            apierror: {
                message: 'something went wrong',
                status: 'ERROR',
                timestamp: (new Date()).toISOString()
            }
        });

        return expectSaga(watchLoadArticleSaga)
                .withReducer(reducer)
                .provide([
                    [matchers.call.fn(loadArticle), throwError(error)]
                ])
                .put(actions.articleActionFailed(error.apiErrorData))
                .put(errors.setError(error.apiErrorData))
                .dispatch(actions.loadArticleRequest('test'))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: null,
                        processingState: ArticleDetailsProcessingState.None
                    });
                });
    });

    it('calls the api and updates the store', () => {
        return expectSaga(watchLoadArticleSaga)
                .withReducer(reducer)
                .provide([
                    [matchers.call.fn(loadArticle), draftArticle]
                ])
                .put(actions.articleActionSuccess(draftArticle as IArticle))
                .dispatch(actions.loadArticleRequest('test'))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: draftArticle,
                        processingState: ArticleDetailsProcessingState.None
                    });
                });
    });
});