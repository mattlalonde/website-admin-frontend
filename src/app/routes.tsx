import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from '../features/home/HomePage';
import { ArticleListPage } from '../features/articles/list/ArticleListPage';
import { ArticleDetailsPage } from '../features/articles/details/ArticleDetailsPage';
import { TagListPage } from '../features/tags/list/TagListPage';
import { TagDetailsPage } from '../features/tags/details/TagDetailsPage';

const Routes: FunctionComponent = () => (
    <>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/articles" component={ArticleListPage} />
            <Route path="/article-details/:id" component={ArticleDetailsPage} />

            <Route path="/tags" component={TagListPage} />
            <Route path='/tag-details/:id' component={TagDetailsPage} />

            <Route component={() => <div>Not Found</div>} />
        </Switch>
    </>
)

export default Routes;