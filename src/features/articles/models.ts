import { ITag } from "../tags/models";

export type ArticleStateType = 'DRAFT' | 'PUBLISHED' | 'DELETED';

export interface IArticleListResponse {
    entities: {
        articles: Record<string, IArticle>;
        tags: Record<string, ITag>;
    }
    result: Array<string>;
}

export interface IArticleResponse {
    article: IArticle;
    tags: Record<string, ITag>;
}

export interface IArticle {
    ownerUserId: string;
    id: string;
    title: string;
    precis?: string | null;
    body?: string | null;
    createdTimestamp: string;
    state: ArticleStateType;
    publicationDate?: string | null;
    tags: Array<string> | null;
}

