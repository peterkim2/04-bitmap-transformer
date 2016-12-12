'use strict';

const expect = require('chai').expect;
const bitmap = require('../model/bitmap-constructor.js');
const readFileHelper = require('../lib/bitmap-file-helper.js');
const fs = require('fs');
const Buffer = require('buffer').Buffer;

describe('Testing constructor', function() {
  describe('Constructor function', function() {
    before('Build bitmap object', function() {
      this.bitmapObj = new bitmap.BufferData(fs.readFileSync(readFileHelper.filePath));
    });
    it('should construct an object', function() {
      expect(this.bitmapObj).to.be.an('object');
    });
    it('should have colorArray property', function() {
      expect(this.bitmapObj).to.have.property('colorArray').to.have.length.within(54, 1078);
      expect(this.bitmapObj).to.have.property('colorArray').to.not.have.length(0);
    });
  });
  describe('Transform methods', function() {
    before('Build bitmap object', function() {
      this.bitmapObj = new bitmap.BufferData(fs.readFileSync(readFileHelper.filePath));
      this.whiteObj = new bitmap.BufferData(fs.readFileSync(readFileHelper.filePath));
      this.blackObj = new bitmap.BufferData(fs.readFileSync(readFileHelper.filePath));
      this.greenObj = new bitmap.BufferData(fs.readFileSync(readFileHelper.filePath));
      this.greyscaleObj = new bitmap.BufferData(fs.readFileSync(readFileHelper.filePath));
      this.luminosityObj = new bitmap.BufferData(fs.readFileSync(readFileHelper.filePath));
      this.invertObj = new bitmap.BufferData(fs.readFileSync(readFileHelper.filePath));
      this.whiteObj.white();
      this.blackObj.black();
      this.greenObj.green();
      this.greyscaleObj.greyscale();
      this.luminosityObj.luminosity();
      this.invertObj.invert();
    });
    it('should respond to transform methods', function() {
      expect(this.bitmapObj).to.respondTo('green');
      expect(this.bitmapObj).to.respondTo('white');
      expect(this.bitmapObj).to.respondTo('luminosity');
      expect(this.bitmapObj).to.respondTo('invert');
      expect(this.bitmapObj).to.respondTo('black');
      expect(this.bitmapObj).to.respondTo('greyscale');
    });
    it('should not respond to undefined transform methods', function() {
      expect(this.bitmapObj).to.not.respondTo('yellow');
    });
    it('should have white colorArray with members equal to #FFFFFF', function() {
      expect(this.whiteObj.colorArray.slice(0,4)).to.be.deep.equal(Buffer.from([0xff,0xff,0xff,0xff]));
    });
    it('should have black colorArray with members equal to #000000', function() {
      expect(this.blackObj.colorArray.slice(0,4)).to.be.deep.equal(Buffer.from([0x00,0x00,0x00,0x00]));
    });
    // it('should have green colorArray with members equal to #00FF00', function() {
    //   expect(this.greenObj.colorArray.slice(0,4)).to.be.deep.equal(Buffer.from([0x00,0xff,0x00,0x00]));
    // });
  });
});
