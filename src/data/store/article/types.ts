import { IArticle, IArticleListItem } from '../../../features/articles/models';
import { IBaseAction, IBaseErrorAction } from '../IBaseAction';

export const ARTICLE_CREATE_REQUEST = '@@article/CREATE_REQUEST';
export interface IArticleCreateRequestAction extends IBaseAction {
    type: typeof ARTICLE_CREATE_REQUEST;
    payload: {
        title: string;
    }
}

export const ARTICLE_CREATE_SUCCESS = '@@article/CREATE_SUCCESS';
export interface IArticleCreateSuccessAction extends IBaseAction {
    type: typeof ARTICLE_CREATE_SUCCESS;
    payload: {
        article: IArticle;
    }
}

export const ARTICLE_CREATE_FAILED = '@@article/CREATE_FAILED';
export interface IArticleCreateFailedAction extends IBaseErrorAction {
    type: typeof ARTICLE_CREATE_FAILED;
}


export const ARTICLE_UPDATE_TITLE_REQUEST = '@@article/UPDATE_TITLE_REQUEST';
export interface IArticleUpdateTitleRequestAction extends IBaseAction {
    type: typeof ARTICLE_UPDATE_TITLE_REQUEST;
    payload: {
        articleId: string;
        title: string;
    }
}

export const ARTICLE_UPDATE_TITLE_SUCCESS = '@@article/UPDATE_TITLE_SUCCESS';
export interface IArticleUpdateTitleSuccessAction extends IBaseAction {
    type: typeof ARTICLE_UPDATE_TITLE_SUCCESS;
    payload: {
        articleId: string;
        title: string;
    }
}

export const ARTICLE_UPDATE_TITLE_FAILED = '@@article/UPDATE_TITLE_FAILED';
export interface IArticleUpdateTitleFailedAction extends IBaseErrorAction {
    type: typeof ARTICLE_UPDATE_TITLE_FAILED;
}

export const ARTICLE_UPDATE_BODY_REQUEST = '@@article/UPDATE_BODY_REQUEST';
export interface IArticleUpdateBodyRequestAction extends IBaseAction {
    type: typeof ARTICLE_UPDATE_BODY_REQUEST;
    payload: {
        articleId: string;
        body: string;
    }
}

export const ARTICLE_UPDATE_BODY_SUCCESS = '@@article/UPDATE_BODY_SUCCESS';
export interface IArticleUpdateBodySuccessAction extends IBaseAction {
    type: typeof ARTICLE_UPDATE_BODY_SUCCESS;
    payload: {
        articleId: string;
        body: string;
    }
}

export const ARTICLE_UPDATE_BODY_FAILED = '@@article/UPDATE_BODY_FAILED';
export interface IArticleUpdateBodyFailedAction extends IBaseErrorAction {
    type: typeof ARTICLE_UPDATE_BODY_FAILED;
}


export const ARTICLE_PUBLISH_REQUEST = '@@article/PUBLISH_REQUEST';
export interface IArticlePublishRequestAction extends IBaseAction {
    type: typeof ARTICLE_PUBLISH_REQUEST;
    payload: {
        articleId: string;
        publishDate: string;
    }
}

export const ARTICLE_PUBLISH_SUCCESS = '@@article/PUBLISH_SUCCESS';
export interface IArticlePublishSuccessAction extends IBaseAction {
    type: typeof ARTICLE_PUBLISH_SUCCESS;
    payload: {
        articleId: string;
        publishDate: string;
    }
}

export const ARTICLE_PUBLISH_FAILED = '@@article/PUBLISH_FAILED';
export interface IArticlePublishFailedAction extends IBaseErrorAction {
    type: typeof ARTICLE_PUBLISH_FAILED;
}

export const ARTICLE_TAKE_OFFLINE_REQUEST = '@@article/TAKE_OFFLINE_REQUEST';
export interface IArticleTakeOfflineRequestAction extends IBaseAction {
    type: typeof ARTICLE_TAKE_OFFLINE_REQUEST;
    payload: {
        articleId: string;
    }
}

export const ARTICLE_TAKE_OFFLINE_SUCCESS = '@@article/TAKE_OFFLINE_SUCCESS';
export interface IArticleTakeOfflineSuccessAction extends IBaseAction {
    type: typeof ARTICLE_TAKE_OFFLINE_SUCCESS;
    payload: {
        articleId: string;
    }
}

export const ARTICLE_TAKE_OFFLINE_FAILED = '@@article/TAKE_OFFLINE_FAILED';
export interface IArticleTakeOfflineFailedAction extends IBaseErrorAction {
    type: typeof ARTICLE_TAKE_OFFLINE_FAILED;
}

export type ArticleActionTypes = 
    | IArticleCreateRequestAction
    | IArticleCreateSuccessAction
    | IArticleCreateFailedAction
    | IArticleUpdateTitleRequestAction
    | IArticleUpdateTitleSuccessAction
    | IArticleUpdateTitleFailedAction
    | IArticleUpdateBodyRequestAction
    | IArticleUpdateBodySuccessAction
    | IArticleUpdateBodyFailedAction
    | IArticlePublishRequestAction
    | IArticlePublishSuccessAction
    | IArticlePublishFailedAction
    | IArticleTakeOfflineRequestAction
    | IArticleTakeOfflineSuccessAction
    | IArticleTakeOfflineFailedAction