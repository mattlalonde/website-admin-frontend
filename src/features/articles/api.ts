import createdArticle from './__mockData__/createdArticle.json';
import loadedArticle from './__mockData__/loadArticle.json';
import articleList from './__mockData__/list.json';

import { IArticle, IArticleListItem, IUpdateArticleContentRequest } from './models';


export const createArticle = (articleId: string): Promise<IArticle> => {
    return new Promise((resolve, reject) => {
        
        setTimeout(() => {
            resolve(createdArticle);
        }, 1000);
        
    });
}

export const loadArticle = (articleId: string): Promise<IArticle> => {
    return new Promise((resolve, reject) => {
        
        setTimeout(() => {
            resolve(loadedArticle);
        }, 1000);
        
    });
}

export const loadArticles = (): Promise<Array<IArticleListItem>> => {
    return new Promise((resolve, reject) => {
        
        setTimeout(() => {
            resolve(articleList);
        }, 1000);
        
    });
}

export const updateArticleContent = (request: IUpdateArticleContentRequest): Promise<IArticle> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({...loadedArticle, ...request} as IArticle);
        }, 1000);
    });
}