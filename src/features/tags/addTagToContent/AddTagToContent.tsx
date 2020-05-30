import React, { FunctionComponent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchTags } from '../api';
import { setError } from '../../errors/errorsSlice';
import { Grid, TextField, CircularProgress, Button } from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import SaveIcon from '@material-ui/icons/Save';
import { CreateTagDialog } from '../create/CreateTagDialog';
import { RootState } from '../../../app/store';
import { tagListByIdSelector } from '../../../entities/tagSelectors';


interface IAddTagToContentProps{
    addTagFunc: (tagId: string) => void;
    createAndAddTagFunc: (tagName: string) => void;
    currentTagIds: Array<string>;
    isAdding: boolean;
}

interface ITagOption {
    id?: string;
    name: string;
}

const filter = createFilterOptions<ITagOption>();

export const AddTagToContent: FunctionComponent<IAddTagToContentProps> = ({addTagFunc, createAndAddTagFunc, currentTagIds, isAdding}) => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<ITagOption[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState<ITagOption | null>(null);
    const currentTagNamesUppercase = useSelector((state: RootState) => tagListByIdSelector(state)(currentTagIds)).map(tag => tag.name.toUpperCase());

    const onAddTag = () => {
        if(selectedValue && selectedValue.id) {
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
                    const tags = await searchTags({searchTerm: searchTerm.trim(), excludeIds: currentTagIds});
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
    }, [searchTerm, selectedValue, dispatch, currentTagIds]);




    return (
        <>
            <CreateTagDialog  />
            <Grid container spacing={3}>
                <Grid item>
                    <Autocomplete
                        id='add-tags'
                        style={{ width: 300 }}
                        open={open}
                        onOpen={() => { setOpen(true); }}
                        onClose={() => { setOpen(false); }}
                        onChange={(event, value) => {
                            if(typeof value === 'string') {
                                createAndAddTagFunc(value);
                                setSearchTerm('');
                                setSelectedValue(null);
                                setOptions([]);
                            }
                            else if (value && !value.id) {
                                createAndAddTagFunc(value.name);
                                setSearchTerm('');
                                setSelectedValue(null);
                                setOptions([]);
                            }
                            else {
                                setSelectedValue(value);
                            }
                        }}
                        onInputChange={(event, value) => { setSearchTerm(value); }}
                        options={options}
                        getOptionLabel={(option) => {
                            // e.g value selected with enter, right from the input
                            if(typeof option === 'string') {
                                return option;
                            }
                            else if(!option.id) {
                                return `Add "${option.name}"`;
                            }
                            
                            return option.name;
                        }}
                        loading={loading}
                        freeSolo={true}
                        multiple={false}
                        selectOnFocus={true}
                        clearOnBlur
                        value={selectedValue}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params) as ITagOption[];

                            if(params.inputValue !== '' 
                                    && currentTagNamesUppercase.indexOf(params.inputValue.toUpperCase().trim()) < 0 
                                    && options.map(option => option.name.toUpperCase()).indexOf(params.inputValue.toUpperCase().trim()) < 0) {
                                filtered.push({
                                    name: params.inputValue
                                });
                            }

                            return filtered;
                        }}
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