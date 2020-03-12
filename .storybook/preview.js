import React from 'react';
import { addDecorator } from '@storybook/react';
import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../src/app/theme';
import 'typeface-roboto';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import createRootReducer from '../src/app/rootReducer';

const rootReducer = createRootReducer();
const store = createStore(rootReducer);

addDecorator(storyFn => (
            <Provider store={store}>
                <CssBaseline />
                <ThemeProvider theme={theme}>
                    <Container my={2}>
                        {storyFn()}
                    </Container>
                </ThemeProvider>
            </Provider>
        ));
