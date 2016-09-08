'use strict';

const util = require('util');
const bluebird = require('bluebird');
const request = bluebird.promisifyAll(require('request'));
const _ = require('lodash');
const cheerio = require('cheerio');
const epg = require('./lib/epg');

const EPG_URL = 'http://muninn.ruv.is/files/rs/%s/%s/%s/';
const AS_RUN_URL = 'http://muninn.ruv.is/files/rstiming/%s/';

function fetch(type, channel, from, to) {
  let url;
  if (type === 'epg') {
    url = util.format(EPG_URL, channel, from, to);
  } else if (type === 'asrun') {
    url = util.format(AS_RUN_URL, channel);
  }
  console.log(url);
  return request.getAsync(url)
  .then(res => {
    if (res.statusCode !== 200) {
      throw new Error('got non-200 response from muninn.ruv.is: ' + res.statusCode);
    }
    return cheerio.load(res.body);
  });
}

fetch('epg', 'ruv', '2016-09-08', '2016-09-08')
.then($ => {
  console.log($('event').length);
})
