
export interface ITagListResponse {
    entities: {
        tags: Record<string, ITag>;
    }
    result: Array<string>;
}

export interface ITag {
    id: string;
    name: string;
    description: string;
}