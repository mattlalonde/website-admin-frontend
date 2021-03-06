import React, { FunctionComponent, useEffect } from 'react';
import { Store } from 'redux';
import { History } from 'history';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { RootState } from './store';
import Routes from './routes';

import './App.css';
import { Container } from '@material-ui/core';
import { NavBar } from '../components/NavBar/NavBar';
import { theme } from './theme';
import { GlobalError } from '../features/errors/dialog/GlobalError';
import userActions from '../features/authorization/userActions';
import { LoggedInState } from '../features/authorization/login/LoggedInState';

interface IAppProps {
  store: Store<RootState>,
  history: History
}

const AppContents: FunctionComponent = () => {

  const dispatch = useDispatch();
  const loggedInState = useSelector((state: RootState) => state.authorization.login.loggedInState);

  useEffect(() => {
    dispatch(userActions.tryInitUserRequest());
  }, [dispatch]);

  if(loggedInState === LoggedInState.InitialisingApp) {
    return <div>initialising</div>
  }

  return (
    <>
      <NavBar />
      <Container maxWidth="lg">
        <Routes />
      </Container>
    </>
  )
}

const App : FunctionComponent<IAppProps> = ({store, history}) => {

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <AppContents />
            <GlobalError />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
