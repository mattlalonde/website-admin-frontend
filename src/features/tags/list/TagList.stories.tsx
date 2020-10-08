import React from 'react';
import StoryRouter from 'storybook-react-router';

import { TagList } from './TagList';
import tagList from '../__mockData__/tagList.json';
import { createTestUiWithProviders } from '../../../testUtils/store';
import initialStoreState from '../../../app/initialStoreStateTesting';



export default {
    component: TagList,
    title: 'Tag List',
    decorators: [StoryRouter()]
}

export const Default = () => {
    const state = Object.assign(initialStoreState, {
        entities: {
            tags: tagList.entities.tags
        },
        tagsUi: {
            listResult: tagList.result
        }
    });
    
    return createTestUiWithProviders(<TagList orderedTagIds={tagList.result as Array<string>} isLoading={false} />, state)
}

export const Loading = () => {
    return <TagList orderedTagIds={[]} isLoading={true} /> 
}