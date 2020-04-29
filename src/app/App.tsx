import React, { FunctionComponent } from 'react';
import { Store } from 'redux';
import { History } from 'history';
import { Provider } from 'react-redux';
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
import { GlobalError } from '../components/GlobalError/GlobalError';



interface IAppProps {
  store: Store<RootState>,
  history: History
}

const App : FunctionComponent<IAppProps> = ({store, history}) => {


  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <NavBar />
            <Container maxWidth="lg">
              <Routes />
            </Container>
            <GlobalError />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
