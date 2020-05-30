import { createSelector } from '@reduxjs/toolkit';
import memoize from 'lodash.memoize';
import { RootState } from '../app/store';

const tagSelector = (state: RootState) => state.entities.tags;

export const tagListByIdSelector = createSelector(
    tagSelector,
    tags => memoize(
        (tagIds: Array<string>) => tagIds.map(id => tags[id]) 
    )
);





