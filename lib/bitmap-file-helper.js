'use strict';

const fs = require('fs');
const bitmap = require('../model/bitmap-constructor.js');

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

exports.filePath = `${__dirname}/../assets/palette-bitmap.bmp`;
exports.filePath2 = `${__dirname}/../assets/astro.bmp`;
