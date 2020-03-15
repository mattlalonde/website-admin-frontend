import { createMuiTheme } from "@material-ui/core";


export const theme = createMuiTheme({
    overrides: {
        MuiInputBase: {
            root: {
                backgroundColor: '#ffffff'
            }
        }
    }
});