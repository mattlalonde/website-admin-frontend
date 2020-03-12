import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadArticlesRequest } from './articleListSlice';
import { RootState } from '../../../app/store';
import { ArticleList } from './ArticleList';

export const ArticleListPage: FunctionComponent = () => {

    const dispatch = useDispatch();
    const { articles, isLoading, error } = useSelector(
        (state: RootState) => state.articleList
    );

    useEffect(() => {
        if(!articles.length) {
            dispatch(loadArticlesRequest());
        }
    }, [dispatch, articles]);

    if(error) {
        return (<div>error: {error}</div>)
    }

    return (
        <ArticleList articles={articles} isLoading={isLoading} />
    )
}


