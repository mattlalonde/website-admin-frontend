import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { push } from 'connected-react-router';

import createRootReducer from '../../../app/rootReducer'; 
import articleActions from '../articleActions';
import { watchCreateArticleSaga } from './createArticleSaga';
import { createArticle } from '../api';
import initialStoreState from '../../../app/initialStoreStateTesting';

import createdArticle from '../__mockData__/createdArticle.json';
import articleList from '../__mockData__/list.json';
import { IArticle, IArticleResponse } from '../models';
import { ApiError } from '../../../errors/ApiError';
import { RootState } from '../../../app/store';

describe('create article saga', () => {

    it('puts failed action on error and updates store', () => {
        const error = ApiError.create('API_ERROR', 'Unable to create article')

        return expectSaga(watchCreateArticleSaga)
                .withReducer(createRootReducer())
                .provide([
                    [matchers.call.fn(createArticle), throwError(error)]
                ])
                .put(articleActions.createArticleFailed(error.apiErrorData))
                .dispatch(articleActions.createArticleRequest({ title: 'new article title'}))
                .silentRun()
                .then(result => {

                    const state: RootState = result.storeState;

                    expect(state.articlesUi.create).toEqual({
                        isPopupOpen: false,
                        isCreating: false,
                        createArticleServerError: error.apiErrorData.apierror.message
                    });

                    expect(state.entities.articles).toEqual({});
                });
    });

    it('creates article and updates store', () => {

        const newArticle : IArticle = createdArticle as IArticle;

        const storeState = Object.assign(initialStoreState, {
            entities: {
                articles: articleList.entities
            },
            articlesUi: {
                list: {
                    result: articleList.result
                }
            }
        });

        const articleResponse: IArticleResponse = {
            article: newArticle,
            tags: {}
        };
        
        return expectSaga(watchCreateArticleSaga)
                .withReducer(createRootReducer(), storeState)
                .provide([
                    [matchers.call.fn(createArticle), articleResponse]
                ])
                .put(articleActions.createArticleSuccess(articleResponse))
                .put(articleActions.closeCreateArticlePopup())
                .put(push(`/article-details/${createdArticle.id}`))
                .dispatch(articleActions.createArticleRequest({ title: 'new article title'}))
                .silentRun()
                .then(result => {
                    const state: RootState = result.storeState;
                    
                    expect(state.entities.articles[newArticle.id]).toEqual(newArticle);

                    expect(state.articlesUi.create).toEqual({
                        isPopupOpen: false,
                        isCreating: false,
                        createArticleServerError: null
                    });

                    expect(state.articlesUi.list.result).toEqual([newArticle.id, ...storeState.articlesUi.list.result]);
                })


    })
});
