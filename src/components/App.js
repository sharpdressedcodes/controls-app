import React, { memo } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { StyledControlsPage as ControlsPage } from './ControlsPage';
import Header from './Header';
import logo from '../assets/logo.svg';

const useStyles = makeStyles(theme => ({
    outerContainer: {
        padding: 0
    },
    innerContainer: {
        backgroundColor: theme.palette.page,
        minHeight: 'calc(100vh - 97px)',
        padding: 0
    },
    app: {
        paddingTop: '30px'
    }
}));

function App() {
    const classes = useStyles();

    return (
        <Container maxWidth={false} className={classes.outerContainer}>
            <Header logoPath={logo} />
            <Container maxWidth={false} className={classes.innerContainer}>
                <main className={`app ${classes.app}`} id="app">
                    <ControlsPage />
                </main>
            </Container>
        </Container>
    );
}

App.displayName = 'App';

export default memo(App);
