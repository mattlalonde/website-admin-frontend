import React from 'react';
import { action } from '@storybook/addon-actions';

import { ArticlePublishingForm } from './ArticlePublishingForm';
import draftArticle from '../__mockData__/draftArticle.json';
import publishedArticle from '../__mockData__/publishedArticle.json';
import { IArticle } from '../models';
import { ArticleDetailsProcessingState } from './ArticleDetailsProcessingState';
import { addDays } from 'date-fns';
import { createStoreWithState } from '../../../testUtils/store';
import { Provider } from 'react-redux';

export default {
    component: ArticlePublishingForm,
    title: 'Article Publishing Form',
    decorators: [story => <Provider store={createStoreWithState({})}>{story()}</Provider>]
}

export const NotPublished = () => {
    return <ArticlePublishingForm article={draftArticle as IArticle} processingState={ArticleDetailsProcessingState.None}></ArticlePublishingForm>
}

export const Publishing = () => {
    return <ArticlePublishingForm article={draftArticle as IArticle} processingState={ArticleDetailsProcessingState.Publishing}></ArticlePublishingForm>
}

export const Published = () => {
    return <ArticlePublishingForm article={publishedArticle as IArticle} processingState={ArticleDetailsProcessingState.None}></ArticlePublishingForm>
}

export const PublishedInFuture = () => {

    const futurePublishedArticle = { ...publishedArticle, ...{ publicationDate: addDays(new Date(), 2).toISOString()}}

    return <ArticlePublishingForm article={futurePublishedArticle as IArticle} processingState={ArticleDetailsProcessingState.None}></ArticlePublishingForm>
}

export const TakingOffline = () => {
    return <ArticlePublishingForm article={publishedArticle as IArticle} processingState={ArticleDetailsProcessingState.TakingOffline}></ArticlePublishingForm>
}

