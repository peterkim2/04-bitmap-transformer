'use strict';

const fs = require('fs');

const bitmap = function(callback) {
  fs.readFile(`${__dirname}/../assets/palette-bitmap.bmp`, function(err, data) {
    if (err) return callback(err);
    callback(null, data);
  });
};

function BufferData(data) {
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
  this.array = data.slice(122, 1078);
  this.blue = data.readUInt32LE(126);
}

bitmap(function (err, data) {
  if (err) throw err;
  var transformOne = new BufferData(data);
  console.log(transformOne);
});
