import React from 'react';

import { ArticleDetailsForm } from './ArticleDetailsForm';
import article from '../__mockData__/loadArticle.json';

export default {
    component: ArticleDetailsForm,
    title: 'Article Details Form'
}

export const Default = () => {
    return <ArticleDetailsForm articleContent={article} isSaving={false} isLoading={false} />;
}

export const Saving = () => {
    return <ArticleDetailsForm articleContent={article} isSaving={true} isLoading={false} />;
}

export const Loading = () => {
    return <ArticleDetailsForm articleContent={article} isSaving={false} isLoading={true} />;
}