import React from 'react';
import StoryRouter from 'storybook-react-router';

import { NavBar } from './NavBar';

export default {
    title: 'NavBar',
    component: NavBar,
    decorators: [StoryRouter()]
}

export const Default = () => {
    return <NavBar />;
}