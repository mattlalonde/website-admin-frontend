import { ITag, ITagListResponse } from './models';
import * as http from '../../utils/api/http';
import { ICreateTagRequest, IUpdateTagRequest, ISearchTagsRequest } from './apiRequests';

const root = '/api';

export const createTag = async (request: ICreateTagRequest) => {
    const response = await http.post<ITag>(`${root}/tag/create`, request);
    return response;
}

export const updateTag = async (request: IUpdateTagRequest) => {
    const response = await http.put<ITag>(`${root}/tag/${request.id}/update`, request.data);
    return response;
}

export const loadTag = async (tagId: string) => {
    const response = await http.get<ITag>(`${root}/tag/${tagId}`);
    return response;
}

export const loadTags = async () => {
    const response = await http.get<ITagListResponse>(`${root}/tag/all`);
    return response;
}

export const searchTags = async (request: ISearchTagsRequest) => {
    const response = await http.post<Array<ITag>>(`${root}/tag/search`, request);
    return response;
}