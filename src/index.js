import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-common';
import App from './components/App';
import config from './config/main';
import theme from './theme';
import * as serviceWorker from './serviceWorker';
import './index.css';

const apolloCache = new InMemoryCache();
const apolloLink = new HttpLink({
    uri: config.endpoints.api
});
const apolloClient = new ApolloClient({
    cache: apolloCache,
    link: apolloLink
});

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
