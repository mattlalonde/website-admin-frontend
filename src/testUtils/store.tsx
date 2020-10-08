import React from 'react';
import { Provider } from "react-redux";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createRootReducer from '../app/rootReducer';
import { render } from "@testing-library/react";

const middleware = [...getDefaultMiddleware({ thunk: false })];

const rootReducer = createRootReducer();

const createStoreWithState = (state: any) => {
    return configureStore({
        reducer: rootReducer,
        devTools: true,
        middleware,
        preloadedState: state
    });
}

export const createTestUiWithProviders = (ui, reduxState = {}) => {
    return <Provider store={createStoreWithState(reduxState)}>{ui}</Provider>
}

/* export const renderTestUiWithProviders = (ui, reduxState = {}) => {
    return render(createTestUiWithProviders(ui, reduxState));
} */

export const renderTestUiWithProviders = (ui, reduxState = {}) => {
    return render(createTestUiWithProviders(ui, reduxState));
}
