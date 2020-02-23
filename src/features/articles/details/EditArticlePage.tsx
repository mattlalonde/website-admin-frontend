import React, { FunctionComponent, useEffect } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Form, FormGroup, Label, Input } from '@bootstrap-styled/v4';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../../../app/store';
import { loadArticleRequest } from './articleDetailsSlice';

interface IEditArticlePageProps {
}


export const EditArticlePage: FunctionComponent<IEditArticlePageProps> = (props: IEditArticlePageProps) => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const { isLoading, isSaving, loadedArticle, error } = useSelector(
        (state: RootState) => state.articleDetails
    );

    useEffect(() => {
        dispatch(loadArticleRequest(id));

        // do we need to remove article from store?
        /* return () => {
            cleanup
        }; */
    }, [dispatch, id]);

    if(isLoading) {
        return (<div>Loading...</div>)
    }
    else if(isSaving) {
        return (<div>Saving...</div>)
    }
    else if (error) {
        return (<div>error</div>)
    }
    else {
        return (
            <>
                <Form>
                    <FormGroup>
                        <Label htmlFor="title">Title</Label>
                        <Input className="form-control" type="text" id="title" ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Body</Label>
                        <CKEditor
                            editor={ ClassicEditor }
                            data={loadedArticle?.body}
                            onInit={ (editor: any) => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event: any, editor: any ) => {
                                const data = editor.getData();
                                console.log( { event, editor, data } );
                            } }
                            onBlur={ ( event: any, editor: any ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event: any, editor: any ) => {
                                console.log( 'Focus.', editor );
                            } }
                        />
                    </FormGroup>
                </Form>
        </>
        );
    }
}