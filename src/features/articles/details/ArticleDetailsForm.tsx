import React, { FunctionComponent, useEffect } from 'react';
import { useForm } from "react-hook-form";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Box, TextField, Button, CircularProgress } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { useDispatch } from 'react-redux';
import { updateArticleContentRequest } from './articleDetailsSlice';
import { IUpdateArticleContentRequest } from '../models';
import { ArticleDetailsLoading } from './ArticleDetailsLoading';



interface IArticleDetailsFormProps {
    articleContent: IUpdateArticleContentRequest | null,
    isSaving: boolean,
    isLoading: boolean
}

export const ArticleDetailsForm: FunctionComponent<IArticleDetailsFormProps> = ({articleContent, isSaving, isLoading}) => {

    const dispatch = useDispatch();
    const { register, setValue, handleSubmit, errors } = useForm<IUpdateArticleContentRequest>();

    useEffect(() => {
        register({ name: "body"});
    }, [register])

    const onSubmit = handleSubmit(content => {
        dispatch(updateArticleContentRequest(content));
    });

    if(!articleContent || isLoading)
    {
        return <ArticleDetailsLoading />
    }

    return (
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
            <Box my={2}>
                <TextField 
                    inputRef={register({ required: true })}
                    error={!!errors.articleId}
                    id="articleId" 
                    name="articleId" 
                    label="ID" 
                    fullWidth={true} 
                    defaultValue={articleContent?.articleId} 
                    InputProps={{readOnly: true}}>
                </TextField>
            </Box>
            <Box my={2}>
                <TextField 
                    inputRef={register({ required: true })}
                    error={!!errors.title}
                    id="title" 
                    name="title" 
                    label="Title" 
                    fullWidth={true} 
                    defaultValue={articleContent?.title} 
                    variant='outlined'
                    helperText={!!errors.title ? "Title is required" : ''}>
                </TextField>
            </Box>
            <Box my={2}>
                <TextField 
                    inputRef={register}
                    id="precis" 
                    name="precis" 
                    label="Precis" 
                    fullWidth={true} 
                    multiline={true} 
                    rows={4} 
                    defaultValue={articleContent?.precis} 
                    variant='outlined'>
                </TextField>
            </Box>
            <Box my={1}>
                <CKEditor
                    ref={register}
                    id="article-body-editor"
                    name="body"
                    editor={ ClassicEditor }
                    data={articleContent?.body}
                    onInit={(editor: any) => {
                        setValue("body", editor.getData());
                    }}
                    onChange={ ( event: any, editor: any ) => {
                        const data = editor.getData();
                        setValue("body", data);
                        console.log( { event, editor, data } );
                    } }
                />
            </Box>
            <Box my={2}>
                <Button 
                    type='submit'
                    variant='contained' 
                    color='primary' 
                    startIcon={isSaving ? <CircularProgress size={20} /> : <SaveIcon />} 
                    disabled={isSaving}>
                            Save
                </Button>
            </Box>
        </form>
    )
}