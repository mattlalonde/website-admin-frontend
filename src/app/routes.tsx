import React, { FunctionComponent } from 'react'
import { Route, Switch } from 'react-router-dom'

import { HomePage } from '../features/home/HomePage';
import { ArticleListPage } from '../features/articles/list/ArticleListPage';
import { EditArticlePage } from '../features/articles/details/EditArticlePage';

const Routes: FunctionComponent = () => (
    <>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/articles" component={ArticleListPage} />
            <Route path="/article-details/:id" component={EditArticlePage} />
            <Route component={() => <div>Not Found</div>} />
        </Switch>
    </>
)

export default Routes;