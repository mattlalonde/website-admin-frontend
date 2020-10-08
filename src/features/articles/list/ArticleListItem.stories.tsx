import React from 'react';
import StoryRouter from 'storybook-react-router';

import { ArticleListItem } from './ArticleListItem';
import articleListData from '../__mockData__/list.json';
import initialStoreState from '../../../app/initialStoreStateTesting';
import { createTestUiWithProviders } from '../../../testUtils/store';

export default {
    component: ArticleListItem,
    title: 'Article List Item',
    decorators: [StoryRouter()]
}

export const Default = () => {
    const state = Object.assign(initialStoreState, {
        entities: articleListData.entities,
        tagsUi: {
            list: {
                listResult: articleListData.result
            }
        }
    });

    return createTestUiWithProviders(<ArticleListItem articleId={articleListData.result[0]} />, state);
}

