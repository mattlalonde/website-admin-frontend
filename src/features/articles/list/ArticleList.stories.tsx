import React from 'react';
import StoryRouter from 'storybook-react-router';

import { ArticleList } from './ArticleList';
import listData from '../__mockData__/list.json';
import { IArticleListItem, IArticleTag } from '../models';

export default {
    component: ArticleList,
    title: 'Article List',
    decorators: [StoryRouter()]
}

interface IEntityData {
    articles: Record<string, IArticleListItem>;
    tags: Record<string, IArticleTag>;
}

export const Default = () => {
    return <ArticleList entities={listData.entities as IEntityData} orderedArticleIds={listData.result} isLoading={false} />
}

export const Loading = () => {
    return <ArticleList entities={{ articles: {}, tags: {}}} orderedArticleIds={[]} isLoading={true} /> 
}