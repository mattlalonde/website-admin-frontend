import { RootState } from '../../app/store';

export const getArticleDetailsUI = () => (state: RootState) => state?.articlesUi?.details;
export const getArticleListUI = () => (state: RootState) => state?.articlesUi?.list;
export const getArticleCreateUI = () => (state: RootState) => state?.articlesUi?.create;