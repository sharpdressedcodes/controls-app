import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
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
            default: '#fff'
        },
        chip: '#32cd32',
        page: '#faf7fc',
        greyText: '#ae9fb4'
    },
});

export default theme;
