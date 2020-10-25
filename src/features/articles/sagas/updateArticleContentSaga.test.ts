import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchUpdateArticleContentSaga } from './updateArticleContentSaga';
import { updateArticleContent } from '../api';
import draftArticle from '../__mockData__/draftArticle.json';
import { IArticle, IArticleResponse } from '../models';
import { ArticleDetailsProcessingState } from '../details/ArticleDetailsProcessingState';
import createRootReducer from '../../../app/rootReducer'; 
import articleActions from '../articleActions';
import * as errors from '../../errors/errorsSlice';
import { RootState } from '../../../app/store';
import initialStoreState from '../../../app/initialStoreStateTesting';
import { IApiResponse } from '../../../utils/api/http';

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

        const apiResponse: IApiResponse<IArticleResponse> = {
            ok: false,
            status: 500,
            error: {
                type: 'ApiError',
                message: 'error'
            }
        }

        return expectSaga(watchUpdateArticleContentSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(updateArticleContent), apiResponse]
                ])
                .put(articleActions.articleDetailsActionFailed())
                .put(errors.setError(apiResponse.error!))
                .dispatch(articleActions.updateArticleContentRequest({ id: draftArticle.id, data: newValues }))
                .silentRun()
                .then(result => {

                    const store: RootState = result.storeState;

                    expect(store.entities.articles[draftArticle.id]).toEqual(draftArticle);
                    expect(store.articlesUi.details.processingState).toEqual(ArticleDetailsProcessingState.None);
                    expect(store.errors.isErrorPopupOpen).toEqual(true);
                    expect(store.errors.error).toEqual(apiResponse.error);
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

        const apiResponse: IApiResponse<IArticleResponse> = {
            ok: true,
            status: 200,
            body: articleResponse
        }

        return expectSaga(watchUpdateArticleContentSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(updateArticleContent), apiResponse]
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