'use strict';

const expect = require('chai').expect;
const readFileHelper = require('../lib/bitmap-file-helper.js');
const bitmap = require('../model/bitmap-constructor.js');
const fs = require('fs');

describe('Testing bitmap file helper', function() {
  describe('bad file paths', function() {
    it('should return an error', function() {
      fs.readFile(`${__dirname}/assets/not_real.bmp`, function(err) {
        expect(err).to.be.an('error');
      });
    });
    it('should not return an error', function() {
      fs.readFile(readFileHelper.filePath, function(err) {
        expect(err).to.not.be.an('error');
      });
    });
  });
});
