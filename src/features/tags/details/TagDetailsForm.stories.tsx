import React from 'react';

import { TagDetailsForm } from './TagDetailsForm';
import { ITag } from '../models';
import { TagDetailsProcessingState } from './TagDetailsProcessingState';

import tag from '../__mockData__/tag.json';
import { createTestUiWithProviders } from '../../../testUtils/store';

export default {
    component: TagDetailsForm,
    title: 'Tag Details Form',
    decorators: [story => createTestUiWithProviders(story())]
}

export const Loading = () => {
    return <TagDetailsForm tag={null} processingState={TagDetailsProcessingState.Loading} />
}

export const Details = () => {
    return <TagDetailsForm tag={tag as ITag} processingState={TagDetailsProcessingState.None} />
}

export const Updating = () => {
    return <TagDetailsForm tag={tag as ITag} processingState={TagDetailsProcessingState.Updating} />
}