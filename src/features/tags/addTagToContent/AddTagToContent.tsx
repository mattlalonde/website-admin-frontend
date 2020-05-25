import React, { FunctionComponent, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ITag } from '../models';
import { searchTags } from '../api';
import { setError } from '../../errors/errorsSlice';
import { Grid, TextField, CircularProgress, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import SaveIcon from '@material-ui/icons/Save';


interface IAddTagToContentProps{
    addTagFunc: (tagId: string) => void;
    excludeIds: Array<string>;
    isAdding: boolean;
}

export const AddTagToContent: FunctionComponent<IAddTagToContentProps> = ({addTagFunc, excludeIds, isAdding}) => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<ITag[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState<ITag | null>(null);

    const onAddTag = () => {
        if(selectedValue) {
            addTagFunc(selectedValue.id);
            setSearchTerm('');
            setSelectedValue(null);
            setOptions([]);
        }
    }

    useEffect(() => {
        let active = true;

        (async () => {
            setLoading(true);
            if(!selectedValue && searchTerm) {
                try {
                    const tags = await searchTags({searchTerm, excludeIds});
                    if(active) {
                        setOptions(tags);
                    }
                }
                catch(error) {
                    dispatch(setError(error.apierror));
                }
            }
                       
            setLoading(false);
        })();

        return () => { 
            active = false;
        }
    }, [searchTerm, selectedValue, dispatch, excludeIds]);




    return (
        <>
            <Grid container spacing={3}>
                <Grid item>
                    <Autocomplete
                        id='add-tags'
                        style={{ width: 300 }}
                        open={open}
                        onOpen={() => { setOpen(true); }}
                        onClose={() => { setOpen(false); }}
                        onChange={(event, value) => setSelectedValue(value)}
                        onInputChange={(event, value) => { setSearchTerm(value); }}
                        options={options}
                        getOptionLabel={(option) => option.name}
                        loading={loading}
                        freeSolo={true}
                        multiple={false}
                        value={selectedValue}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Add Tags'
                                variant='outlined'
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {loading && <CircularProgress color='inherit' size={20} />}
                                            {params.InputProps.endAdornment}
                                        </>
                                    )                            
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item>
                    { selectedValue && 
                        <Button 
                            variant='contained' 
                            color='primary' 
                            onClick={onAddTag}
                            startIcon={isAdding ? <CircularProgress size={20} /> : <SaveIcon />} 
                            disabled={isAdding}
                            >Add Tag</Button> }
                </Grid>
            </Grid>
        </>
    )
}