import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { push } from 'connected-react-router';

import createRootReducer from '../../../app/rootReducer'; 
import * as createArticleActions from './articleCreateSlice';
import * as articleDetailsActions from '../details/articleDetailsSlice';
import * as articleListActions from '../list/articleListSlice';
import { watchCreateArticleSaga } from './createArticleSaga';
import { createArticle } from '../api';
import { IArticleCreateState } from './articleCreateSlice';
import { IArticleDetailsState } from '../details/articleDetailsSlice';
import { IArticleListState } from '../list/articleListSlice';
import initialStoreState from '../../../app/initialStoreStateTesting';

import createdArticle from '../__mockData__/createdArticle.json';
import articleList from '../__mockData__/list.json';
import { IArticleListItem, IArticle } from '../models';
import { ArticleDetailsProcessingState } from '../details/ArticleDetailsProcessingState';

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


        const newListArticle : IArticleListItem = {
            id: createdArticle.id,
            ownerUserId: createdArticle.ownerUserId,
            createdTimestamp:createdArticle.createdTimestamp,
            state: createdArticle.state,
            title: createdArticle.title
        } as IArticleListItem;

        initialStoreState.articleList = {...initialStoreState.articleList, ...{ articles: articleList as Array<IArticleListItem> }};
        
        return expectSaga(watchCreateArticleSaga)
                .withReducer(createRootReducer(), initialStoreState)
                .provide([
                    [matchers.call.fn(createArticle), createdArticle]
                ])
                .put(createArticleActions.createArticleSuccess(createdArticle as IArticle))
                .put(articleDetailsActions.setLoadedArticle(createdArticle as IArticle))
                .put(createArticleActions.setCreateArticlePopupVisibility(false))
                .put(articleListActions.addArticleToList(newListArticle))
                .put(push(`/article-details/${createdArticle.id}`))
                .dispatch(createArticleActions.createArticleRequest({ title: 'new article title'}))
                .silentRun()
                .then(result => {
                    const articleCreateState: IArticleCreateState = result.storeState.articleCreate;
                    const articleDetailsState: IArticleDetailsState = result.storeState.articleDetails;
                    const articleListState: IArticleListState = result.storeState.articleList;
                    const createdArticleListItem: IArticleListItem = {
                        id: createdArticle.id,
                        createdTimestamp: createdArticle.createdTimestamp,
                        ownerUserId: createdArticle.ownerUserId,
                        state: createdArticle.state,
                        title: createdArticle.title
                    } as IArticleListItem;

                    expect(articleCreateState).toEqual({
                        isPopupOpen: false,
                        isCreating: false,
                        createArticleServerError: null
                    });

                    expect(articleDetailsState).toEqual({
                        loadedArticle: createdArticle,
                        processingState: ArticleDetailsProcessingState.None
                    });

                    expect(articleListState).toEqual({
                        articles: [createdArticleListItem, ...articleList],
                        isLoading: false,
                        error: null
                    });
                })


    })
});
