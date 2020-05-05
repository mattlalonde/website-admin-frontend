export interface ICreateArticleRequest {
    title: string;
}

interface IBaseArticleRequest {
    id: string;
}

export interface IUpdateArticleContentRequest extends IBaseArticleRequest {
    data: {
        title: string,
        precis?: string | null,
        body?: string | null
    }
}

export interface IPublishArticleRequest extends IBaseArticleRequest {
    data: {
        publicationDate: string;
    }
}

export interface ITakeArticleOfflineRequest extends IBaseArticleRequest { }

export interface IDeleteArticleRequest extends IBaseArticleRequest { }

export interface IReinstateArticleRequest extends IBaseArticleRequest { }