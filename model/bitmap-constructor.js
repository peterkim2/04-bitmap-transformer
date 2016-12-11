'use strict';

module.exports = exports = {};

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
    let color = this.colorArray.slice(i, i+4);
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
