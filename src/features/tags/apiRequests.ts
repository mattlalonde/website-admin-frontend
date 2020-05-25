export interface ICreateTagRequest {
    name: string;
    description: string;
}

export interface ISearchTagsRequest {
    searchTerm: string;
    excludeIds: Array<string>;
}

interface IBaseTagRequest {
    id: string;
}

export interface IUpdateTagRequest extends IBaseTagRequest {
    data: {
        name: string;
        description?: string | NavigatorUserMediaErrorCallback;
    }
}