import React from 'react';
import { render, rootReducer, screen } from '../../../testUtils';
import { ArticleListItem } from './ArticleListItem';
import { createStore } from 'redux';
import initialStoreState from '../../../app/initialStoreStateTesting';

import createdArticle from '../__mockData__/createdArticle.json';
import publishedArticle from '../__mockData__/publishedArticle.json';
import articleList from '../__mockData__/list.json';
import articleActions from '../articleActions';
import { IArticle } from '../models';
import { ITag } from '../../tags/models';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { articleDetailsLink } from '../articleLinks';

describe('Article List Item', () => {

    it('Renders article from store if present', () => {
        const mockState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [publishedArticle.id]: publishedArticle
                }
            }
       });
        const mockStore = createStore(rootReducer, mockState);
        mockStore.dispatch = jest.fn();

        render(<ArticleListItem articleId={publishedArticle.id} />, {
            store: mockStore
        });

        expect(screen.getByText(publishedArticle.title)).toBeInTheDocument();
        expect(screen.getByText(publishedArticle.precis)).toBeInTheDocument();
        expect(mockStore.dispatch).toHaveBeenCalledTimes(0);
    });

    it('Renders message id no precis in article', () => {
        const mockState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [createdArticle.id]: createdArticle
                }
            }
       });

        render(<ArticleListItem articleId={createdArticle.id} />, {
            initialState: mockState
        });

        expect(screen.getByText('no precis')).toBeInTheDocument();
    });

    it('Dispatched load action if article not in store', () => {
        const mockStore = createStore(rootReducer, {});
        mockStore.dispatch = jest.fn();

        render(<ArticleListItem articleId={createdArticle.id} />, {
            store: mockStore
        });

        expect(mockStore.dispatch).toHaveBeenCalledWith(articleActions.loadArticleRequest(createdArticle.id));
    });

    it('Renders nothing if no article', () => {
        render(<ArticleListItem articleId={createdArticle.id} />);

        expect(screen.queryByText(createdArticle.title)).not.toBeInTheDocument();
    });

    it('Renders all article tags', () => {
        const mockState = Object.assign(initialStoreState, {
            entities: articleList.entities
       });

        const testArticle: IArticle = articleList.entities.articles[Object.keys(articleList.entities.articles)[0]];
        const tags: Record<string, ITag> = articleList.entities.tags;

        if(!testArticle) fail('no article to test');
        if(!testArticle.tags || testArticle.tags.length === 0) fail('no tags to test in article');

        render(<ArticleListItem articleId={testArticle.id} />, {
            initialState: mockState
        });

        testArticle.tags.forEach(tagId => {
            expect(screen.getByText(tags[tagId].name)).toBeInTheDocument();
        });
    });

    it('Navigates to full article when clicked', () => {
        const history = createMemoryHistory();
        const mockState = Object.assign(initialStoreState, {
            entities: articleList.entities
        });

        const testArticle: IArticle = articleList.entities.articles[Object.keys(articleList.entities.articles)[0]];

        render(<ArticleListItem articleId={testArticle.id} />, {
            initialState: mockState,
            history: history
        });

        userEvent.click(screen.getByText(testArticle.title));
        expect(history.location.pathname).toBe(articleDetailsLink(testArticle));
    });
});