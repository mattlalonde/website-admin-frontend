import React from 'react';
import StoryRouter from 'storybook-react-router';

import { ArticleDetailsPage } from './ArticleDetailsPage';

import { createStoreWithState } from '../../../testUtils/store';
import initialStoreState from '../../../app/initialStoreStateTesting';
import articleList from '../__mockData__/list.json';
import { Provider } from 'react-redux';

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
            <ArticleDetailsPage />
        </Provider>
        
    )
}
