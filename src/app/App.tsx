import React, { FunctionComponent } from 'react';
import { Store } from 'redux'
import { History } from 'history'
import { Provider } from 'react-redux';
import { RootState } from './rootReducer';

import './App.css';

import { ArticleListPage } from '../features/articles/list/ArticleListPage';

interface IAppProps {
  store: Store<RootState>,
  history: History
}

const App : FunctionComponent<IAppProps> = ({store, history}) => {


  return (
    <ArticleListPage />
  );
}

export default App;
