import React from 'react';

import { LoginForm } from './LoginForm';
import { Provider } from 'react-redux';
import { createStoreWithState } from '../../../testUtils/store';
import { LoggedInState } from './LoggedInState';

export default {
    component: LoginForm,
    title: 'Login Form',
    decorators: [story => <Provider store={createStoreWithState({})}>{story()}</Provider>]
}

export const Default = () => {
    return <LoginForm processingState={LoggedInState.LoggedOut} />
}

export const LoggingIn = () => {
    return <LoginForm processingState={LoggedInState.LoggingIn} />
}