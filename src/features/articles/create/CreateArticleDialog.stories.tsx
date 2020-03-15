import React from 'react';
import { action } from '@storybook/addon-actions';

import { CreateArticleDialog } from './CreateArticleDialog';

export default {
    component: CreateArticleDialog,
    title: 'Create Article Dialog'
}

export const Default = () => {
    return <CreateArticleDialog 
                isPopupOpen={true} 
                isCreating={false} 
                createArticleServerError={null} 
                handleClose={action('handle close')} 
                onSubmit={action('on submit')} />
}

export const Creating = () => {
    return <CreateArticleDialog 
                isPopupOpen={true} 
                isCreating={true} 
                createArticleServerError={null} 
                handleClose={action('handle close')} 
                onSubmit={action('on submit')} />
}

export const Error = () => {
    return <CreateArticleDialog 
                isPopupOpen={true} 
                isCreating={false} 
                createArticleServerError={{name: 'CreateArticleError', message: 'Error: could not create article'}} 
                handleClose={action('handle close')} 
                onSubmit={action('on submit')} />
}

export const StringError = () => {
    return <CreateArticleDialog 
                isPopupOpen={true} 
                isCreating={false} 
                createArticleServerError={'Error: could not create article'} 
                handleClose={action('handle close')} 
                onSubmit={action('on submit')} />
}

