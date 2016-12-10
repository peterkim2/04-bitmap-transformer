'use strict';

const fs = require('fs');

module.exports = exports = {};

// Probably goes in lib/bitmap-file-helper.js. Could abstract this. Needs some work.
// Based on class read/write example.

exports.green = function(callback) {
  fs.readFile(`${__dirname}/../assets/palette-bitmap.bmp`, function(err, data) {
    if (err) return callback(err);
    console.log('Read original bitmap to change to green.');
    fs.writeFile(`${__dirname}/../assets/green.bmp`, data, function(err, data) {
      if(err) throw err;
      console.log('Written to new green bitmap file.');
    });
    callback(null, data);
  });
};

exports.white = function(callback) {
  fs.readFile(`${__dirname}/../assets/palette-bitmap.bmp`, function(err, data) {
    if (err) return callback(err);
    fs.writeFile(`${__dirname}/../assets/white.bmp`, data, function(err, data) {
      if(err) throw err;
    });
    callback(null, data);
  });
};

exports.invert = function(callback) {
  fs.readFile(`${__dirname}/../assets/palette-bitmap.bmp`, function(err, data) {
    if (err) return callback(err);
    fs.writeFile(`${__dirname}/../assets/invert.bmp`, data, function(err, data) {
      if(err) throw err;
    });
    callback(null, data);
  });
};

exports.greyscale = function(callback) {
  fs.readFile(`${__dirname}/../assets/palette-bitmap.bmp`, function(err, data) {
    if (err) return callback(err);
    fs.writeFile(`${__dirname}/../assets/greyscale.bmp`, data, function(err, data) {
      if(err) throw err;
    });
    callback(null, data);
  });
};

exports.luminosity = function(callback) {
  fs.readFile(`${__dirname}/../assets/palette-bitmap.bmp`, function(err, data) {
    if (err) return callback(err);
    fs.writeFile(`${__dirname}/../assets/luminosity.bmp`, data, function(err, data) {
      if(err) throw err;
    });
    callback(null, data);
  });
};

// Buffer constructor to read bitmap header info.

exports.BufferData = function(data) {
  this.buffer = data;
  this.id = data.toString('utf-8', 0, 2);
  this.size = data.readInt32LE(2);
  this.unused1 = data.toString('hex', 6, 8);
  this.unused2 = data.toString('hex', 8, 10);
  this.offset = data.readInt32LE(10);
  this.dibheader = data.readInt32LE(14);
  this.width = data.readInt32LE(18);
  this.height = data.readInt32LE(22);
  this.plane = data.readUInt32LE(26);
  this.bitsperpixel = data.readInt32LE(28);
  this.bi_rbg = data.readInt32LE(30);
  this.rawsize = data.readInt32LE(34);
  this.pixel_horizontal = data.readInt32LE(38);
  this.pixel_vertical = data.readInt32LE(42);
  this.number_colors = data.readInt32LE(46);
  this.important_colors = data.readInt32LE(50);
  this.redbitmask = data.readInt32LE(54);
  this.greenbitmask = data.readInt32LE(58);
  this.bluebitmask = data.readInt32LE(62);
  this.alphabitmask = data.readInt32LE(66);
  this.colorArray = data.slice(54, this.offset);
};

// New instance of BufferData constructor for each transform.
// Could abstract this. Maybe goes in index.js?

exports.green(function (err, data) {
  if (err) throw err;
  let transformGreen = new exports.BufferData(data);
  console.log('Buffer to green:', transformGreen);
  transformGreen.green();
});

exports.white(function (err, data) {
  if (err) throw err;
  let transformWhite = new exports.BufferData(data);
  transformWhite.white();
});

exports.invert(function (err, data) {
  if (err) throw err;
  let transformInvert = new exports.BufferData(data);
  transformInvert.invert();
});

exports.greyscale(function (err, data) {
  if (err) throw err;
  let transformGreyscale = new exports.BufferData(data);
  transformGreyscale.greyscale();
});

exports.luminosity(function (err, data) {
  if (err) throw err;
  let transformLuminosity = new exports.BufferData(data);
  transformLuminosity.luminosity();
});

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

// TODO: Transform to pure black, red, blue
