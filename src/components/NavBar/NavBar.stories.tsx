import React from 'react';
import StoryRouter from 'storybook-react-router';
import { createTestUiWithProviders } from '../../testUtils/store';

import { NavBar } from './NavBar';

export default {
    title: 'NavBar',
    component: NavBar,
    decorators: [StoryRouter(), story => createTestUiWithProviders(story())]
}

export const Default = () => {
    return <NavBar />;
}