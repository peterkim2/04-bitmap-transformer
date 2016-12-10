'use strict';

const fs = require('fs');

function bitmap(callback) {
  fs.readFile(`${__dirname}/../assets/palette-bitmap.bmp`, function(err, data) {
    if (err) return callback(err);
    callback(null, data);
  });
};

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
}

BufferData.prototype.black = function () {
  this.colorArray.fill(0);
  for (var i = 0; i < this.colorArray.length; i += 4) {
    this.colorArray[i].fill(255);
  }
};

bitmap(function (err, data) {
  if (err) throw err;
  let buffer = new BufferData(data);
  buffer.black();
});


// console.log('bitmap', bitmap);
// console.log('bitmapCallbak', bitmapCallbak);

bitmap(main);

function blackTransform(err, data) {
  if (err) throw err;
  let bdata = new BufferData(data);
  bdata.black();
  console.log('data', bdata);
  return bdata;
}


// console.log('bm', bitmap(bitmapCallbak));

// var transformOne = new BufferData(bitmap(bitmapCallbak));
