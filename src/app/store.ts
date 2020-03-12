import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './rootReducer';
import rootSaga from './rootSaga';

const devMode = process.env.NODE_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

const middleware = [...getDefaultMiddleware({ thunk: false }), routerMiddleware(history), sagaMiddleware];

if (devMode) {
  middleware.push(logger);
}
const rootReducer = createRootReducer(history);

const store = configureStore({
    reducer: rootReducer,
    devTools: devMode,
    middleware
});

sagaMiddleware.run(rootSaga);

if (devMode && module.hot) {
    module.hot.accept('./rootReducer', () => {
      const newRootReducer = require('./rootReducer').default
      store.replaceReducer(newRootReducer)
    })
  }
  
  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof rootReducer>;

  export default store;
