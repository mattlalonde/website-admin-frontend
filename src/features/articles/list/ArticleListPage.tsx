import React, { FunctionComponent, useEffect } from 'react';


import { loadArticlesRequest, IArticleListItem } from './articleListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';

interface IArticleListProps {
    articles: Array<IArticleListItem>;
}

const ArticleList = ({articles}: IArticleListProps) => {
    const renderedItems = articles && articles.length > 0 ? articles.map(article => (
        <div key={article.articleId}> 
            <h1>{article.title}</h1>
        </div>
        
    )) : <div>empty list</div>;
    return <>
                {renderedItems}
            </>
}

export const ArticleListPage: FunctionComponent = () => {

    const dispatch = useDispatch();
    const { articles, isLoading, error } = useSelector(
        (state: RootState) => state.articleList
    );

    useEffect(() => {
        dispatch(loadArticlesRequest());
    }, [dispatch]);

    if(isLoading) {
        return (<div>loading...</div>)
    }
    else if(error) {
        return (<div>error: {error}</div>)
    }

    return (
        <ArticleList articles={articles} />
    )
}


