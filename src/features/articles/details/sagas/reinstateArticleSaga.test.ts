import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchReinstateArticleSaga } from './reinstateArticleSaga';
import reducer, * as actions from '../articleDetailsSlice';
import * as errors from '../../../errors/errorsSlice';
import { reinstateArticle } from '../../api';
import deletedArticle from '../../__mockData__/deletedArticle.json';
import { throwError } from 'redux-saga-test-plan/providers';
import { IArticle } from '../../models';
import { ApiError } from '../../../../errors/ApiError';
import { ArticleDetailsProcessingState } from '../ArticleDetailsProcessingState';

describe('reinstate article saga', () => {
    it('failure should set error and not update article', () => {

        const initialState = {
            loadedArticle: deletedArticle,
            processingState: ArticleDetailsProcessingState.None
        };

        const error = new ApiError('reinstate error', {
            apierror: {
                message: 'something went wrong',
                status: 'ERROR',
                timestamp: (new Date()).toISOString()
            }
        });

        return expectSaga(watchReinstateArticleSaga)
                .withReducer(reducer)
                .withState(initialState)
                .provide([
                    [matchers.call.fn(reinstateArticle), throwError(error)]
                ])
                .put(actions.articleActionFailed(error.apiErrorData))
                .put(errors.setError(error.apiErrorData))
                .dispatch(actions.reinstateArticleRequest({ id: deletedArticle.id }))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: deletedArticle,
                        processingState: ArticleDetailsProcessingState.None
                    });
                });
    });

    it('success should call api and set article with new state', () => {
        const initialState = {
            loadedArticle: deletedArticle,
            processingState: ArticleDetailsProcessingState.None
        };

        const newValues = {
            state: 'DRAFT'
        };

        const updatedArticle = { ...deletedArticle , ...newValues };


        return expectSaga(watchReinstateArticleSaga)
                .withReducer(reducer)
                .withState(initialState)
                .provide([
                    [matchers.call.fn(reinstateArticle), updatedArticle]
                ])
                .put(actions.articleActionSuccess(updatedArticle as IArticle))
                .dispatch(actions.reinstateArticleRequest({ id: deletedArticle.id }))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: updatedArticle,
                        processingState: ArticleDetailsProcessingState.None
                    });
                });
    });
});