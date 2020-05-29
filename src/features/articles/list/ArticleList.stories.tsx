import React from 'react';
import StoryRouter from 'storybook-react-router';

import { ArticleList } from './ArticleList';
import listData from '../__mockData__/list.json';
import initialStoreState from '../../../app/initialStoreStateTesting';
import { Provider } from 'react-redux';
import { createStoreWithState } from '../../../testUtils/store';

const state = Object.assign(initialStoreState, {
    entities: listData.entities,
    tagsUi: {
        listResult: listData.result
    }
});

export default {
    component: ArticleList,
    title: 'Article List',
    decorators: [StoryRouter()]
}

export const Default = () => {
    return (
        <Provider store={createStoreWithState(state)}>
            <ArticleList  orderedArticleIds={listData.result} isLoading={false} />
        </Provider>
    )
}

export const Loading = () => {
    return (
        <Provider store={createStoreWithState(state)}>
            <ArticleList orderedArticleIds={[]} isLoading={true} /> 
        </Provider>
    )
}