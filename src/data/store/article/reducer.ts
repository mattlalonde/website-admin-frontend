import * as types from './types';
import { IArticle, IArticleListItem } from '../../../features/articles/models';

interface IArticleState {
    articleList: Array<IArticleListItem>;
    selectedArticle: IArticle | null;
    isLoadingArticle: boolean;
    isCreatingArticle: boolean;
    isSaving: boolean;
    error: Error | string | null;
}

const intialState: IArticleState = {
    articleList: [],
    selectedArticle: null,
    isLoadingArticle: false,
    isCreatingArticle: false,
    isSaving: false,
    error: null
}