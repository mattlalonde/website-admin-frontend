
export type ArticleStateType = 'DRAFT' | 'PUBLISHED' | 'DELETED';

export interface IArticleListResponse {
    entities: {
        articles: Record<string, IArticleListItem>;
        tags: Record<string, IArticleTag>;
    }
    result: Array<string>;
}

export interface IArticleListItem {
    id: string;
    createdTimestamp: string;
    title: string;
    precis?: string | null;
    state: ArticleStateType;
    tags: Array<string>;
}

export interface IArticle {
    ownerUserId: string;
    id: string;
    title: string;
    precis?: string;
    body?: string;
    createdTimestamp: string;
    state: ArticleStateType;
    publicationDate?: string | null;
    tags: Array<IArticleTag> | null;
}

export interface IArticleTag {
    tagId: string;
    name: string;
}

