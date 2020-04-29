import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    overrides: {
        MuiInputBase: {
            root: {
                backgroundColor: '#ffffff'
            }
        },
        MuiButtonBase: {
            root: {
                marginLeft: '0.5rem',
                marginRight: '0.5rem',
                '&&:first-child': {
                    marginLeft: '0'
                },
                '&&:last-child': {
                    marginRight: '0'
                }
            }
        },
        MuiChip: {
            root: {
                marginLeft: '0.5rem',
                marginRight: '0.5rem',
                '&&:first-child': {
                    marginLeft: '0'
                },
                '&&:last-child': {
                    marginRight: '0'
                }
            }
        },
        MuiSvgIcon: {
            root: {
                marginLeft: '0.5rem',
                marginRight: '0.5rem',
                verticalAlign: 'middle',
                '&&:first-child': {
                    marginLeft: '0'
                },
                '&&:last-child': {
                    marginRight: '0'
                }
            }
        }
    }
});