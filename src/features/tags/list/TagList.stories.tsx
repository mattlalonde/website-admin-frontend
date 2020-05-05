import React from 'react';
import StoryRouter from 'storybook-react-router';

import { TagList } from './TagList';
import tagList from '../__mockData__/tagList.json';
import { ITag } from '../models';

export default {
    component: TagList,
    title: 'Tag List',
    decorators: [StoryRouter()]
}

export const Default = () => {
    return <TagList tags={tagList as Array<ITag>} isLoading={false} />
}

export const Loading = () => {
    return <TagList tags={[]} isLoading={true} /> 
}