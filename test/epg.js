'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const epg = require('../lib/epg');
const cheerio = require('cheerio');

// Read in test data
const $ = cheerio.load(fs.readFileSync('etc/test-data.xml'), { xmlMode: true });

describe('EPG formatting', () => {

  it('should correctly parse a simple video without a collection', () => {
    let video = $('event').get(0);
    let res = epg.formatEvent($, video);
    expect(res).to.deep.equal({
      "type": "video",
      "id": "4858083",
      "start-time": "2016-09-08 11:45:33",
      "end-time": "2016-09-08 15:36:53",
      "title": "ÓL fatlaðra 2016: Setningarathöfn",
      "description": "Upptaka frá setningarathöfn Ólympíumóts fatlaðra í Ríó.",
      "image": "http://dagskra.servefir.ruv.is/kringlumyndir/18199/18199-1.jpg",
      "vod": false
    });
  });

});
