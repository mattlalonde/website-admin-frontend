import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Form, FormGroup, Label, Input } from '@bootstrap-styled/v4';

interface IEditArticlePageProps {}


export const EditArticlePage: React.FunctionComponent<IEditArticlePageProps> = (props: IEditArticlePageProps) => {


    return (
        <>
            <Form>
                <FormGroup>
                    <Label htmlFor="title">Title</Label>
                    <Input className="form-control" type="text" id="title"></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Body</Label>
                    <CKEditor
                        editor={ ClassicEditor }
                        data="<p>Hello from CKEditor 5!</p>"
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