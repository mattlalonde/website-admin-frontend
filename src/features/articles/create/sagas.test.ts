import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { push } from 'connected-react-router';

import createRootReducer from '../../../app/rootReducer'; 
import * as createArticleActions from './articleCreateSlice';
import * as articleDetailsActions from '../details/articleDetailsSlice';
import * as articleListActions from '../list/articleListSlice';
import { watchCreateArticleSaga } from './sagas';
import { createArticle } from '../api';
import { IArticleCreateState } from './articleCreateSlice';
import { IArticleDetailsState } from '../details/articleDetailsSlice';
import { IArticleListState } from '../list/articleListSlice';
import initialStoreState from '../../../app/initialStoreStateTesting';

import createdArticle from '../__mockData__/createdArticle.json';
import articleList from '../__mockData__/list.json';

describe('create article saga', () => {

    it('puts failed action on error and updates store', () => {
        const error = new Error('test error');

        return expectSaga(watchCreateArticleSaga)
                .withReducer(createRootReducer())
                .provide([
                    [matchers.call.fn(createArticle), throwError(error)]
                ])
                .put(createArticleActions.createArticleFailed({error}))
                .dispatch(createArticleActions.createArticleRequest({ title: 'new article title'}))
                .silentRun()
                .then(result => {

                    const articleCreateState: IArticleCreateState = result.storeState.articleCreate;

                    expect(articleCreateState).toEqual({
                        isPopupOpen: false,
                        isCreating: false,
                        createArticleServerError: error
                    });
                });
    });

    it('creates article and updates store', () => {


        const newListArticle = {
            articleId: createdArticle.articleId,
            ownerUserId: createdArticle.ownerUserId,
            createdTimestamp:createdArticle.createdTimestamp,
            published: createdArticle.published,
            title: createdArticle.title
        };

        initialStoreState.articleList = {...initialStoreState.articleList, ...{ articles: articleList }};
        
        return expectSaga(watchCreateArticleSaga)
                .withReducer(createRootReducer(), initialStoreState)
                .provide([
                    [matchers.call.fn(createArticle), createdArticle]
                ])
                .put(createArticleActions.createArticleSuccess(createdArticle))
                .put(articleDetailsActions.setLoadedArticle(createdArticle))
                .put(createArticleActions.setCreateArticlePopupVisibility(false))
                .put(articleListActions.addArticleToList(newListArticle))
                .put(push(`/article-details/${createdArticle.articleId}`))
                .dispatch(createArticleActions.createArticleRequest({ title: 'new article title'}))
                .silentRun()
                .then(result => {
                    const articleCreateState: IArticleCreateState = result.storeState.articleCreate;
                    const articleDetailsState: IArticleDetailsState = result.storeState.articleDetails;
                    const articleListState: IArticleListState = result.storeState.articleList;

                    expect(articleCreateState).toEqual({
                        isPopupOpen: false,
                        isCreating: false,
                        createArticleServerError: null
                    });

                    expect(articleDetailsState).toEqual({
                        loadedArticle: createdArticle,
                        isLoading: false,
                        isSaving: false,
                        serverError: null
                    });

                    expect(articleListState).toEqual({
                        articles: [createdArticle, ...articleList],
                        isLoading: false,
                        error: null
                    });
                })


    })
});
