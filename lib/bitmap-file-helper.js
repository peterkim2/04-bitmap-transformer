'use strict';

const fs = require('fs');
const bitmap = require('../model/bitmap-constructor.js');
const index = require('../index.js');
const readFileHelper = require('../lib/bitmap-file-helper.js');

module.exports = exports = {};
exports.callback = function (err, data, convert) {
  if (err) throw err;
  let transform = new bitmap.BufferData(data);
  if(convert) transform[convert]();
};

exports.bitmap = function (file, callback, color) {
  return fs.readFile(file, function(err, data) {
    if (err) return callback(err);
    fs.writeFile(`${__dirname}/../assets/${color}.bmp`, data, function(err) {
      if(err) throw err;
    });
    return callback(null, data, color);
  });
};

// Index.js
exports.filePath = `${__dirname}/../assets/palette-bitmap.bmp`;
