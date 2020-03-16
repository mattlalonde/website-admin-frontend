import createRootReducer from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = createRootReducer();

const store = configureStore({
    reducer: rootReducer
});

export default store.getState();