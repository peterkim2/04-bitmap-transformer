'use strict';

const fs = require('fs');
let convert = process.argv[2];

if(!convert) convert = console.error('please pass an inversion flag');

const callback = function (err, data, convert) {
  if (err) throw err;
  let transform = new BufferData(data);
  if(convert) transform[convert]();
  console.log(transform);
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
  this.colorArray = data.slice(54, 1078);
  this.pixels = data.slice(1078, 11077);
}

BufferData.prototype.black = function () {
  this.colorArray.fill(0);
};

BufferData.prototype.white = function () {
  this.colorArray.fill(255);
};


bitmap(`${__dirname}/../assets/palette-bitmap.bmp`, callback, convert);
