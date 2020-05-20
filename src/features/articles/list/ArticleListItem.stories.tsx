import React from 'react';
import StoryRouter from 'storybook-react-router';

import { ArticleListItem } from './ArticleList';
import articleListData from '../__mockData__/list.json';
import { IArticleListItem } from '../models';

export default {
    component: ArticleListItem,
    title: 'Article List Item',
    decorators: [StoryRouter()]
}

export const Default = () => {
    return <ArticleListItem article={articleListData.entities.articles[articleListData.result[0]] as IArticleListItem} tags={articleListData.entities.tags} />
}

