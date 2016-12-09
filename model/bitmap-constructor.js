'use strict';

const fs = require('fs');

const bitmap = fs.readFileSync(`${__dirname}/../assets/palette-bitmap.bmp`);

const bmp = {};

bmp.id = bitmap.toString('utf-8', 0, 2);
bmp.size = bitmap.readInt32LE(2);
bmp.unused1 = bitmap.toString('hex', 6, 8);
bmp.unused2 = bitmap.toString('hex', 8, 10);
bmp.offset = bitmap.readInt32LE(10);
bmp.dibheader = bitmap.readInt32LE(14);
bmp.width = bitmap.readInt32LE(18);
bmp.height = bitmap.readInt32LE(22);
bmp.plane = bitmap.readUInt32LE(26);
bmp.bitsperpixel = bitmap.readInt32LE(28);
bmp.bi_rbg = bitmap.readInt32LE(30);
bmp.rawsize = bitmap.readInt32LE(34);
bmp.pixel_horizontal = bitmap.readInt32LE(38);
bmp.pixel_vertical = bitmap.readInt32LE(42);
bmp.number_colors = bitmap.readInt32LE(46);
bmp.important_colors = bitmap.readInt32LE(50);
bmp.array = bitmap.slice(54, 1078);

console.log(bmp);
