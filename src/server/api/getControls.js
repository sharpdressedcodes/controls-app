const path = require('path');
const { readFile } = require('../fileOperations');

async function loadControls() {
    const dataFile = path.join(__dirname, '../data/controls.json');

    try {
        const data = JSON.parse(await readFile(dataFile, 'utf-8'));
        return Promise.resolve(data);

    } catch (err) {
        return Promise.reject(err);
    }
}

async function getControls(req, res, next) {
    try {
        const result = await loadControls();
        res.json({ items: result });

    } catch (err) {
        console.log(err);
        res.json({ items: [], error: err.message });
    }
}

module.exports = getControls;
