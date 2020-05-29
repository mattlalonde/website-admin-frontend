import React from 'react';
import StoryRouter from 'storybook-react-router';

import { ArticleListItem } from './ArticleList';
import articleListData from '../__mockData__/list.json';
import initialStoreState from '../../../app/initialStoreStateTesting';
import { createStoreWithState } from '../../../testUtils/store';
import { Provider } from 'react-redux';

const state = Object.assign(initialStoreState, {
    entities: articleListData.entities,
    tagsUi: {
        listResult: articleListData.result
    }
});

export default {
    component: ArticleListItem,
    title: 'Article List Item',
    decorators: [StoryRouter()]
}

export const Default = () => {
    return (
        <Provider store={createStoreWithState(state)}>
            <ArticleListItem articleId={articleListData.result[0]} />
        </Provider>
    )
    
    
}

