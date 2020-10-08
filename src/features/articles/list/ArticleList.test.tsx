import React from 'react';
import { render, screen, waitFor } from '../../../testUtils';
import { ArticleList } from './ArticleList';

import initialStoreState from '../../../app/initialStoreStateTesting';
import articleList from '../__mockData__/list.json';

describe('Article List', () => {

    it('Displays loading indicator when loading', async () => {
        render(<ArticleList orderedArticleIds={[]} isLoading={true} />);

        await waitFor(() => expect(screen.queryAllByTestId('list-loading-skeleton').length).toBeGreaterThanOrEqual(1));
    });

    it('Displays message when there is no content', () => {
        render(<ArticleList orderedArticleIds={[]} isLoading={false} />);

        expect(screen.getByText('There are no articles')).toBeInTheDocument();
    });

    it('Displays list of articles from store', () => {
        const mockState = Object.assign(initialStoreState, {
            entities: articleList.entities
        });

        render(<ArticleList orderedArticleIds={articleList.result} isLoading={false} />, {
            initialState: mockState
        });

        articleList.result.forEach(articleId => {
            expect(screen.getByText(articleList.entities.articles[articleId].title)).toBeInTheDocument();
        });
    });
});