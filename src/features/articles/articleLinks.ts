import { IArticle } from "./models";

export const articleListLinkTemplate = '/articles';
export const articleDetailsLinkTemplate = '/article-details/:id';

export const articleListLink = () => '/articles';
export const articleDetailsLink = (article: IArticle) => `/article-details/${article.id}`;