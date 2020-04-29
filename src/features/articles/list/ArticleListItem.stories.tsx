import React from 'react';
import StoryRouter from 'storybook-react-router';

import { ArticleListItem } from './ArticleList';
import articleList from '../__mockData__/list.json';
import { IArticleListItem } from '../models';

export default {
    component: ArticleListItem,
    title: 'Article List Item',
    decorators: [StoryRouter()]
}

export const Default = () => {
    return <ArticleListItem article={articleList[0] as IArticleListItem} />
}

