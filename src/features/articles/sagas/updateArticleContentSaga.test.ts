import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchUpdateArticleContentSaga } from './updateArticleContentSaga';
import { updateArticleContent } from '../api';
import draftArticle from '../__mockData__/draftArticle.json';
import { throwError } from 'redux-saga-test-plan/providers';
import { IArticle, IArticleResponse } from '../models';
import { ApiError } from '../../../errors/ApiError';
import { ArticleDetailsProcessingState } from '../details/ArticleDetailsProcessingState';
import createRootReducer from '../../../app/rootReducer'; 
import articleActions from '../articleActions';
import * as errors from '../../errors/errorsSlice';
import { RootState } from '../../../app/store';
import initialStoreState from '../../../app/initialStoreStateTesting';

describe('update article content saga', () => {
    it('update article error should update store error and not update article', () => {
        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticle.id]: draftArticle
                }
            }
        });

        const newValues = {
            title: 'new title',
            precis: 'new prcis',
            body: 'new body'
        };

        const error = ApiError.create('update error', 'something went wrong');

        return expectSaga(watchUpdateArticleContentSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(updateArticleContent), throwError(error)]
                ])
                .put(articleActions.articleDetailsActionFailed(error.apiErrorData))
                .put(errors.setError(error.apiErrorData))
                .dispatch(articleActions.updateArticleContentRequest({ id: draftArticle.id, data: newValues }))
                .silentRun()
                .then(result => {

                    const store: RootState = result.storeState;

                    expect(store.entities.articles[draftArticle.id]).toEqual(draftArticle);
                    expect(store.articlesUi.details.processingState).toEqual(ArticleDetailsProcessingState.None);
                    expect(store.errors.isErrorPopupOpen).toEqual(true);
                    expect(store.errors.error).toEqual(error.apiErrorData);
                });
    });

    it('update article call the api and updates the store', () => {

        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticle.id]: draftArticle
                }
            }
        });

        const newValues = {
            title: 'new title',
            precis: 'new prcis',
            body: 'new body'
        };

        const updatedArticle = { ...draftArticle , ...newValues } as IArticle;
        const articleResponse: IArticleResponse = {
            article: updatedArticle,
            tags: {}
        }


        return expectSaga(watchUpdateArticleContentSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(updateArticleContent), articleResponse]
                ])
                .put(articleActions.articleDetailsActionSuccess(articleResponse))
                .dispatch(articleActions.updateArticleContentRequest({ id: draftArticle.id, data: newValues }))
                .silentRun()
                .then(result => {
                    const store: RootState = result.storeState;

                    expect(store.entities.articles[draftArticle.id]).toEqual(updatedArticle);
                    expect(store.articlesUi.details.processingState).toEqual(ArticleDetailsProcessingState.None);
                });
    });
});