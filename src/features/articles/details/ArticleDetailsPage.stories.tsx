import React from 'react';
import StoryRouter from 'storybook-react-router';

import { ArticleDetailsPage } from './ArticleDetailsPage';

export default {
    component: ArticleDetailsPage,
    title: 'Edit Article Page',
    decorators: [StoryRouter()]
}

export const Default = () => {
    return <ArticleDetailsPage />;
}
