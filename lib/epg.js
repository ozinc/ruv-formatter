'use strict';

const _ = require('lodash');

// Our categories: {generic,movie,episode,sports,music,news,event}

const CATEGORY_MAP = {
  '1':  'episode', // Börn
  '2':  'episode', // Framhaldsþættir
  '3':  'news',    // Fréttatengt
  '4':  'generic', // Fræðsla
  '5':  'sports',  // Íþróttir
  '6':  'episode', // Íslenskir þættir
  '7':  'movie',   // Kvikmyndir
  '8':  'generic', // Bókmenntir og listir
  '9':  'music',   // Tónlist
  '11': 'generic', // Afþreying
  '13': 'generic', // Samfélag
  '14': 'episode', // Viðtalsþættir
  '15': 'generic', // Jól
  '20': 'generic', // Páskar
  '21': 'news'     // Íþróttafréttir
}

function formatEvent($, event) {
  // Collect and assemble the required properties
  let id = $(event).attr('event-id');
  let startTime = $(event).attr('start-time');
  let endTime = $(event).attr('end-time');

  let video = {
    type: 'video',
    id,
    'start-time': startTime,
    'end-time': endTime,
    title
  };

  /*
   * === TITLE ================================================================
   *
   *
   */
  let title = $('title', event).text();

  // Description
  let description = $('description', event);
  if (description.length > 0 && description.text().length > 0) {
    video.description = description.text();
  }

  // Category
  let category = $('category', event);
  if (category.length > 0) {
    let value = category.attr('value');
    // Default to contentType: 'episode'
    video.category = _.has(CATEGORY_MAP, value) ? CATEGORY_MAP[value] : 'episode';
  }

  // Image
  let image = $('image', event);
  if (image.length > 0) {
    video.image = image.text();
  }

  // VOD rights
  let vod = false;
  let rights = $('rights[type="vod"]', event);
  if (rights.length > 0 && rights.attr('action') === 'allowed') {
    vod = rights.attr('expires');
  }
  video.vod = vod;

  // Collection

  /*
   * === COLLECTION ===========================================================
   *
   * Its not given to figure out whether RUVs content belongs to a
   * series (collection). Every event has associated with it a 'serie-id'. Some
   * of the events have a "<details id="the serie-id">..</details>" section
   * that contains information about the series.
   *
   * It would make sense to conclude that an "event" that has a "<details />"
   * section belongs to a series BUT that would be too simple for RUV. Instead
   * a lot of events that obviously belong to series DO NOT have a "<details />"
   * section.
   *
   * This means that we have to rely on the following algorithm to determine
   * whether this event belongs to a series or not:
   *
   * (1) If the event has a "<details />" section, it belongs to a series.
   * (2) If
   */

  // It would be normal to conclude that
  let serieId = $(event).attr('serie-id');
  if (serieId && _.includes([''], video.category)) {

  }

  /*
   * === EPISODE NUMBER =======================================================
   *
   * Episode numbers in the RUV EPG content are another interesting research
   * project. What follows is an example of the <episode /> section of the samt
   * recurring event, three days in a row (2016-09-09 - 2016-09-11):
   *
   *   <episode number="1" number-of-episodes="1" true="259"/>
   *   <episode number="1" number-of-episodes="1" true="105"/>
   *   <episode number="1" number-of-episodes="1" true="107"/>
   *   <episode number="1" number-of-episodes="1" true="260"/>
   *

   */




  // console.log(video);

  return video;
}

// Exports
module.exports.formatEvent = formatEvent;
