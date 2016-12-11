'use strict';

const readFileHelper = require('./lib/bitmap-file-helper.js');

module.exports = exports = {};

switch (process.argv[2]) {
case 'green':
  readFileHelper.bitmap(readFileHelper.filePath, readFileHelper.callback, 'green');
  break;
case 'white':
  readFileHelper.bitmap(readFileHelper.filePath, readFileHelper.callback, 'white');
  break;
case 'invert':
  readFileHelper.bitmap(readFileHelper.filePath, readFileHelper.callback, 'invert');
  break;
case 'greyscale':
  readFileHelper.bitmap(readFileHelper.filePath, readFileHelper.callback, 'greyscale');
  break;
case 'luminosity':
  readFileHelper.bitmap(readFileHelper.filePath, readFileHelper.callback, 'luminosity');
  break;
case 'black':
  readFileHelper.bitmap(readFileHelper.filePath, readFileHelper.callback, 'black');
  break;
default:
  console.log('Please enter one of the following: green, white, invert, grescale, luminosity, black');
}

exports.convert = process.argv[2];
