import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchPublishArticleSaga } from './publishArticleSaga';
import reducer, * as actions from '../articleDetailsSlice';
import * as errors from '../../../errors/errorsSlice';
import { publishArticle } from '../../api';
import draftArticle from '../../__mockData__/draftArticle.json';
import { throwError } from 'redux-saga-test-plan/providers';
import { IArticle } from '../../models';
import { ApiError } from '../../../../errors/ApiError';
import { ArticleDetailsProcessingState } from '../ArticleDetailsProcessingState';

describe('publish article saga', () => {
    it('publish article failed should set error and not update article', () => {
        const initialState = {
            loadedArticle: draftArticle,
            processingState: ArticleDetailsProcessingState.None
        };

        const publicationDate = new Date();

        const error = new ApiError('publish error', {
            apierror: {
                message: 'something went wrong',
                status: 'ERROR',
                timestamp: (new Date()).toISOString()
            }
        });

        return expectSaga(watchPublishArticleSaga)
                .withReducer(reducer)
                .withState(initialState)
                .provide([
                    [matchers.call.fn(publishArticle), throwError(error)]
                ])
                .put(actions.articleActionFailed(error.apiErrorData))
                .put(errors.setError(error.apiErrorData))
                .dispatch(actions.publishArticleRequest({ id: draftArticle.id, data: { publicationDate: publicationDate.toUTCString() } }))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: draftArticle,
                        processingState: ArticleDetailsProcessingState.None
                    });
                });
    });

    it('publish article success should call api and set article with new state', () => {
        const initialState = {
            loadedArticle: draftArticle,
            processingState: ArticleDetailsProcessingState.None
        };

        const publicationDate = (new Date()).toUTCString();
        const newValues = {
            state: 'PUBLISHED',
            publicationDate: publicationDate
        };

        const updatedArticle = { ...draftArticle , ...newValues };


        return expectSaga(watchPublishArticleSaga)
                .withReducer(reducer)
                .withState(initialState)
                .provide([
                    [matchers.call.fn(publishArticle), updatedArticle]
                ])
                .put(actions.articleActionSuccess(updatedArticle as IArticle))
                .dispatch(actions.publishArticleRequest({ id: draftArticle.id, data: { publicationDate: publicationDate } }))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: updatedArticle,
                        processingState: ArticleDetailsProcessingState.None
                    });
                });
    });
});