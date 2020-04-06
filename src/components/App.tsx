import React, { memo } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ControlsPageContainer from '../containers/ControlsPage';
import Header from './Header';
import logo from '../assets/logo.svg';
import { COLOUR_PAGE } from '../config/theme';

const useStyles = makeStyles(() => ({
    outerContainer: {
        padding: 0
    },
    innerContainer: {
        backgroundColor: COLOUR_PAGE,
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
                    <ControlsPageContainer />
                </main>
            </Container>
        </Container>
    );
}

App.displayName = 'App';

export default memo(App);
