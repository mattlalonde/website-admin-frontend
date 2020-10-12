import React from 'react';
import { render, screen, rootReducer, waitFor } from '../../../testUtils';
import initialStoreState from '../../../app/initialStoreStateTesting';
import { createStore } from 'redux';
import { useParams } from "react-router-dom";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import draftArticle from '../__mockData__/draftArticle.json';
import deletedArticle from '../__mockData__/deletedArticle.json';
import publishedArticle from '../__mockData__/publishedArticle.json';
import articleActions from '../articleActions';
import userEvent from '@testing-library/user-event';
import { ArticleDetailsProcessingState } from './ArticleDetailsProcessingState';

import { ArticleDetailsPage } from './ArticleDetailsPage';
import { format } from 'date-fns';

describe('Article Details Page', () => {

    Object.keys(ArticleDetailsProcessingState).forEach(key => {
        if(isNaN(Number(key)) && ArticleDetailsProcessingState[key] !== ArticleDetailsProcessingState.None) {
            it(`Displays indicator for all processing states: ${key}`, () => {
                (useParams as jest.Mock).mockReturnValue({ id: draftArticle.id });
                const mockState = Object.assign(initialStoreState, {
                    articlesUi: {
                        details: {
                            processingState: ArticleDetailsProcessingState[key]
                        }
                    }
                });
                const mockStore = createStore(rootReducer, mockState);
                mockStore.dispatch = jest.fn();
        
                render(<ArticleDetailsPage />, { store: mockStore });
        
                expect(screen.getByRole('progressbar')).toBeInTheDocument();
            });
        }
    });

    it('Does not display indicator when not processing', () => {
        (useParams as jest.Mock).mockReturnValue({ id: draftArticle.id });
        const mockState = Object.assign(initialStoreState, {
            articlesUi: {
                details: {
                    processingState: ArticleDetailsProcessingState.None
                }
            }
        });
        const mockStore = createStore(rootReducer, mockState);
        mockStore.dispatch = jest.fn();

        render(<ArticleDetailsPage />, { store: mockStore });

        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });


    it('Dispatches action to load article', () => {
        (useParams as jest.Mock).mockReturnValue({ id: draftArticle.id });
        const mockState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticle.id]: draftArticle
                }
            },
            articlesUi: {
                details: {
                    processingState: ArticleDetailsProcessingState.None
                }
            }
        });
        const mockStore = createStore(rootReducer, mockState);
        mockStore.dispatch = jest.fn();

        render(<ArticleDetailsPage />, { store: mockStore });

        expect(mockStore.dispatch).toHaveBeenCalledWith(articleActions.loadArticleRequest(draftArticle.id));
    });

    it('Does not show header when loading', () => {
        (useParams as jest.Mock).mockReturnValue({ id: draftArticle.id });
        const mockState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticle.id]: draftArticle
                }
            },
            articlesUi: {
                details: {
                    processingState: ArticleDetailsProcessingState.Loading
                }
            }
        });

        render(<ArticleDetailsPage />, { initialState: mockState });

        expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('Displays title of draft article with state', () => {
        (useParams as jest.Mock).mockReturnValue({ id: draftArticle.id });
        const mockState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticle.id]: draftArticle
                }
            },
            articlesUi: {
                details: {
                    processingState: ArticleDetailsProcessingState.None
                }
            }
        });
        const mockStore = createStore(rootReducer, mockState);
        mockStore.dispatch = jest.fn();

        render(<ArticleDetailsPage />, { store: mockStore });
    

        expect(screen.getByRole('heading', { name: `DRAFT ${draftArticle.title}` })).toBeInTheDocument();
    });

    it('Displays title of deleted article with state', () => {
        (useParams as jest.Mock).mockReturnValue({ id: deletedArticle.id });
        const mockState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [deletedArticle.id]: deletedArticle
                }
            },
            articlesUi: {
                details: {
                    processingState: ArticleDetailsProcessingState.None
                }
            }
        });
        const mockStore = createStore(rootReducer, mockState);
        mockStore.dispatch = jest.fn();

        render(<ArticleDetailsPage />, { store: mockStore });
    

        expect(screen.getByRole('heading', { name: `DELETED ${deletedArticle.title}` })).toBeInTheDocument();
    });

    it('Displays title of published article with state and publication date', () => {
        (useParams as jest.Mock).mockReturnValue({ id: publishedArticle.id });
        const mockState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [publishedArticle.id]: publishedArticle
                }
            },
            articlesUi: {
                details: {
                    processingState: ArticleDetailsProcessingState.None
                }
            }
        });
        const mockStore = createStore(rootReducer, mockState);
        mockStore.dispatch = jest.fn();

        render(<ArticleDetailsPage />, { store: mockStore });
    

        expect(screen.getByRole('heading', { name: `PUBLISHED - ${format(new Date(publishedArticle.publicationDate as string), 'dd/MM/yyyy')} ${publishedArticle.title}` })).toBeInTheDocument();
    });

    it('Shows correct tab when selected', () => {
        (useParams as jest.Mock).mockReturnValue({ id: draftArticle.id });
        const mockState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticle.id]: draftArticle
                }
            },
            articlesUi: {
                details: {
                    processingState: ArticleDetailsProcessingState.None
                }
            }
        });

        render(<MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ArticleDetailsPage />
                </MuiPickersUtilsProvider>, { initialState: mockState });

        userEvent.click(screen.getByRole('tab', { name: 'Tags'}));
        expect(screen.getByRole('tabpanel', { name: 'Tags'})).toBeVisible();

        userEvent.click(screen.getByRole('tab', { name: 'Authors' }));
        expect(screen.getByRole('tabpanel', { name: 'Authors'})).toBeVisible();

        userEvent.click(screen.getByRole('tab', { name: 'Publishing' }));
        expect(screen.getByRole('tabpanel', { name: 'Publishing'})).toBeVisible();

        userEvent.click(screen.getByRole('tab', { name: 'Details' }));
        expect(screen.getByRole('tabpanel', { name: 'Details'})).toBeVisible();
    });

    it('Does not show publishing tab for delted articles', async () => {
        (useParams as jest.Mock).mockReturnValue({ id: deletedArticle.id });
        const mockState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [deletedArticle.id]: deletedArticle
                }
            },
            articlesUi: {
                details: {
                    processingState: ArticleDetailsProcessingState.None
                }
            }
        });

        render(<ArticleDetailsPage />, { initialState: mockState });

        await waitFor(() => expect(screen.queryByRole('tab', { name: 'Publishing' })).not.toBeInTheDocument());
    });
});