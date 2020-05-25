import React from 'react';
import StoryRouter from 'storybook-react-router';
import { Provider } from 'react-redux';

import { TagList } from './TagList';
import tagList from '../__mockData__/tagList.json';
import { createStoreWithState } from '../../../testUtils/store';

const state = {
    tags: {
        listResult: tagList.result
    },
    entities: {
        tags: tagList.entities.tags
    }
};

export default {
    component: TagList,
    title: 'Tag List',
    decorators: [StoryRouter()]
}

export const Default = () => {
    return (
        <Provider store={createStoreWithState(state)}>
            <TagList orderedTagIds={tagList.result as Array<string>} isLoading={false} />
        </Provider>
        
    )
}

export const Loading = () => {
    return <TagList orderedTagIds={[]} isLoading={true} /> 
}