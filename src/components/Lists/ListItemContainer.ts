import { styled, Paper } from "@material-ui/core";

export const ListItemContainer = styled(Paper)({
    padding: '1em',
    margin: '1em 0 1em 0',
    cursor: 'pointer',
    border: 'solid 1px transparent',
    transition: 'all .1s',
    '&:hover': {
        backgroundColor: '#fdfdfd',
        boxShadow: 'none',
        border: 'solid 1px #dddddd'
    }
});