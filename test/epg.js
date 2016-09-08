'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const epg = require('../lib/epg');
const cheerio = require('cheerio');

// Read in test data
const $ = cheerio.load(fs.readFileSync('etc/test-data.xml'));

describe('EPG formatting', () => {

  it('should correctly parse a simple video without a collection', () => {
    let video = $('event').get(0);
    let res = epg.formatEvent($, video);
    expect(res).to.equal('ÓL fatlaðra 2016: Setningarathöfn');
  });

});
