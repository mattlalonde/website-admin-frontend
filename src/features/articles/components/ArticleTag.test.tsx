import React from 'react';
import { createStore } from 'redux';
import { render, rootReducer, screen} from '../../../testUtils';
import tag from '../__mockData__/tag.json';
import initialStoreState from '../../../app/initialStoreStateTesting';

import { ArticleTag } from './ArticleTag';
import tagActions from '../../tags/tagActions';
import articleActions from '../articleActions';
import userEvent from '@testing-library/user-event';

describe('Article Tag Component', () => {

    it('renders tag from store if present', () => {
        const mockState = Object.assign(initialStoreState, {
            entities: {
                tags: {
                    [tag.id]: tag
                }
            }
       });
        const mockStore = createStore(rootReducer, mockState);
        mockStore.dispatch = jest.fn();

        render(<ArticleTag articleId='testArticleId' tagId={tag.id} removable={false} />, {
            store: mockStore
        });

        expect(screen.getByText(tag.name)).toBeInTheDocument();
        expect(mockStore.dispatch).toHaveBeenCalledTimes(0);
    });

    it('dispatches load action if tag not in store', () => {
        const mockStore = createStore(rootReducer, {});
        mockStore.dispatch = jest.fn();

        render(<ArticleTag articleId='testArticleId' tagId={tag.id} removable={false} />, {
            store: mockStore
        });

        expect(mockStore.dispatch).toHaveBeenCalledWith(tagActions.loadTagRequest(tag.id));
    });

    it('does not render delete icon if not removable', () => {
        const mockState = Object.assign(initialStoreState, {
            entities: {
                tags: {
                    [tag.id]: tag
                }
            }
       });
        const mockStore = createStore(rootReducer, mockState);
        mockStore.dispatch = jest.fn();

        const rendered = render(<ArticleTag articleId='testArticleId' tagId={tag.id} removable={false} />, {
            store: mockStore
        });

        const deleteIcon = rendered.container.querySelector(".MuiChip-deleteIcon");
        expect(deleteIcon).not.toBeInTheDocument();
    });

    it('dispatches remove action when clicked if removable', () => {
        const mockState = Object.assign(initialStoreState, {
            entities: {
                tags: {
                    [tag.id]: tag
                }
            }
       });
        const mockStore = createStore(rootReducer, mockState);
        mockStore.dispatch = jest.fn();

        const rendered = render(<ArticleTag articleId='testArticleId' tagId={tag.id} removable={true} />, {
            store: mockStore
        });

        const deleteIcon = rendered.container.querySelector(".MuiChip-deleteIcon");

        if(!deleteIcon) {
            fail('delete icon not rendered for removable article tag');
        }
        else {
            userEvent.click(deleteIcon);
            expect(mockStore.dispatch).toHaveBeenCalledWith(articleActions.removeTagFromArticleRequest({
                id: 'testArticleId',
                data: {
                    tagId: tag.id
                }
            }))
        }
        
    });
});