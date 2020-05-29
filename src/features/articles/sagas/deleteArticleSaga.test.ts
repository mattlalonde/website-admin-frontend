import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchDeleteArticleSaga } from './deleteArticleSaga';
import createRootReducer from '../../../app/rootReducer'; 
import * as errors from '../../errors/errorsSlice';
import { deleteArticle } from '../api';
import draftArticle from '../__mockData__/draftArticle.json';
import { throwError } from 'redux-saga-test-plan/providers';
import { IArticle } from '../models';
import { ApiError } from '../../../errors/ApiError';
import { ArticleDetailsProcessingState } from '../details/ArticleDetailsProcessingState';
import articleActions from '../articleActions';
import initialStoreState from '../../../app/initialStoreStateTesting';
import { RootState } from '../../../app/store';

describe('delete article saga', () => {
    it('delete article failed should set error and not update areticle', () => {
        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticle.id]: draftArticle
                }
            }
        });

        const error = ApiError.create('delete error', 'something went wrong');

        return expectSaga(watchDeleteArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(deleteArticle), throwError(error)]
                ])
                .put(articleActions.articleDetailsActionFailed(error.apiErrorData))
                .put(errors.setError(error.apiErrorData))
                .dispatch(articleActions.deleteArticleRequest({ id: draftArticle.id }))
                .silentRun()
                .then(result => {

                    const store: RootState = result.storeState;

                    expect(store.articlesUi.details.processingState).toEqual(ArticleDetailsProcessingState.None);
                    expect(store.entities.articles[draftArticle.id]).toEqual(draftArticle);
                    expect(store.errors.isErrorPopupOpen).toEqual(true);
                    expect(store.errors.error).toEqual(error.apiErrorData);
                });
    });

    it('delete article should call the api and set the new article state', () => {

        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticle.id]: draftArticle
                }
            }
        });

        const newValues = {
            state: 'DELETED'
        };

        const updatedArticle = { ...draftArticle , ...newValues };


        return expectSaga(watchDeleteArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(deleteArticle), updatedArticle]
                ])
                .put(articleActions.articleDetailsActionSuccess(updatedArticle as IArticle))
                .dispatch(articleActions.deleteArticleRequest({ id: draftArticle.id }))
                .silentRun()
                .then(result => {

                    const store: RootState = result.storeState;

                    expect(store.articlesUi.details.processingState).toEqual(ArticleDetailsProcessingState.None);
                    expect(store.entities.articles[updatedArticle.id]).toEqual(updatedArticle);
                });
    });
});