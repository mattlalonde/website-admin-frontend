import React from 'react';
import StoryRouter from 'storybook-react-router';

import { ArticleList } from './ArticleList';
import listData from '../__mockData__/list.json';
import initialStoreState from '../../../app/initialStoreStateTesting';
import { createTestUiWithProviders } from '../../../testUtils/store';



export default {
    component: ArticleList,
    title: 'Article List',
    decorators: [StoryRouter()]
}

export const Default = () => {
    const state = Object.assign(initialStoreState, {
        entities: listData.entities,
        articlesUi: {
            list: {
                listResult: listData.result
            }
        }
    });
    
    return createTestUiWithProviders(<ArticleList orderedArticleIds={listData.result} isLoading={false} />, state);
}

export const Loading = () => {
    return <ArticleList orderedArticleIds={[]} isLoading={true} /> 
}