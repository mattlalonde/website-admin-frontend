import React, { FunctionComponent, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { IArticle } from '../models';
import { useDispatch } from 'react-redux';
import { publishArticleRequest, takeArticleOfflineRequest } from './articleDetailsSlice';

import { Box, Button, CircularProgress } from '@material-ui/core';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Alert } from '@material-ui/lab';
import { isFuture, format } from 'date-fns';
import { ArticleDetailsProcessingState } from './ArticleDetailsProcessingState';

interface IArticlePublishingFormValues {
    publicationDate?: Date | null;
}

interface IArticlePublishingFormProps {
    article: IArticle,
    processingState: ArticleDetailsProcessingState
}

const getPublishedMessage = (article: IArticle| null) => {
    if(article && article.publicationDate) {
        const publicationDate = new Date(article.publicationDate);

        if(isFuture(publicationDate)) {
            return `This article will go live on ${format(publicationDate, "dd/MM/yyyy 'at' HH:mm")}`;
        }
        else {
            return `This article went live on ${format(publicationDate, "dd/MM/yyyy 'at' HH:mm")}`;
        }
    }
}

export const ArticlePublishingForm: FunctionComponent<IArticlePublishingFormProps> = ({article, processingState}) => {

    const dispatch = useDispatch();
    const now = new Date();
    const defaultValues = {
        publicationDate: article.publicationDate ? new Date(article.publicationDate) : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0)
    }
    const { register, unregister, setValue, handleSubmit, errors, getValues } = useForm<IArticlePublishingFormValues>({defaultValues});
    const isProcessing = processingState !== ArticleDetailsProcessingState.None;

    useEffect(() => {
        register({ name: "publicationDate"}, { required: true });
        return () => unregister("publicationDate");
    }, [register, unregister])
    
    const onPublish = handleSubmit(content => {
        if(article && content.publicationDate) {
            dispatch(publishArticleRequest({
                id: article.id,
                data: {
                    publicationDate: format(content.publicationDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") // manually set format to avoid timezone differences
                }
            }));
        }
    });

    const onTakeOffline = () => {
        if(article) {
            dispatch(takeArticleOfflineRequest({ id: article.id }));
        }
    }

    const values = getValues();
    const publishedMessage = getPublishedMessage(article);

    return (
        <form noValidate autoComplete="off" onSubmit={onPublish}>
            <Box my={2}>
                {article.state === 'DRAFT' && (
                    <KeyboardDateTimePicker 
                        id='publicationDate'
                        name='publicationDate'
                        label='Publication date'
                        format='dd/MM/yyyy HH:mm'
                        error={errors.hasOwnProperty('publicationDate')}
                        helperText={errors.hasOwnProperty('publicationDate') && 'Must select a date'}
                        value={values.publicationDate} 
                        inputVariant="outlined"
                        ampm={false}
                        KeyboardButtonProps={{
                            "aria-label": "select publication date"
                        }}
                        onChange={date => {
                            setValue("publicationDate", date, true);
                        }}>
                    </KeyboardDateTimePicker>
                )}
                {article.state === 'PUBLISHED' && (
                    <Alert severity='info'>{publishedMessage}</Alert>
                )}
            </Box>
            <Box my={2}>
                {article.state ==='DRAFT' && (
                    <Button 
                        type='submit'
                        variant='contained' 
                        color='primary' 
                        startIcon={processingState === ArticleDetailsProcessingState.Publishing ? <CircularProgress size={20} /> : <PublishIcon />} 
                        disabled={isProcessing}>
                                Publish
                    </Button>
                )}
                {article.state === 'PUBLISHED' && (
                    <Button 
                        type='button'
                        variant='contained'
                        color='secondary'
                        startIcon={processingState === ArticleDetailsProcessingState.TakingOffline ? <CircularProgress size={20} /> : <GetAppIcon />} 
                        onClick={onTakeOffline}
                        disabled={isProcessing}>
                            Take article offline
                    </Button>
                )}
            </Box>
        </form>
    )
}
