import React, { memo } from 'react';
import PropTypes from 'prop-types';
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

const Header = props => {
    const { logoPath } = props;
    const classes = useStyles();

    return (
        <header className={classes.root}>
            {logoPath && <img src={logoPath} className={classes.logo} alt="logo" />}
        </header>
    );
};

Header.displayName = 'Header';

Header.propTypes = {
    logoPath: PropTypes.string
};

Header.defaultProps = {
    logoPath: null
};

export default memo(Header);
