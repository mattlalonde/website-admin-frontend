import React, { FunctionComponent, useEffect } from 'react';
import { useForm } from "react-hook-form";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Box, TextField, Button, CircularProgress } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplayIcon from '@material-ui/icons/Replay';
import { useDispatch } from 'react-redux';
import { updateArticleContentRequest, deleteArticleRequest, reinstateArticleRequest } from './articleDetailsSlice';
import { ArticleDetailsLoading } from './ArticleDetailsLoading';
import { IArticle } from '../models';
import { ArticleDetailsProcessingState } from './ArticleDetailsProcessingState';

interface IArticleDetailsFormValues {
    id: string,
    title: string,
    precis: string,
    body: string
}

interface IArticleDetailsFormProps {
    article: IArticle | null,
    processingState: ArticleDetailsProcessingState
}

export const ArticleDetailsForm: FunctionComponent<IArticleDetailsFormProps> = ({article, processingState}) => {

    const dispatch = useDispatch();
    const { register, unregister, setValue, handleSubmit, errors } = useForm<IArticleDetailsFormValues>();
    const isProcessing = processingState !== ArticleDetailsProcessingState.None;

    useEffect(() => {
        register({ name: "body"});
        return () => unregister("body");
    }, [register, unregister])

    const onUpdate = handleSubmit(content => {
        dispatch(updateArticleContentRequest({
            id: content.id,
            data: {
                title: content.title,
                precis: content.precis,
                body: content.body
            }
        }));
    });

    const onDelete = () => {
        if(article) {
            dispatch(deleteArticleRequest({ id: article.id }));
        }
    }

    const onReinstate = () => {
        if(article) {
            dispatch(reinstateArticleRequest({ id: article.id }));
        }
    }

    if(!article || processingState === ArticleDetailsProcessingState.Loading)
    {
        return <ArticleDetailsLoading />
    }

    return (
        <form noValidate autoComplete="off" onSubmit={onUpdate}>
            <Box my={2}>
                <TextField 
                    inputRef={register({ required: true })}
                    error={!!errors.id}
                    id="id" 
                    name="id" 
                    label="ID" 
                    fullWidth={true} 
                    defaultValue={article?.id} 
                    variant='outlined'
                    disabled={isProcessing || article.state !== 'DRAFT'}
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
                    defaultValue={article?.title} 
                    variant='outlined'
                    disabled={isProcessing || article.state !== 'DRAFT'}
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
                    defaultValue={article?.precis} 
                    disabled={isProcessing || article.state !== 'DRAFT'}
                    variant='outlined'>
                </TextField>
            </Box>
            <Box my={1}>
                <CKEditor
                    ref={register}
                    id="article-body-editor"
                    name="body"
                    editor={ ClassicEditor }
                    data={article?.body}
                    disabled={isProcessing || article.state !== 'DRAFT'}
                    onInit={(editor: any) => {
                        setValue("body", editor.getData());
                    }}
                    onChange={ ( event: any, editor: any ) => {
                        setValue("body", editor.getData());
                    } }
                />
            </Box>
            <Box my={2}>
                {article?.state === 'DRAFT' && (
                    <>
                        <Button 
                            type='submit'
                            variant='contained' 
                            color='primary' 
                            startIcon={processingState === ArticleDetailsProcessingState.Updating ? <CircularProgress size={20} /> : <SaveIcon />} 
                            disabled={isProcessing}>
                                    Save
                        </Button>
                        <Button 
                            type='button'
                            variant='contained' 
                            color='secondary' 
                            startIcon={processingState === ArticleDetailsProcessingState.Deleting ? <CircularProgress size={20} /> : <DeleteIcon />} 
                            disabled={isProcessing}
                            onClick={onDelete}>
                                    Delete
                        </Button>
                    </>
                )}
                
                {article?.state === 'DELETED' && (
                    <Button 
                        type='button'
                        variant='contained' 
                        color='secondary' 
                        startIcon={processingState === ArticleDetailsProcessingState.Reinstating ? <CircularProgress size={20} /> : <ReplayIcon />} 
                        disabled={isProcessing}
                        onClick={onReinstate}>
                                Reinstate
                    </Button>
                )}
            </Box>
        </form>
    )
}