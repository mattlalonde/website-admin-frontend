import { createMuiTheme } from "@material-ui/core";


export const theme = createMuiTheme({
    overrides: {
        MuiTextField: {
            root: {
                backgroundColor: '#ffffff'
            }
        }
    }
});