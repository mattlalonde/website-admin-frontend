import React, { FunctionComponent } from 'react';
import { Store } from 'redux'
import { History } from 'history'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'

import { RootState } from './store';
import Routes from './routes';

import './App.css';



interface IAppProps {
  store: Store<RootState>,
  history: History
}

const App : FunctionComponent<IAppProps> = ({store, history}) => {


  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
