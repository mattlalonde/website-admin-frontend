import { createSelector } from '@reduxjs/toolkit';
import memoize from 'lodash.memoize';
import { RootState } from '../app/store';

const articlesSelector = (state: RootState) => state?.entities?.articles;

export const getArticleById = (articleId: string) => (state: RootState) => state?.entities?.articles[articleId];

export const articleListByIdSelector = createSelector(
    articlesSelector,
    articles => memoize(
        (articleIds: Array<string>) => articleIds.map(id => articles[id]) 
    )
);