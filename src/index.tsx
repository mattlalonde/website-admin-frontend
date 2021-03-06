import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';

import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

import store, { history } from './app/store';

const render = () => {
    ReactDOM.render(
      <App history={history} store={store} />,
      document.getElementById('root')
    )
  }
  
  render()
  
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./app/App', render)
  }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
