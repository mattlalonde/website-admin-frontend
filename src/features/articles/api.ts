import createdArticle from './__mockData__/createdArticle.json';
import loadedArticle from './__mockData__/loadArticle.json';
import articleList from './__mockData__/list.json';

import { IArticle, IArticleListItem } from './models';


export const createArticle = (articleId: string): Promise<IArticle> => {
    return new Promise((resolve, reject) => {
        
        setTimeout(() => {
            resolve(createdArticle);
        }, 500);
        
    });
}

export const loadArticle = (articleId: string): Promise<IArticle> => {
    return new Promise((resolve, reject) => {
        
        setTimeout(() => {
            resolve(loadedArticle);
        }, 500);
        
    });
}

export const loadArticles = (): Promise<Array<IArticleListItem>> => {
    return new Promise((resolve, reject) => {
        
        setTimeout(() => {
            resolve(articleList);
        }, 500);
        
    });
}