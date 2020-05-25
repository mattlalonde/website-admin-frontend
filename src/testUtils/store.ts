import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createRootReducer from '../app/rootReducer';

const middleware = [...getDefaultMiddleware({ thunk: false })];

const rootReducer = createRootReducer();

export const createStoreWithState = (state: any) => {
    return configureStore({
        reducer: rootReducer,
        devTools: true,
        middleware,
        preloadedState: state
    });
}
