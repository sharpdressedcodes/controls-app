import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default
    },
    logo: {
        width: '65px',
        margin: `${theme.spacing(2)}px 0 ${theme.spacing(2)}px ${theme.spacing(3)}px`
    }
}));

type HeaderProps = {
    logoPath?: string
};

const Header = (props: HeaderProps) => {
    const { logoPath } = props;
    const classes = useStyles();

    return (
        <header className={classes.root}>
            {logoPath && <img src={logoPath} className={classes.logo} alt="logo" />}
        </header>
    );
};

Header.displayName = 'Header';

export default memo<HeaderProps>(Header);
