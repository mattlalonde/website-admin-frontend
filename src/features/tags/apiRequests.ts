export interface ICreateTagRequest {
    name: string;
    description: string;
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