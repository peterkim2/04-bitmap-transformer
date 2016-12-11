'use strict';

const readFileHelper = require('./lib/bitmap-file-helper.js');
const bitmap = require('./model/bitmap-constructor.js');

module.exports = exports = {};

readFileHelper.bitmap(readFileHelper.filePath, readFileHelper.callback, 'green');
readFileHelper.bitmap(readFileHelper.filePath, readFileHelper.callback, 'white');
readFileHelper.bitmap(readFileHelper.filePath, readFileHelper.callback, 'invert');
readFileHelper.bitmap(readFileHelper.filePath, readFileHelper.callback, 'greyscale');
readFileHelper.bitmap(readFileHelper.filePath, readFileHelper.callback, 'luminosity');
readFileHelper.bitmap(readFileHelper.filePath, readFileHelper.callback, 'black');

exports.convert = process.argv[2];
