const express = require('express');
const get = require('lodash.get');
const cors = require('cors');
const http = require('http');
const config = require('../config/main');
const getControls = require('./api');
const logErrors = require('./middleware/logErrors');
const trapErrors = require('./middleware/trapErrors');

const app = express();
const server = http.createServer(app);
const production = process.env.NODE_ENV === 'production';

app.use(cors());
app.use(express.static('public', {
    maxAge: production ? '1y' : 0,
    index: false
}));

app.get(
    config.endpoints.api.getControls,
    getControls,
    logErrors,
    trapErrors
);

server.setTimeout(0);

const listener = server.listen(get(config, 'server.port', 3001), err => {
    if (err) {
        throw err;
    }

    // eslint-disable-next-line no-console
    console.log(`server listening on port ${listener.address().port}`);
});
