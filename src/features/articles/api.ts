import { IArticleListResponse, IArticleResponse } from './models';
import * as http from '../../utils/api/http';
import { ICreateArticleRequest, IUpdateArticleContentRequest, IDeleteArticleRequest, IReinstateArticleRequest, IPublishArticleRequest, ITakeArticleOfflineRequest, IAddTagToArticleRequest, IRemoveTagFromArticleRequest } from './apiRequests';

const root = "/api";


export const createArticle = async (request: ICreateArticleRequest) => {

    const response = await http.post<IArticleResponse>(`${root}/article/create`, request);
    return response;
}

export const loadArticle = async (articleId: string) => {

    const response = await http.get<IArticleResponse>(`${root}/article/${articleId}`);
    return response;
}

export const loadArticles = async () => {

    const response = await http.get<IArticleListResponse>(`${root}/article/all`);
    return response;
}

export const updateArticleContent = async (request: IUpdateArticleContentRequest) => {
    
    const response = await http.put<IArticleResponse>(`${root}/article/${request.id}/update`, request.data);
    return response;
}

export const deleteArticle = async(request: IDeleteArticleRequest) => {
    const response = await http.del<IArticleResponse>(`${root}/article/${request.id}`);
    return response;
}

export const reinstateArticle = async(request: IReinstateArticleRequest) => {
    const response = await http.put<IArticleResponse>(`${root}/article/${request.id}/reinstate`);
    return response;
}

export const publishArticle = async (request: IPublishArticleRequest) => {
    const response = await http.put<IArticleResponse>(`${root}/article/${request.id}/publish`, request.data);
    return response;
}

export const takeArticleOffline = async (request: ITakeArticleOfflineRequest) => {
    const response = await http.put<IArticleResponse>(`${root}/article/${request.id}/takeoffline`);
    return response;
}

export const addTagToArticle = async (request: IAddTagToArticleRequest) => {
    const response = await http.put<IArticleResponse>(`${root}/article/${request.id}/addtag`, request.data);
    return response;
}

export const removeTagFromArticle = async (request: IRemoveTagFromArticleRequest) => {
    const response = await http.put<IArticleResponse>(`${root}/article/${request.id}/removetag`, request.data);
    return response;
}