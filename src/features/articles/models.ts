
export interface IArticle {
    ownerUserId: string;
    articleId: string;
    createdTimestamp: string;
    title: string;
    precis?: string;
    body?: string;
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