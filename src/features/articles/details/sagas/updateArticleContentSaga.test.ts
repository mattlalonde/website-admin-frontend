import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchUpdateArticleContentSaga } from './updateArticleContentSaga';
import reducer, * as actions from '../articleDetailsSlice';
import * as errors from '../../../errors/errorsSlice';
import { updateArticleContent } from '../../api';
import draftArticle from '../../__mockData__/draftArticle.json';
import { throwError } from 'redux-saga-test-plan/providers';
import { IArticle } from '../../models';
import { ApiError } from '../../../../errors/ApiError';
import { ArticleDetailsProcessingState } from '../ArticleDetailsProcessingState';

describe('update article content saga', () => {
    it('update article error should update store error and not update article', () => {
        const initialState = {
            loadedArticle: draftArticle,
            processingState: ArticleDetailsProcessingState.None
        };

        const newValues = {
            title: 'new title',
            precis: 'new prcis',
            body: 'new body'
        };

        const error = new ApiError('update error', {
            apierror: {
                message: 'something went wrong',
                status: 'ERROR',
                timestamp: (new Date()).toISOString()
            }
        });

        return expectSaga(watchUpdateArticleContentSaga)
                .withReducer(reducer)
                .withState(initialState)
                .provide([
                    [matchers.call.fn(updateArticleContent), throwError(error)]
                ])
                .put(actions.articleActionFailed(error.apiErrorData))
                .put(errors.setError(error.apiErrorData))
                .dispatch(actions.updateArticleContentRequest({ id: draftArticle.id, data: newValues }))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: draftArticle,
                        processingState: ArticleDetailsProcessingState.None
                    });
                });
    });

    it('update article call the api and updates the store', () => {

        const initialState = {
            loadedArticle: draftArticle,
            processingState: ArticleDetailsProcessingState.None
        };

        const newValues = {
            title: 'new title',
            precis: 'new prcis',
            body: 'new body'
        };

        const updatedArticle = { ...draftArticle , ...newValues };


        return expectSaga(watchUpdateArticleContentSaga)
                .withReducer(reducer)
                .withState(initialState)
                .provide([
                    [matchers.call.fn(updateArticleContent), updatedArticle]
                ])
                .put(actions.articleActionSuccess(updatedArticle as IArticle))
                .dispatch(actions.updateArticleContentRequest({ id: draftArticle.id, data: newValues }))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: updatedArticle,
                        processingState: ArticleDetailsProcessingState.None
                    });
                });
    });
});