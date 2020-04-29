
export type ArticleStateType = 'DRAFT' | 'PUBLISHED' | 'DELETED';

export interface IArticleListItem {
    ownerUserId: string;
    id: string;
    createdTimestamp: string;
    title: string;
    precis?: string;
    state: ArticleStateType;
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
}

