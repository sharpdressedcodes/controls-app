function getInfo(code) {
    switch (code) {
        case 'ENOENT':
            return { status: 404, message: 'Not found' };
        case 'EBADCSRFTOKEN':
            return { status: 403, message: 'Forbidden' };
        default:
            return { status: 500, message: 'Internal server error' };
    }
}

function trapErrors(err, req, res, next) {
    const { status, message } = getInfo(err.code);

    if (req.xhr) {
        res.status(status).json({ error: `Error: ${message}` });
    } else {
        res.status(status).send(`Error: ${message}`);
    }
}

module.exports = trapErrors;
