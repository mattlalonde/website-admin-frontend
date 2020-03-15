
export interface IArticle {
    ownerUserId: string;
    articleId: string;
    title: string;
    precis?: string;
    body?: string;
    createdTimestamp: string;
    published: boolean;
}

export interface IArticleListItem {
    ownerUserId: string;
    articleId: string;
    createdTimestamp: string;
    title: string;
    precis?: string;
    published: boolean;
}

export interface IUpdateArticleContentRequest {
    articleId: string,
    title: string,
    precis?: string | null,
    body?: string | null
}

export interface ICreateArticleRequest {
    title: string;
}