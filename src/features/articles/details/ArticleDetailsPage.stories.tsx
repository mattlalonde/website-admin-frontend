import React from 'react';
import StoryRouter from 'storybook-react-router';

import { ArticleDetailsPage } from './ArticleDetailsPage';

import { createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router';
import { createStoreWithState } from '../../../testUtils/store';
import initialStoreState from '../../../app/initialStoreStateTesting';
import articleList from '../__mockData__/list.json';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const path = `/route/:id`;

const matchProps: match<{ id: string }> = {
    isExact: false,
    path,
    url: path.replace(':id', '4bb9fcc6-91d6-43d2-9696-9c57bce51b9b'),
    params: { id: "14bb9fcc6-91d6-43d2-9696-9c57bce51b9b" }
};

const location = createLocation(matchProps.url);

const state = Object.assign(initialStoreState, {
    entities: articleList.entities
});

export default {
    component: ArticleDetailsPage,
    title: 'Edit Article Page',
    decorators: [StoryRouter()]
}

export const Default = () => {
    return (
        <Provider store={createStoreWithState(state)}>
            <ArticleDetailsPage history={history} location={location} match={matchProps} />
        </Provider>
        
    )
}
