'use strict';

// const readFileHelper = require('../lib/bitmap-file-helper.js');
// const index = require('../index.js');
const fs = require('fs');

module.exports = exports = {};

// Buffer constructor to read bitmap header info.
exports.BufferData = function(data) {
  this.buffer = data;
  this.id = data.toString('utf-8', 0, 2);
  this.size = data.readInt32LE(2);
  this.offset = data.readInt32LE(10);
  this.dibheader = data.readInt32LE(14);
  this.width = data.readInt32LE(18);
  this.height = data.readInt32LE(22);
  this.pixel_horizontal = data.readInt32LE(38);
  this.pixel_vertical = data.readInt32LE(42);
  this.number_colors = data.readInt32LE(46);
  this.colorArray = data.slice(54, this.offset);
};

exports.callback = function (err, data, convert) {
  if (err) throw err;
  let transform = new exports.BufferData(data);
  if(convert) transform[convert]();
  console.log(transform);
};

exports.bitmap = function (file, callback, color) {
  return fs.readFile(file, function(err, data) {
    if (err) return callback(err);
    fs.writeFile(`${__dirname}/../assets/${color}.bmp`, data, function(err, data) {
      if(err) throw err;
    });
    return callback(null, data, color);
  });
};

// Index.js
exports.filePath = `${__dirname}/../assets/palette-bitmap.bmp`;

exports.bitmap(exports.filePath, exports.callback, 'green');
exports.bitmap(exports.filePath, exports.callback, 'white');
exports.bitmap(exports.filePath, exports.callback, 'invert');
exports.bitmap(exports.filePath, exports.callback, 'greyscale');
exports.bitmap(exports.filePath, exports.callback, 'luminosity');
exports.bitmap(exports.filePath, exports.callback, 'black');

// Individual Transforms
exports.BufferData.prototype.green = function() {
  for (var i = 0, j = this.colorArray.length; i < j; i += 4) {
    let color = this.colorArray.slice(i, i+4);
    let maxColor = this.number_colors - 1;
    color[0] = color[2] = color[3] = 0;
    color[1] *= maxColor;
  }
};

exports.BufferData.prototype.white = function() {
  this.colorArray.fill(255);
};

exports.BufferData.prototype.invert = function() {
  for (var i = 0, j = this.colorArray.length; i < j; i += 4) {
    // console.log('Prototype transform:', this.colorArray);
    let color = this.colorArray.slice(i, i+4);
    // console.log(color);
    let maxColor = this.number_colors - 1;
    color[0] = maxColor - color[0];
    color[1] = maxColor - color[1];
    color[2] = maxColor - color[2];
    color[3] = 0;
  }
};

exports.BufferData.prototype.greyscale = function() {
  for (var i = 0, j = this.colorArray.length; i < j; i += 4) {
    let color = this.colorArray.slice(i, i+4);
    let averageColor = (color[0] + color[1] + color[2] / 3);
    color[0] = color[1] = color[2] = averageColor;
    color[3] = 0;
  }
};

exports.BufferData.prototype.luminosity = function() {
  for (var i = 0, j = this.colorArray.length; i < j; i += 4) {
    let color = this.colorArray.slice(i, i+4);
    color[0] = color[0] * .07;
    color[1] = color[1] * .72;
    color[2] = color[2] * .21;
    color[3] = 0;
  }
};

exports.BufferData.prototype.black = function() {
  this.colorArray.fill(0);
};
