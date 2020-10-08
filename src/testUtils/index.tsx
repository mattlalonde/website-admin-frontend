import React, { FunctionComponent, ReactNode } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Import your own reducer
import createRootReducer from '../app/rootReducer';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';


const rootReducer = createRootReducer();

function render(
  ui,
  {
    initialState = {},
    store = createStore(rootReducer, initialState),
    history = createMemoryHistory(),
    ...renderOptions
  } = {}
) {
  const Wrapper: FunctionComponent<{ children?: ReactNode }> = ({ children }) => {
    return <Provider store={store}>
              <Router history={history}>
                {children}
              </Router>
            </Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render, rootReducer }