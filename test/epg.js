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

  it('should correctly parse a video with a collection', () => {
    let res = epg.formatEvent($, $('event').get(1));
    expect(res).to.deep.equal({
      "type": "video",
      "id": "4857497",
      "start-time": "2016-09-08 16:20:00",
      "end-time": "2016-09-08 17:05:41",
      "title": "Violetta",
      "category": "children",
      "description": "Disneyþáttaröð fyrir börn og unglinga um hina hæfileikaríku Violettu, sem snýr aftur heim til Buenos Aires eftir að hafa búið um tíma í Evrópu. Aðalhlutverk: Diego Ramos, Martina Stoessel og Jorge Blanco.",
      "image": "http://dagskra.servefir.ruv.is/kringlumyndir/18329/18329-1.jpg",
      "vod": "2016-09-15",
      "collection": {
        "id": "18329",
        "title": "Violetta",
        "type": "series",
        "description": "Disneyþáttaröð um hina hæfileikaríku Violettu, sem snýr aftur til heimalands síns, Buenos Aires eftir að hafa búið um tíma í Evrópu. Aðalhlutverk: Diego Ramos, Martina Stoessel og Jorge Blanco.",
        "season-number": 1,
        "episode-number": 26
      }
    });
  });

});
