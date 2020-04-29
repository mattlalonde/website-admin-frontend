import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchLoadArticleSaga, watchUpdateArticleContentSaga, watchDeleteArticleSaga, watchReinstateArticleSaga, watchPublishArticleSaga, watchTakeArticleOfflineSaga } from './sagas';
import reducer, * as actions from './articleDetailsSlice';
import * as errors from '../../errors/errorsSlice';
import { loadArticle, updateArticleContent, deleteArticle, reinstateArticle, publishArticle, takeArticleOffline } from '../api';
import draftArticle from '../__mockData__/draftArticle.json';
import deletedArticle from '../__mockData__/deletedArticle.json';
import publishedArticle from '../__mockData__/publishedArticle.json';
import { throwError } from 'redux-saga-test-plan/providers';
import { IArticle } from '../models';
import { ApiError } from '../../../errors/ApiError';
import { ArticleDetailsProcessingState } from './ArticleDetailsProcessingState';

describe('article details saga', () => {

    it('loda article puts failed action on error and updates store', () => {
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
                .put(actions.loadArticleFailed(error.apiErrorData))
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

    it('load article calls the api and updates the store', () => {
        return expectSaga(watchLoadArticleSaga)
                .withReducer(reducer)
                .provide([
                    [matchers.call.fn(loadArticle), draftArticle]
                ])
                .put(actions.loadArticleSuccess(draftArticle as IArticle))
                .dispatch(actions.loadArticleRequest('test'))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: draftArticle,
                        processingState: ArticleDetailsProcessingState.None
                    });
                });
    });

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
                .put(actions.updateArticleContentFailed(error.apiErrorData))
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
                .put(actions.updateArticleContentSuccess(updatedArticle as IArticle))
                .dispatch(actions.updateArticleContentRequest({ id: draftArticle.id, data: newValues }))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: updatedArticle,
                        processingState: ArticleDetailsProcessingState.None
                    });
                });
    });

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
                .put(actions.deleteArticleFailed(error.apiErrorData))
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
                .put(actions.deleteArticleSuccess(updatedArticle as IArticle))
                .dispatch(actions.deleteArticleRequest({ id: draftArticle.id }))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: updatedArticle,
                        processingState: ArticleDetailsProcessingState.None
                    });
                });
    });

    it('reinstate article failed should set error and not update article', () => {

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
                .put(actions.reinstateArticleFailed(error.apiErrorData))
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

    it('reinstate article success should call api and set article with new state', () => {
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
                .put(actions.reinstateArticleSuccess(updatedArticle as IArticle))
                .dispatch(actions.reinstateArticleRequest({ id: deletedArticle.id }))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: updatedArticle,
                        processingState: ArticleDetailsProcessingState.None
                    });
                });
    });

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
                .put(actions.publishArticleFailed(error.apiErrorData))
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
                .put(actions.publishArticleSuccess(updatedArticle as IArticle))
                .dispatch(actions.publishArticleRequest({ id: deletedArticle.id, data: { publicationDate: publicationDate } }))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: updatedArticle,
                        processingState: ArticleDetailsProcessingState.None
                    });
                });
    });

    it('take article offline failed should set error and not update article', () => {
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
                .put(actions.takeArticleOfflineFailed(error.apiErrorData))
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

    it('unpublish article success should call api and set article with new state', () => {
        const initialState = {
            loadedArticle: publishedArticle,
            processingState: ArticleDetailsProcessingState.None
        };

        const newValues = {
            state: 'DRAFT',
            publicationDate: null
        };

        const updatedArticle = { ...draftArticle , ...newValues };


        return expectSaga(watchTakeArticleOfflineSaga)
                .withReducer(reducer)
                .withState(initialState)
                .provide([
                    [matchers.call.fn(takeArticleOffline), updatedArticle]
                ])
                .put(actions.takeArticleOfflineSuccess(updatedArticle as IArticle))
                .dispatch(actions.takeArticleOfflineRequest({ id: deletedArticle.id }))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: updatedArticle,
                        processingState: ArticleDetailsProcessingState.None
                    });
                });
    });
})