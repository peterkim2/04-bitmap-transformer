'use strict';

const fs = require('fs');

const callback = function (err, data, convert) {
  if (err) throw err;
  let transform = new BufferData(data);
  transform[convert]();
};

function bitmap(file, callback, color) {
  return fs.readFile(file, function(err, data) {
    if (err) return callback(err);
    return callback(null, data, color);
  });
}

function BufferData(data) {
  this.buffer = data;
  this.id = data.toString('utf-8', 0, 2);
  this.size = data.readInt8(2);
  this.unused1 = data.toString('hex', 6, 8);
  this.unused2 = data.toString('hex', 8, 10);
  this.offset = data.readInt8(10);
  this.dibheader = data.readInt8(14);
  this.width = data.readInt8(18);
  this.height = data.readInt8(22);
  this.plane = data.readUInt8(26);
  this.bitsperpixel = data.readInt8(28);
  this.bi_rbg = data.readInt8(30);
  this.rawsize = data.readInt8(34);
  this.pixel_horizontal = data.readInt8(38);
  this.pixel_vertical = data.readInt8(42);
  this.number_colors = data.readInt8(46);
  this.important_colors = data.readInt8(50);
  this.colorArray = data.slice(54, 1078);
  this.pixels = data.slice(1078, 11077);
}

BufferData.prototype.black = function () {
  this.colorArray.fill(0);
};

BufferData.prototype.white = function () {
  this.colorArray.fill(255);
};


bitmap(`${__dirname}/../assets/palette-bitmap.bmp`, callback, 'white');
