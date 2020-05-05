import { ITag } from './models';
import * as http from '../../utils/http';
import { ICreateTagRequest, IUpdateTagRequest } from './apiRequests';
import { ApiError } from '../../errors/ApiError';

const root = '/api';

export const createTag = async (request: ICreateTagRequest) => {
    const response = await http.post<ITag>(`${root}/tag/create`, request);

    if(response.parsedBody) {
        return response.parsedBody;
    }

    throw ApiError.create('API_ERROR', 'Unable to create tag');
}

export const updateTag = async (request: IUpdateTagRequest) => {
    const response = await http.put<ITag>(`${root}/tag/${request.id}/update`, request.data);

    if(response.parsedBody) {
        return response.parsedBody;
    }

    throw ApiError.create('API_ERROR', 'Unable to update tag');
}

export const loadTag = async (tagId: string) => {
    const response = await http.get<ITag>(`${root}/tag/${tagId}`);

    if(response.parsedBody) {
        return response.parsedBody;
    }

    throw ApiError.create('API_ERROR', 'Unable to find tag');
}

export const loadTags = async () => {
    const response = await http.get<Array<ITag>>(`${root}/tag/all`);

    if(response.parsedBody) {
        return response.parsedBody;
    }

    throw ApiError.create('API_ERROR', 'Unable to find tags');
}