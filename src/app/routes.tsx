import React, { FunctionComponent } from 'react';
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';

import { HomePage } from '../features/home/HomePage';
import { ArticleListPage } from '../features/articles/list/ArticleListPage';
import { ArticleDetailsPage } from '../features/articles/details/ArticleDetailsPage';
import { TagListPage } from '../features/tags/list/TagListPage';
import { TagDetailsPage } from '../features/tags/details/TagDetailsPage';
import { LoginPage } from '../features/authorization/login/LoginPage';
import { RootState } from './store';
import { LoggedInState } from '../features/authorization/login/LoggedInState';
import { useSelector } from 'react-redux';

interface PrivateRouteProps extends RouteProps {
    authed: boolean;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({children, authed, ...rest}) => {
    return (
        <Route
            {...rest}
            render={({ location }) => authed === true
                ? children
                : <Redirect to={{pathname: '/login', state: {from: location}}} />}
        />
    )
}

const Routes: FunctionComponent = () => {

    const { loggedInState } = useSelector((state: RootState) => state.authorization.login);
    const authed = loggedInState === LoggedInState.LoggedIn;

    return (
        <>
            <Switch>
                <PrivateRoute exact path="/" authed={authed}>
                    <HomePage />
                </PrivateRoute>
                <PrivateRoute path="/articles" authed={authed}>
                    <ArticleListPage />
                </PrivateRoute>
                <PrivateRoute path="/article-details/:id" authed={authed}>
                    <ArticleDetailsPage /> 
                </PrivateRoute>

                <PrivateRoute path="/tags" authed={authed}>
                    <TagListPage />
                </PrivateRoute>
                <PrivateRoute path='/tag-details/:id' authed={authed}>
                    <TagDetailsPage />
                </PrivateRoute>

                <Route path="/login">
                    <LoginPage />
                </Route>

                <Route component={() => <div>Not Found</div>} />
            </Switch>
        </>
    )
}

export default Routes;