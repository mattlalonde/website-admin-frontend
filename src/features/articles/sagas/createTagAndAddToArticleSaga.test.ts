import { expectSaga } from 'redux-saga-test-plan';
import { watchCreateTagAndAddToArticleSaga } from './createTagAndAddToArticleSaga';
import createRootReducer from '../../../app/rootReducer'; 
import articleActions from '../articleActions';
import tagActions from '../../tags/tagActions';
import { RootState } from '../../../app/store';
import initialStoreState from '../../../app/initialStoreStateTesting';
import draftArticle from '../__mockData__/draftArticle.json';
import tag from '../__mockData__/tag.json';
import { ArticleDetailsProcessingState } from '../details/ArticleDetailsProcessingState';

describe('create tag and add to article saga', () => {

    it('close popup should cancel action', () => {
        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticle.id]: draftArticle
                }
            }
        });

        return expectSaga(watchCreateTagAndAddToArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .put(tagActions.openCreateTagPopup({
                    contentName: draftArticle.title,
                    createTagName: tag.name
                }))
                .put(articleActions.createTagAndAddToArticleFailed())
                .dispatch(articleActions.createTagAndAddToArticleRequest({
                    id: draftArticle.id,
                    data: {
                        tagName: tag.name
                    }
                }))
                .dispatch(tagActions.closeCreateTagPopup())
                .silentRun()
                .then(result => {
                    const store: RootState = result.storeState;

                    expect(store.entities.articles[draftArticle.id]).toEqual(draftArticle);
                    expect(store.articlesUi.details.processingState).toEqual(ArticleDetailsProcessingState.None);
                });
    });

    it('create tag failure cancels action', () => {
        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticle.id]: draftArticle
                }
            }
        });

        return expectSaga(watchCreateTagAndAddToArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .put(tagActions.openCreateTagPopup({
                    contentName: draftArticle.title,
                    createTagName: tag.name
                }))
                .put(articleActions.createTagAndAddToArticleFailed())
                .dispatch(articleActions.createTagAndAddToArticleRequest({
                    id: draftArticle.id,
                    data: {
                        tagName: tag.name
                    }
                }))
                .dispatch(tagActions.createTagFailed())
                .silentRun()
                .then(result => {
                    const store: RootState = result.storeState;

                    expect(store.entities.articles[draftArticle.id]).toEqual(draftArticle);
                    expect(store.articlesUi.details.processingState).toEqual(ArticleDetailsProcessingState.None);
                });
    });

    it('creates tags and adds to article', () => {
        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticle.id]: draftArticle
                },
                tags: {}
            }
        });

        return expectSaga(watchCreateTagAndAddToArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .put(tagActions.openCreateTagPopup({
                    contentName: draftArticle.title,
                    createTagName: tag.name
                }))
                .put(articleActions.addTagToArticleRequest({
                    id: draftArticle.id,
                    data: {
                        tagId: tag.id
                    }
                }))
                .dispatch(articleActions.createTagAndAddToArticleRequest({
                    id: draftArticle.id,
                    data: {
                        tagName: tag.name
                    }
                }))
                .dispatch(tagActions.createTagSuccess(tag))
                .silentRun();
    });
});