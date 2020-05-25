import { IArticle, IArticleListResponse } from './models';
import * as http from '../../utils/http';
import { ICreateArticleRequest, IUpdateArticleContentRequest, IDeleteArticleRequest, IReinstateArticleRequest, IPublishArticleRequest, ITakeArticleOfflineRequest, IAddTagToArticleRequest, IRemoveTagFromArticleRequest } from './apiRequests';
import { ApiError } from '../../errors/ApiError';

const root = "/api";


export const createArticle = async (request: ICreateArticleRequest) => {

    const response = await http.post<IArticle>(`${root}/article/create`, request);
    
    if(response.parsedBody) {
        return response.parsedBody;
    }
    
    throw ApiError.create('API_ERROR', 'Unable to create article');
}

export const loadArticle = async (articleId: string) => {

    const response = await http.get<IArticle>(`${root}/article/${articleId}`);

    if(response.parsedBody) {
        return response.parsedBody;
    }

    throw ApiError.create('API_ERROR', 'Unable to find article');
}

export const loadArticles = async () => {

    const response = await http.get<IArticleListResponse>(`${root}/article/all`);

    if(response.parsedBody) {
        return response.parsedBody;
    }

    throw ApiError.create('API_ERROR', 'Unable to find articles');
}

export const updateArticleContent = async (request: IUpdateArticleContentRequest) => {
    
    const response = await http.put<IArticle>(`${root}/article/${request.id}/update`, request.data);

    if(response.parsedBody) {
        return response.parsedBody;
    }

    throw ApiError.create('API_ERROR', 'No article was returned, please refresh the page to make sure the article was updated.');
}

export const deleteArticle = async(request: IDeleteArticleRequest) => {
    const response = await http.del<IArticle>(`${root}/article/${request.id}`);

    if(response.parsedBody) {
        return response.parsedBody;
    }

    throw ApiError.create('API_ERROR', 'No article was returned, please refresh the page to ensure the article state has been updated.');
}

export const reinstateArticle = async(request: IReinstateArticleRequest) => {
    const response = await http.put<IArticle>(`${root}/article/${request.id}/reinstate`);

    if(response.parsedBody) {
        return response.parsedBody;
    }

    throw ApiError.create('API_ERROR', 'No article was returned, please refresh the page to ensure the article state has been updated.');
}

export const publishArticle = async (request: IPublishArticleRequest) => {
    const response = await http.put<IArticle>(`${root}/article/${request.id}/publish`, request.data);

    if(response.parsedBody) {
        return response.parsedBody;
    }

    throw ApiError.create('API_ERROR', 'No article was returned, please refresh the page to ensure the article state has been updated.');
}

export const takeArticleOffline = async (request: ITakeArticleOfflineRequest) => {
    const response = await http.put<IArticle>(`${root}/article/${request.id}/takeoffline`);

    if(response.parsedBody) {
        return response.parsedBody;
    }

    throw ApiError.create('API_ERROR', 'No article was returned, please refresh the page to ensure the article state has been updated.');
}

export const addTagToArticle = async (request: IAddTagToArticleRequest) => {
    const response = await http.put<IArticle>(`${root}/article/${request.id}/addtag`, request.data);

    if(response.parsedBody) {
        return response.parsedBody;
    }

    throw ApiError.create('API_ERROR', 'No article was returned, please refresh the page to ensure the article state has been updated.');
}

export const removeTagFromArticle = async (request: IRemoveTagFromArticleRequest) => {
    const response = await http.put<IArticle>(`${root}/article/${request.id}/removetag`, request.data);

    if(response.parsedBody) {
        return response.parsedBody;
    }

    throw ApiError.create('API_ERROR', 'No article was returned, please refresh the page to ensure the article state has been updated.');
}