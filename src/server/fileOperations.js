const fs = require('fs');
const mkdirp = require('mkdirp');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);
const fsUnlink = util.promisify(fs.unlink);
const stat = util.promisify(fs.stat);
const close = util.promisify(fs.close);
const open = util.promisify(fs.open);
const read = util.promisify(fs.read);
const write = util.promisify(fs.write);
const rename = util.promisify(fs.rename);

function fileExists(file) {
    return new Promise((resolve, reject) => {
        try {
            fs.stat(file, (err, stats) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        } catch (err) {
            reject(err);
        }
    });
}

function directoryExists(directory) {
    return new Promise((resolve, reject) => {
        try {
            fs.stat(directory, (err, stats) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(stats.isDirectory());
                }
            });
        } catch (err) {
            reject(err);
        }
    });
}

function createDirectory(directory) {
    return new Promise((resolve, reject) => {
        try {
            mkdirp.mkdirP(directory, {}, () => {
                resolve(directory);
            });
        } catch (err) {
            reject(err);
        }
    });
}

async function unlink(file) {
    try {
        const result = await fileExists(file);

        if (result) {
            try {
                await fsUnlink(file);
            } catch (innerErr) {
                //
            }
        }
    } catch (err) {
        //
    }

    return Promise.resolve(true);
}

module.exports = {
    readFile,
    readDir,
    writeFile,
    fsUnlink,
    stat,
    close,
    open,
    read,
    write,
    rename,
    fileExists,
    directoryExists,
    createDirectory,
    unlink
};
