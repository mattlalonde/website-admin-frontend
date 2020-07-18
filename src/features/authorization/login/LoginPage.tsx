import React, { FunctionComponent } from 'react';
import { LoginForm } from './LoginForm';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

interface ILoginPageProps {}

export const LoginPage: FunctionComponent<ILoginPageProps> = (props) => {

    const { loggedInState } = useSelector((state: RootState) => state.authorization.login);

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item xs sm={6}>
                <h2>Login</h2>
            </Grid>
            <Grid item xs sm={6}>
                <LoginForm processingState={loggedInState} />
            </Grid>
        </Grid>
        
    )
}