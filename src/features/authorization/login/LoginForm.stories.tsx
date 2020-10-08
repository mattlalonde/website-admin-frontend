import React from 'react';

import { LoginForm } from './LoginForm';
import { createTestUiWithProviders } from '../../../testUtils/store';
import { LoggedInState } from './LoggedInState';

export default {
    component: LoginForm,
    title: 'Login Form',
    decorators: [story => createTestUiWithProviders(story())]
}

export const Default = () => {
    return <LoginForm processingState={LoggedInState.LoggedOut} />
}

export const LoggingIn = () => {
    return <LoginForm processingState={LoggedInState.LoggingIn} />
}