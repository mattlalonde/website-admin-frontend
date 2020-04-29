import React from 'react';
import StoryRouter from 'storybook-react-router';

import { ArticleList } from './ArticleList';
import articleList from '../__mockData__/list.json';
import { IArticleListItem } from '../models';

export default {
    component: ArticleList,
    title: 'Article List',
    decorators: [StoryRouter()]
}

export const Default = () => {
    return <ArticleList articles={articleList as Array<IArticleListItem>} isLoading={false} />
}

export const Loading = () => {
    return <ArticleList articles={[]} isLoading={true} /> 
}