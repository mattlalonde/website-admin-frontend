import React from 'react';

import { ArticleDetailsForm } from './ArticleDetailsForm';
import draftArticle from '../__mockData__/draftArticle.json';
import deletedArticle from '../__mockData__/deletedArticle.json';
import publishedArticle from '../__mockData__/publishedArticle.json';
import { IArticle } from '../models';
import { ArticleDetailsProcessingState } from './ArticleDetailsProcessingState';
import { createStoreWithState } from '../../../testUtils/store';
import { Provider } from 'react-redux';

export default {
    component: ArticleDetailsForm,
    title: 'Article Details Form',
    decorators: [story => <Provider store={createStoreWithState({})}>{story()}</Provider>]
}

export const Loading = () => {
    return <ArticleDetailsForm article={draftArticle as IArticle} processingState={ArticleDetailsProcessingState.Loading} />;
}

export const DraftArticle = () => {
    return <ArticleDetailsForm article={draftArticle as IArticle} processingState={ArticleDetailsProcessingState.None} />;
}

export const Updating = () => {
    return <ArticleDetailsForm article={draftArticle as IArticle} processingState={ArticleDetailsProcessingState.Updating} />;
}

export const Deleting = () => {
    return <ArticleDetailsForm article={draftArticle as IArticle} processingState={ArticleDetailsProcessingState.Deleting} />;
}

export const DeletedArticle = () => {
    return <ArticleDetailsForm article={deletedArticle as IArticle} processingState={ArticleDetailsProcessingState.None} />;
}

export const Reinstating = () => {
    return <ArticleDetailsForm article={deletedArticle as IArticle} processingState={ArticleDetailsProcessingState.Reinstating} />;
}

export const PublishedArticle = () => {
    return <ArticleDetailsForm article={publishedArticle as IArticle} processingState={ArticleDetailsProcessingState.None} />;
}