import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export const COLOUR_CHIP: string = '#32cd32';
export const COLOUR_PAGE: string = '#faf7fc';
export const COLOUR_GREY_TEXT: string = '#ae9fb4';

export default createMuiTheme({
    palette: {
        primary: {
            main: '#670bea'
        },
        secondary: {
            main: '#333'
        },
        error: {
            main: red.A400
        },
        background: {
            'default': '#fff'
        }
    }
});
